import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
   clip: "rect(0 0 0 0)",
   clipPath: "inset(50%)",
   height: 1,
   overflow: "hidden",
   position: "absolute",
   bottom: 0,
   left: 0,
   whiteSpace: "nowrap",
   width: 1,
});

export default function UploadButton() {
   const [currentFile, setCurrentFile] = useState<File | null>(null);
   const [progress, setProgress] = useState<number>(0);

   // Ref object to reference the input element
   const inputFile = useRef(null);

   const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      const selectedFiles = files as FileList;
      setCurrentFile(selectedFiles?.[0]);
      setProgress(0);

      // upload file to server
      FileUploadService.upload(
         currentFile,
         userId,
         clientId,
         categorySelector,
         (event: any) => {
            setIsSubmitLoading(true);
            setProgress(Math.round((100 * event.loaded) / event.total));
         }
      )
         .then((response) => {
            toast({
               variant: "default",
               description: "File uploaded successfully",
               className: toastStyles,
            });

            setFileInfos((prev) => [response.data.file, ...prev]);
            return CategoryService.getCategories(clientId);
         })
         .then((response) => {
            handleSetCategories(response.data.categories);
         })
         .catch((err) => {
            setProgress(0);

            if (err.response && err.response.data.error) {
               toast({
                  variant: "destructive",
                  description: err.response.data.error,
                  className: toastStyles,
               });
            } else {
               toast({
                  variant: "destructive",
                  description: "Could not upload the File!",
                  className: toastStyles,
               });
            }
         })
         .finally(() => {
            setCurrentFile(null);
            setIsSubmitLoading(false);
            setIsCategoryDialogOpen(false);
            setNewCategory("");

            if (inputFile.current) {
               (inputFile.current as any).value = "";
               (inputFile.current as any).type = "text";
               (inputFile.current as any).type = "file";
            }
         });
   };

   return (
      <Button
         component="label"
         role="button"
         variant="contained"
         tabIndex={-1}
         startIcon={<CloudUploadIcon />}
      >
         Upload file
         <VisuallyHiddenInput
            type="file"
            onChange={selectFile}
            ref={inputFile}
            required
         />
      </Button>
   );
}
