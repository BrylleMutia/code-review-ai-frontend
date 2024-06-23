import { SnackBarConfig } from "../context/types";

export const errorHandler = (
   err: any,
   errEventHandler: (snackbarConfig: SnackBarConfig) => void
) => {
   if (err.response && err.response.data.error) {
      errEventHandler({
         isShown: true,
         message: err.response.data.error,
      });
   } else if (err.response && err.response.data.msg) {
      errEventHandler({
         isShown: true,
         message: err.response.data.msg,
      });
   }
};
