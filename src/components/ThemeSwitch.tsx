import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../context/types";

const ThemeSwitch = () => {
   const { selectedTheme, handleChangeTheme } = useContext(
      AppContext
   ) as AppContextType;

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeTheme(event.target.checked ? "dark" : "light");
   };

   return (
      <Switch
         checked={selectedTheme === "dark"}
         onChange={handleChange}
         inputProps={{ "aria-label": "controlled" }}
      />
   );
};

export default ThemeSwitch;
