import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthService from "../services/AuthService";

import Copyright from "../components/Copyright";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { errorHandler } from "../utils/error";
import CustomSnackbar from "../components/CustomSnackbar";
import ReviewService from "../services/ReviewService";

export default function SignUp() {
   const [username, setUsername] = useState<string | null>(null);
   const [email, setEmail] = useState<string | null>(null);
   const [password, setPassword] = useState<string | null>(null);

   const {
      handleAuthChange,
      handleUserDetailsChange,
      handleChangeSnackbar,
      handleUpdateReviews,
   } = useContext(AppContext) as AppContextType;

   const navigate = useNavigate();

   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
   };
   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (email && password && username) {
         AuthService.signupUser(email, username, password)
            .then((response) => {
               const { id, name, email, access_token } = response.data;
               handleUserDetailsChange({ id, name, email });
               handleAuthChange(true);

               // set token to localstorage
               localStorage.setItem("access_token", access_token);

               // redirect to homepage
               navigate("/");

               return ReviewService.getReviews();
            })
            .then((response) => {
               handleUpdateReviews(response.data.response);
            })
            .catch((err) => errorHandler(err, handleChangeSnackbar));
      }
   };

   return (
      <Container
         component="main"
         maxWidth="xs"
         sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
         }}
      >
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign up
            </Typography>
            <Box
               component="form"
               noValidate
               onSubmit={handleSubmit}
               sx={{ mt: 3 }}
            >
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        autoComplete="username"
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        onChange={handleNameChange}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleEmailChange}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
               >
                  Sign Up
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <RouterLink to="/auth">
                        <Link component="p" variant="body2">
                           Already have an account? Sign in
                        </Link>
                     </RouterLink>
                  </Grid>
               </Grid>
            </Box>
         </Box>
         <Copyright sx={{ mt: 10 }} />

         <CustomSnackbar severity="error" />
      </Container>
   );
}
