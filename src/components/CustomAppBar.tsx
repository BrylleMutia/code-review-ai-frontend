import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

type CustomAppBarProps = {
   handleNavToggle: () => void;
};

export default function CustomAppBar({ handleNavToggle }: CustomAppBarProps) {
   const [auth] = useState(true);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <AppBar position="static" sx={{ width: "auto", flexGrow: "1" }}>
         <Toolbar>
            <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
               onClick={handleNavToggle}
            >
               <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               Code Review Tool
            </Typography>
            {auth && (
               <div>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleMenu}
                     color="inherit"
                  >
                     <AccountCircle />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorEl}
                     anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                  >
                     <MenuItem onClick={handleClose}>Profile</MenuItem>
                     <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
               </div>
            )}
         </Toolbar>
      </AppBar>
   );
}
