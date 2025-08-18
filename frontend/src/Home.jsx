// import { useState, useEffect } from "react";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Avatar from "@material-ui/core/Avatar";
// import Container from "@material-ui/core/Container";
// import React from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
// import cblogo from "./cblogo.PNG";
// import image from "./bg.png";
// import { DropzoneArea } from 'material-ui-dropzone';
// import { common } from '@material-ui/core/colors';
// import Clear from '@material-ui/icons/Clear';

// const ColorButton = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(common.white),
//     backgroundColor: common.white,
//     '&:hover': {
//       backgroundColor: '#ffffff7a',
//     },
//   },
// }))(Button);
// const axios = require("axios").default;

// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   clearButton: {
//     width: "-webkit-fill-available",
//     borderRadius: "15px",
//     padding: "15px 22px",
//     color: "#000000a6",
//     fontSize: "20px",
//     fontWeight: 900,
//   },
//   root: {
//     maxWidth: 345,
//     flexGrow: 1,
//   },
//   media: {
//     height: 400,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: 'auto',
//     maxWidth: 500,
//   },
//   gridContainer: {
//     justifyContent: "center",
//     padding: "4em 1em 0 1em",
//   },
//   mainContainer: {
//     backgroundImage: `url(${image})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     height: "93vh",
//     marginTop: "8px",
//   },
//   imageCard: {
//     margin: "auto",
//     maxWidth: 400,
//     height: 500,
//     backgroundColor: 'transparent',
//     boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
//     borderRadius: '15px',
//   },
//   imageCardEmpty: {
//     height: 'auto',
//   },
//   noImage: {
//     margin: "auto",
//     width: 400,
//     height: "400 !important",
//   },
//   input: {
//     display: 'none',
//   },
//   uploadIcon: {
//     background: 'white',
//   },
//   tableContainer: {
//     backgroundColor: 'transparent !important',
//     boxShadow: 'none !important',
//   },
//   table: {
//     backgroundColor: 'transparent !important',
//   },
//   tableHead: {
//     backgroundColor: 'transparent !important',
//   },
//   tableRow: {
//     backgroundColor: 'transparent !important',
//   },
//   tableCell: {
//     fontSize: '22px',
//     backgroundColor: 'transparent !important',
//     borderColor: 'transparent !important',
//     color: '#000000a6 !important',
//     fontWeight: 'bolder',
//     padding: '1px 24px 1px 16px',
//   },
//   tableCell1: {
//     fontSize: '14px',
//     backgroundColor: 'transparent !important',
//     borderColor: 'transparent !important',
//     color: '#000000a6 !important',
//     fontWeight: 'bolder',
//     padding: '1px 24px 1px 16px',
//   },
//   tableBody: {
//     backgroundColor: 'transparent !important',
//   },
//   text: {
//     color: 'white !important',
//     textAlign: 'center',
//   },
//   buttonGrid: {
//     maxWidth: "416px",
//     width: "100%",
//   },
//   detail: {
//     backgroundColor: 'white',
//     display: 'flex',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   appbar: {
//     background: '#be6a77',
//     boxShadow: 'none',
//     color: 'white'
//   },
//   loader: {
//     color: '#be6a77 !important',
//   }
// }));

// const Home = () => {
//     const classes = useStyles();
//   const [selectedFile, setSelectedFile] = useState();
//   const [preview, setPreview] = useState();
//   const [data, setData] = useState();
//   const [image, setImage] = useState(false);
//   const [isLoading, setIsloading] = useState(false);
//   let confidence = 0;

//   const sendFile = async () => {
//     if (image) {
//       let formData = new FormData();
//       formData.append("file", selectedFile);
//       let res = await axios({
//         method: "post",
//         url: process.env.REACT_APP_API_URL,
//         data: formData,
//       });
//       if (res.status === 200) {
//         setData(res.data);
//       }
//       setIsloading(false);
//     }
//   }

//   const clearData = () => {
//     setData(null);
//     setImage(false);
//     setSelectedFile(null);
//     setPreview(null);
//   };

//   useEffect(() => {
//     if (!selectedFile) {
//       setPreview(undefined);
//       return;
//     }
//     const objectUrl = URL.createObjectURL(selectedFile);
//     setPreview(objectUrl);
//   }, [selectedFile]);

//   useEffect(() => {
//     if (!preview) {
//       return;
//     }
//     setIsloading(true);
//     sendFile();
//   }, [preview]);

//   const onSelectFile = (files) => {
//     if (!files || files.length === 0) {
//       setSelectedFile(undefined);
//       setImage(false);
//       setData(undefined);
//       return;
//     }
//     setSelectedFile(files[0]);
//     setData(undefined);
//     setImage(true);
//   };

