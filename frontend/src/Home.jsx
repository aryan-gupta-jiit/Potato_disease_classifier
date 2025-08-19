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
  Box,
  LinearProgress,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Clear, CloudUpload, Info, Home as HomeIcon,LocalHospital } from "@mui/icons-material";
import { DropzoneArea } from "mui-file-dropzone";
import cblogo from "./cblogo.PNG";
import bgImage from "./bg.png";
import axios from "axios";

// Custom styled components
const GradientAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: "white",
  fontWeight: "bold",
  padding: "12px 24px",
  borderRadius: "50px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  color: theme.palette.text.primary,
  fontWeight: "bold",
  padding: "12px 24px",
  borderRadius: "50px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 1)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
}));

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [advice, setAdvice] = useState("");
  const [imageFile, setImageFile] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [treatmentLoading, setTreatmentLoading] = useState(false);
  const [openDialog,setOpenDialog] = useState(false);


  const sendFile = async () => {
    if (imageFile) {
      setIsloading(true);
      setProgress(0);
      
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 95);
        });
      }, 500);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}`,
          formData,
          { 
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          }
        );

        if (res.status === 200) {
          setData(res.data);
          setProgress(100);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        clearInterval(timer);
        setTimeout(() => setIsloading(false), 500);
      }
    }
  };

  const handleTreatment = async () => {
    if (!data) return;
    setTreatmentLoading(true);
    setOpenDialog(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}`, {
        disease: result.class,
      });
      setAdvice(res.data.advice);
    } catch (err) {
      console.error(err);
    } finally {
      setTreatmentLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImageFile(false);
    setSelectedFile(null);
    setPreview(null);
    setProgress(0);
    setAdvice("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
    sendFile();
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

  const confidence = data ? (parseFloat(data.confidence) * 100 ): 0;

  return (
    // <Box sx={{ minHeight: "100vh", background: `url(${bgImage}) no-repeat center/cover` }}>
    //   <GradientAppBar position="static">
    //     <Toolbar>
    //       <Box sx={{ display: "flex", alignItems: "center" }}>
    //         <Avatar src={cblogo} sx={{ mr: 2 }} />
    //         <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
    //           Potato Disease Classifier
    //         </Typography>
    //       </Box>
    //       <Box sx={{ flexGrow: 1 }} />
    //       <IconButton color="inherit" sx={{ mr: 2 }}>
    //         <HomeIcon />
    //       </IconButton>
    //       <IconButton color="inherit">
    //         <Info />
    //       </IconButton>
    //     </Toolbar>
    //   </GradientAppBar>

    //   <Container maxWidth="lg" sx={{ py: 4 }}>
    //     <Grid container justifyContent="center" spacing={4}>
    //       <Grid item xs={12} md={8}>
    //         <GlassCard>
    //           {imageFile ? (
    //             <CardActionArea>
    //               <CardMedia
    //                 component="img"
    //                 height="400"
    //                 image={preview}
    //                 alt="Potato Leaf"
    //                 sx={{ objectFit: "contain", p: 2 }}
    //               />
    //             </CardActionArea>
    //           ) : (
    //             <CardContent sx={{ p: 4 }}>
    //               <DropzoneArea
    //                 acceptedFiles={["image/*"]}
    //                 dropzoneText={
    //                   <Box sx={{ textAlign: "center", p: 2 }}>
    //                     <CloudUpload fontSize="large" sx={{ fontSize: 48, mb: 2, color: "text.secondary" }} />
    //                     <Typography variant="h5" component="div" gutterBottom>
    //                       Drag & Drop Potato Leaf Image
    //                     </Typography>
    //                     <Typography variant="body2" component="div" color="text.secondary">
    //                       or click to browse files
    //                     </Typography>
    //                   </Box>
    //                 }
    //                 onChange={onSelectFile}
    //                 filesLimit={1}
    //                 showPreviewsInDropzone={false}
    //                 showAlerts={false}
    //                 dropzoneClass="dropzone"
    //                 dropzoneParagraphClass="dropzone-text"
    //                 Icon={CloudUpload}
    //                 maxFileSize={5000000}
    //                 sx={{
    //                   border: "2px dashed",
    //                   borderColor: "primary.main",
    //                   borderRadius: "20px",
    //                   "&:hover": {
    //                     borderColor: "primary.dark",
    //                   },
    //                 }}
    //               />
    //             </CardContent>
    //           )}

    //           {isLoading && (
    //             <Box sx={{ p: 4, textAlign: "center" }}>
    //               <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
    //               <Typography variant="h6" gutterBottom>
    //                 Analyzing Image
    //               </Typography>
    //               <LinearProgress 
    //                 variant="determinate" 
    //                 value={progress} 
    //                 sx={{ height: 10, borderRadius: 5, mb: 2 }}
    //               />
    //               <Typography variant="body2" color="text.secondary">
    //                 {progress < 100 ? "Processing..." : "Finalizing results..."}
    //               </Typography>
    //             </Box>
    //           )}

    //           {data && (
    //             <CardContent sx={{ p: 4 }}>
    //               <Box sx={{ mb: 4 }}>
    //                 <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
    //                   Analysis Results
    //                 </Typography>
    //                 <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
    //                   Our AI has analyzed your potato leaf image:
    //                 </Typography>
    //               </Box>

    //               <TableContainer component={Paper} sx={{ mb: 3, borderRadius: "12px", overflow: "hidden" }}>
    //                 <Table>
    //                   <TableHead sx={{ bgcolor: "action.hover" }}>
    //                     <TableRow>
    //                       <TableCell sx={{ fontWeight: 700 }}>Attribute</TableCell>
    //                       <TableCell align="right" sx={{ fontWeight: 700 }}>Value</TableCell>
    //                     </TableRow>
    //                   </TableHead>
    //                   <TableBody>
    //                     <TableRow>
    //                       <TableCell>Disease Detected</TableCell>
    //                       <TableCell align="right">
    //                         <Chip 
    //                           label={data.class} 
    //                           color={
    //                             data.class.includes("healthy") ? "success" : 
    //                             data.class.includes("Early") ? "warning" : "error"
    //                           }
    //                         />
    //                       </TableCell>
    //                     </TableRow>
    //                     <TableRow>
    //                       <TableCell>Confidence Level</TableCell>
    //                       <TableCell align="right">
    //                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
    //                           <Box sx={{ width: "100%", mr: 1 }}>
    //                             <LinearProgress 
    //                               variant="determinate" 
    //                               value={confidence} 
    //                               color={
    //                                 confidence > 80 ? "success" : 
    //                                 confidence > 60 ? "warning" : "error"
    //                               }
    //                               sx={{ height: 10, borderRadius: 5 }}
    //                             />
    //                           </Box>
    //                           <Typography variant="body2" color="text.secondary">
    //                             {confidence.toFixed(2)}%
    //                           </Typography>
    //                         </Box>
    //                       </TableCell>
    //                     </TableRow>
    //                   </TableBody>
    //                 </Table>
    //               </TableContainer>

    //               <Box sx={{ mt: 3, textAlign: "center" }}>
    //                 <SecondaryButton
    //                   variant="contained"
    //                   size="large"
    //                   onClick={clearData}
    //                   startIcon={<Clear />}
    //                   sx={{ mr: 2 }}
    //                 >
    //                   Clear
    //                 </SecondaryButton>
    //                 <PrimaryButton onClick={handleTreatment} disabled={!result} variant="contained" size="large">
    //                   Get Treatment Advice
    //                 </PrimaryButton>
    //               </Box>
    //             </CardContent>
    //           )}
    //         </GlassCard>
    //       </Grid>

    //       {!imageFile && (
    //         <Grid item xs={12} md={4}>
    //           <GlassCard sx={{ p: 3 }}>
    //             <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
    //               How It Works
    //             </Typography>
    //             <Typography variant="body1" paragraph>
    //               Upload a clear image of a potato plant leaf, and our AI will analyze it for common diseases like:
    //             </Typography>
    //             <Box component="ul" sx={{ pl: 3, mb: 3 }}>
    //               <li><Typography variant="body1">Early Blight</Typography></li>
    //               <li><Typography variant="body1">Late Blight</Typography></li>
    //               <li><Typography variant="body1">Healthy leaves</Typography></li>
    //             </Box>
    //             <Typography variant="body2" color="text.secondary">
    //               For best results, use images with good lighting and focus on a single leaf.
    //             </Typography>
    //           </GlassCard>
    //         </Grid>
    //       )}
    //     </Grid>
    //   </Container>
    // </Box>
    <Box sx={{ minHeight: "100vh", background: `url(${bgImage}) no-repeat center/cover` }}>
      <GradientAppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={cblogo} sx={{ mr: 2 }} />
            <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
              Potato Disease Classifier
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit">
            <Info />
          </IconButton>
        </Toolbar>
      </GradientAppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} md={8}>
            <GlassCard>
              {imageFile ? (
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={preview}
                    alt="Potato Leaf"
                    sx={{ objectFit: "contain", p: 2 }}
                  />
                </CardActionArea>
              ) : (
                <CardContent sx={{ p: 4 }}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <CloudUpload fontSize="large" sx={{ fontSize: 48, mb: 2, color: "text.secondary" }} />
                        <Typography variant="h5" component="div" gutterBottom>
                          Drag & Drop Potato Leaf Image
                        </Typography>
                        <Typography variant="body2" component="div" color="text.secondary">
                          or click to browse files
                        </Typography>
                      </Box>
                    }
                    onChange={onSelectFile}
                    filesLimit={1}
                    showPreviewsInDropzone={false}
                    showAlerts={false}
                    dropzoneClass="dropzone"
                    dropzoneParagraphClass="dropzone-text"
                    Icon={CloudUpload}
                    maxFileSize={5000000}
                    sx={{
                      border: "2px dashed",
                      borderColor: "primary.main",
                      borderRadius: "20px",
                      "&:hover": {
                        borderColor: "primary.dark",
                      },
                    }}
                  />
                </CardContent>
              )}

              {isLoading && (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Analyzing Image
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {progress < 100 ? "Processing..." : "Finalizing results..."}
                  </Typography>
                </Box>
              )}

              {data && (
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      Analysis Results
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Our AI has analyzed your potato leaf image:
                    </Typography>
                  </Box>

                  <TableContainer component={Paper} sx={{ mb: 3, borderRadius: "12px", overflow: "hidden" }}>
                    <Table>
                      <TableHead sx={{ bgcolor: "action.hover" }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Attribute</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Disease Detected</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={data.class} 
                              color={
                                data.class.includes("healthy") ? "success" : 
                                data.class.includes("Early") ? "warning" : "error"
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Confidence Level</TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                              <Box sx={{ width: "100%", mr: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={confidence} 
                                  color={
                                    confidence > 80 ? "success" : 
                                    confidence > 60 ? "warning" : "error"
                                  }
                                  sx={{ height: 10, borderRadius: 5 }}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                {confidence}%
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <SecondaryButton
                      variant="contained"
                      size="large"
                      onClick={clearData}
                      startIcon={<Clear />}
                      sx={{ mr: 2 }}
                    >
                      Clear
                    </SecondaryButton>
                    <PrimaryButton 
                      onClick={handleTreatment} 
                      variant="contained" 
                      size="large"
                      startIcon={<LocalHospital />}
                    >
                      Get Treatment Advice
                    </PrimaryButton>
                  </Box>
                </CardContent>
              )}
            </GlassCard>
          </Grid>

          {!imageFile && (
            <Grid item xs={12} md={4}>
              <GlassCard sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  How It Works
                </Typography>
                <Typography variant="body1" paragraph>
                  Upload a clear image of a potato plant leaf, and our AI will analyze it for common diseases like:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                  <li><Typography variant="body1">Early Blight</Typography></li>
                  <li><Typography variant="body1">Late Blight</Typography></li>
                  <li><Typography variant="body1">Healthy leaves</Typography></li>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  For best results, use images with good lighting and focus on a single leaf.
                </Typography>
              </GlassCard>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Treatment Advice Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalHospital sx={{ mr: 1, color: "primary.main" }} />
            Treatment Advice for {data?.class}
          </Box>
        </DialogTitle>
        <DialogContent>
          {treatmentLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Typography sx={{ mt: 2, whiteSpace: "pre-line" }}>
              {advice}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;