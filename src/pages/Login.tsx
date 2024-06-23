import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../context/types";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import AuthService from "../services/AuthService";
import { errorHandler } from "../utils/error";
import CustomSnackbar from "../components/CustomSnackbar";
import ReviewService from "../services/ReviewService";

export default function LogIn() {
   const [email, setEmail] = useState<string | null>(null);
   const [password, setPassword] = useState<string | null>(null);
   const [rememberMe, setRememberMe] = useState(false);

   const {
      handleAuthChange,
      handleUserDetailsChange,
      handleChangeSnackbar,
      handleUpdateReviews,
   } = useContext(AppContext) as AppContextType;

   const navigate = useNavigate();

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };
   const handleRememberMe = () => {
      setRememberMe((prev) => !prev);
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (email && password) {
         AuthService.loginUser(email, password, rememberMe)
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
               Sign in
            </Typography>
            <Box
               component="form"
               onSubmit={handleSubmit}
               noValidate
               sx={{ mt: 1 }}
            >
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleEmailChange}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
               />
               <FormControlLabel
                  control={
                     <Checkbox
                        value="remember"
                        color="primary"
                        onChange={handleRememberMe}
                     />
                  }
                  label="Remember me"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Link variant="body2">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                     <RouterLink to="/auth/signup">
                        <Link component="p" variant="body2">
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </RouterLink>
                  </Grid>
               </Grid>
            </Box>
         </Box>
         <Copyright sx={{ mt: 10, mb: 4 }} />

         <CustomSnackbar severity="error" />
      </Container>
   );
}