//   if (data) {
//     confidence = (parseFloat(data.confidence) * 100).toFixed(2);
//   }

//   return (
//     <React.Fragment>
//       <AppBar position="static" className={classes.appbar}>
//         <Toolbar>
//           <Typography className={classes.title} variant="h6" noWrap>
//             CodeBasics: Potato Disease Classification
//           </Typography>
//           <div className={classes.grow} />
//           <Avatar src={cblogo}></Avatar>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
//         <Grid
//           className={classes.gridContainer}
//           container
//           direction="row"
//           justifyContent="center"
//           alignItems="center"
//           spacing={2}
//         >
//           <Grid item xs={12}>
//             <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
//               {image && <CardActionArea>
//                 <CardMedia
//                   className={classes.media}
//                   image={preview}
//                   component="image"
//                   title="Contemplative Reptile"
//                 />
//               </CardActionArea>
//               }
//               {!image && <CardContent className={classes.content}>
//                 <DropzoneArea
//                   acceptedFiles={['image/*']}
//                   dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
//                   onChange={onSelectFile}
//                 />
//               </CardContent>}
//               {data && <CardContent className={classes.detail}>
//                 <TableContainer component={Paper} className={classes.tableContainer}>
//                   <Table className={classes.table} size="small" aria-label="simple table">
//                     <TableHead className={classes.tableHead}>
//                       <TableRow className={classes.tableRow}>
//                         <TableCell className={classes.tableCell1}>Label:</TableCell>
//                         <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody className={classes.tableBody}>
//                       <TableRow className={classes.tableRow}>
//                         <TableCell component="th" scope="row" className={classes.tableCell}>
//                           {data.class}
//                         </TableCell>
//                         <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </CardContent>}
//               {isLoading && <CardContent className={classes.detail}>
//                 <CircularProgress color="secondary" className={classes.loader} />
//                 <Typography className={classes.title} variant="h6" noWrap>
//                   Processing
//                 </Typography>
//               </CardContent>}
//             </Card>
//           </Grid>
//           {data &&
//             <Grid item className={classes.buttonGrid} >

//               <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
//                 Clear
//               </ColorButton>
//             </Grid>}
//         </Grid >
//       </Container >
//     </React.Fragment >
//   )
// }

// export default Home

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Container,
  Card,
  CardContent,
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Clear from "@mui/icons-material/Clear";
// import { DropzoneArea } from "material-ui-dropzone";
import { DropzoneArea } from "mui-file-dropzone";
// npm install react-dropzone
// import { useDropzone } from "react-dropzone";
import cblogo from "./cblogo.PNG";
import image from "./bg.png";
import axios from "axios";

// Styled button that uses theme
const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "#ffffff7a",
  },
}));

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [imageFile, setImageFile] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
  if (imageFile) {
    setIsloading(true); // optional, but ensures loading starts

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}`, // ✅ Vite way
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsloading(false);
    }
  }
};


  const clearData = () => {
    setData(null);
    setImageFile(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    setIsloading(true);
    sendFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImageFile(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImageFile(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" noWrap>
            CodeBasics: Potato Disease Classification
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Avatar src={cblogo} />
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "93vh",
          mt: "8px",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ p: "4em 1em 0 1em" }}>
          <Grid item xs={12}>
            <Card
              sx={{
                margin: "auto",
                maxWidth: 400,
                height: imageFile ? 500 : "auto",
                backgroundColor: "transparent",
                boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%)",
                borderRadius: "15px",
              }}
            >
              {imageFile && (
                <CardActionArea>
                  <CardMedia component="img" height="400" image={preview} alt="Potato Leaf" />
                </CardActionArea>
              )}

              {!imageFile && (
                <CardContent>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}

              {data && (
                <CardContent sx={{ backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <TableContainer component={Paper} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontSize: "14px", fontWeight: "bold" }}>Label:</TableCell>
                          <TableCell align="right" sx={{ fontSize: "14px", fontWeight: "bold" }}>
                            Confidence:
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontSize: "22px", fontWeight: "bold", color: "text.primary" }}>
                            {data.class}
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: "22px", fontWeight: "bold", color: "text.primary" }}>
                            {confidence}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}

              {isLoading && (
                <CardContent sx={{ backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <CircularProgress color="primary" />
                  <Typography variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>

          {data && (
            <Grid item sx={{ maxWidth: "416px", width: "100%" }}>
              <ColorButton
                variant="contained"
                fullWidth
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;

