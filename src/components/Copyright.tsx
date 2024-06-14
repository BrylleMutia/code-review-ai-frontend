import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export default function Copyright(props: any) {
   return (
      <Typography
         variant="body2"
         color="text.secondary"
         align="center"
         {...props}
      >
         {"Copyright © "}
         <Link color="inherit" href={import.meta.env.VITE_BASE_URL}>
            Code Review Tool
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}
