import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeSwitch from "./ThemeSwitch";

type CustomAppBarProps = {
   handleSidebarToggle: () => void;
};

export default function CustomAppBar({
   handleSidebarToggle,
}: CustomAppBarProps) {
   return (
      <AppBar position="static" sx={{ width: "auto", flexGrow: "1" }}>
         <Toolbar>
            <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="menu"
               sx={{ mr: 2 }}
               onClick={handleSidebarToggle}
            >
               <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               Code Review Tool
            </Typography>

            <ThemeSwitch />
         </Toolbar>
      </AppBar>
   );
}
