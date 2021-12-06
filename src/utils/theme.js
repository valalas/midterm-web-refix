//import { withTheme } from "@emotion/react";

const theme = (isDarkMode) => ({
  palette: {
    mode: isDarkMode ? "dark" : "light",
    primary: {
      main: "#A76286",
    },
    secondary: {
      main: "#D3B1C2",
    },
    error: {
      main: "#D3B1C2",
    },
  },

  typography: {
    fontFamily: ["Open Sans"],
  },
});

/*import { createTheme } from "@mui/material";

const theme = createTheme({
    mode: isDarkMode ? "dark" : "light",
    primary: {
      main: "#a20a0a",
    },
    secondary: {
      main: "#ffa36c",
    },
    error: {
      main: "#ff2442",
    },
  });
  */

export default theme;
