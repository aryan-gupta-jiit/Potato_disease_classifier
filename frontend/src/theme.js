// // src/theme.js
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#be6a77", // your AppBar & loader color
//     },
//     secondary: {
//       main: "#ffffff",
//     },
//     text: {
//       primary: "#000000a6",
//       secondary: "#fff",
//     },
//   },
//   typography: {
//     h6: {
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: "16px",
//     },
//   },
//   components: {
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           boxShadow: "none",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "15px",
//           textTransform: "none",
//           fontWeight: 900,
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderColor: "transparent",
//         },
//       },
//     },
//   },
// });

// export default theme;

// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#386641",   // strong green for major actions/nav
    },
    secondary: {
      main: "#06923E",   // contrasting accent (e.g. buttons)
    },
    background: {
      default: "#004030", // dark background
      paper: "#4A9782",   // card/paper background
    },
    success: {
      main: "#78C841",    // for success states/chips
    },
    warning: {
      main: "#4A9782",    // for warning (diagnosis)
    },
    error: {
      main: "#D32F2F",    // use MUI's red for errors
    },
    text: {
      primary: "#004030",
      secondary: "#386641",
    },
  },
  typography: {
    fontFamily: ['"Roboto"', 'Arial', 'sans-serif'].join(','),
    h5: {
      color: "#004030",
    },
    h6: {
      color: "#386641",
    },
  },
});

export default theme;
