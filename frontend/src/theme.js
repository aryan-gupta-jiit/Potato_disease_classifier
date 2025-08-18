// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#be6a77", // your AppBar & loader color
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#000000a6",
      secondary: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          textTransform: "none",
          fontWeight: 900,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "transparent",
        },
      },
    },
  },
});

export default theme;
