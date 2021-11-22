import { createTheme } from "@mui/material";
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3d68b2",
    },
    secondary: {
      main: "#febf10",
    },
    typography: {
      htmlFontSize: 16,
      fontSize: 14,
    },
  },
});

console.log("theme: ", theme);
