// import React, { useState } from 'react';
// import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView } from 'react-native';
// import { Button, Card, Title, Paragraph } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import * as FileSystem from 'expo-file-system';

// export default function HomeScreen() {

//   // ✅ Define Prediction type properly
//   type Prediction = {
//     class: string;
//     confidence: number;
//   };

//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [prediction, setPrediction] = useState<Prediction | null>(null); // ✅ fixed type
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const pickImage = async () => {
//     setError(null);
//     setPrediction(null);
    
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       setError('Permission to access camera roll is required!');
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//     //   mediaTypes: [ImagePicker.MediaType.Images],
//     mediaTypes:'images',
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//       await uploadImage(result.assets[0].uri);
//     }
//   };

//   const takePhoto = async () => {
//     setError(null);
//     setPrediction(null);
    
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       setError('Permission to access camera is required!');
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ['images'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//       await uploadImage(result.assets[0].uri);
//     }
//   };

// const uploadImage = async (uri: string) => {
//   setIsLoading(true);
//   try {
//     // Create FormData object
//     const formData = new FormData();
    
//     // Get file info
//     const fileInfo = await FileSystem.getInfoAsync(uri);
//     const filename = uri.split('/').pop() || 'image.jpg';
//     const fileType = 'image/jpeg'; // or detect from filename
    
//     // Append the file with proper structure
//     formData.append('file', {
//       uri,
//       name: filename,
//       type: fileType,
//     } as any); // Type assertion needed for React Native

//     // const response = await axios.post<Prediction>(
//     //   'http://192.168.1.38:8080/predict',
//     //   formData,
//     //   {
//     //     headers: {
//     //       'Content-Type': 'multipart/form-data',
//     //     },
//     //   }
//     // );

//     const response = await axios.post<Prediction>(
//       'https://potato-disease-classifier-ynoz.onrender.com/predict',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     if (!response.data?.class) {
//       throw new Error('Invalid response from server');
//     }
//     setPrediction(response.data);
//   } catch (err) {
//     console.error('Upload error:', err);
//     setError('Failed to process image. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const clearSelection = () => {
//     setSelectedImage(null);
//     setPrediction(null);
//     setError(null);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Card style={styles.card}>
//         <Card.Content>
//           <Title style={styles.title}>Potato Disease Classifier</Title>
//           <Paragraph style={styles.subtitle}>
//             Upload an image of a potato leaf to check for diseases
//           </Paragraph>
//         </Card.Content>

//         {selectedImage ? (
//           <>
//             <Card.Cover source={{ uri: selectedImage }} style={styles.image} />
//             {isLoading ? (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#6200ee" />
//                 <Text style={styles.loadingText}>Analyzing image...</Text>
//               </View>
//             ) : prediction ? (
//               <Card.Content style={styles.resultContainer}>
//                 <Text style={styles.resultTitle}>Analysis Results</Text>
//                 <View style={styles.resultRow}>
//                   <Text style={styles.resultLabel}>Condition:</Text>
//                   <Text style={styles.resultValue}>{prediction.class}</Text>
//                 </View>
//                 <View style={styles.resultRow}>
//                   <Text style={styles.resultLabel}>Confidence:</Text>
//                   <Text style={styles.resultValue}>
//                     {(prediction.confidence * 100).toFixed(2)}%
//                   </Text>
//                 </View>
//               </Card.Content>
//             ) : null}
//           </>
//         ) : (
//           <Card.Content style={styles.placeholderContainer}>
//             <Image
//               source={require('../../assets/images/placeholder.png')}
//               style={styles.placeholderImage}
//             />
//             <Text style={styles.placeholderText}>No image selected</Text>
//           </Card.Content>
//         )}

//         {error && (
//           <Card.Content>
//             <Text style={styles.errorText}>{error}</Text>
//           </Card.Content>
//         )}

//         <Card.Actions style={styles.actions}>
//           {selectedImage ? (
//             <Button 
//               mode="contained" 
//               onPress={clearSelection} 
//               style={styles.button}
//               labelStyle={styles.buttonLabel}
//             >
//               Clear
//             </Button>
//           ) : (
//             <>
//               <Button 
//                 mode="contained" 
//                 onPress={pickImage} 
//                 style={styles.button}
//                 labelStyle={styles.buttonLabel}
//               >
//                 Choose Photo
//               </Button>
//               <Button 
//                 mode="outlined" 
//                 onPress={takePhoto} 
//                 style={styles.button}
//                 labelStyle={styles.outlinedButtonLabel}
//               >
//                 Take Photo
//               </Button>
//             </>
//           )}
//         </Card.Actions>
//       </Card>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
//   card: { marginBottom: 20, borderRadius: 12, backgroundColor: 'white', elevation: 3 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4, color: '#333' },
//   subtitle: { fontSize: 16, color: '#666' },
//   image: { height: 300, resizeMode: 'contain', backgroundColor: '#f9f9f9' },
//   placeholderContainer: { alignItems: 'center', justifyContent: 'center', height: 200, paddingVertical: 40 },
//   placeholderImage: { width: 100, height: 100, opacity: 0.3 },
//   placeholderText: { marginTop: 16, color: '#999', fontSize: 16 },
//   loadingContainer: { padding: 40, alignItems: 'center' },
//   loadingText: { marginTop: 16, fontSize: 16, color: '#666' },
//   resultContainer: { marginTop: 20, paddingHorizontal: 16 },
//   resultTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333', textAlign: 'center' },
//   resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 8 },
//   resultLabel: { fontSize: 16, fontWeight: '600', color: '#555' },
//   resultValue: { fontSize: 16, fontWeight: 'bold', color: '#6200ee' },
//   errorText: { color: 'red', textAlign: 'center', fontSize: 16, marginVertical: 8 },
//   actions: { justifyContent: 'center', marginTop: 20, paddingHorizontal: 16, paddingBottom: 20 },
//   button: { margin: 8, borderRadius: 8, minWidth: 160 },
//   buttonLabel: { color: 'white', fontWeight: 'bold', fontSize: 16 },
//   outlinedButtonLabel: { fontWeight: 'bold', fontSize: 16 },
// });

import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  type Prediction = {
    class: string;
    confidence: number;
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    setError(null);
    setPrediction(null);
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    setError(null);
    setPrediction(null);
    
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const filename = uri.split('/').pop() || 'image.jpg';
      const fileType = 'image/jpeg';
      
      formData.append('file', {
        uri,
        name: filename,
        type: fileType,
      } as any);

      const response = await axios.post<Prediction>(
        'https://potato-disease-classifier-ynoz.onrender.com/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response.data?.class) {
        throw new Error('Invalid response from server');
      }
      setPrediction(response.data);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setPrediction(null);
    setError(null);
  };

  const getDiseaseColor = (disease: string) => {
    const lowerDisease = disease.toLowerCase();
    if (lowerDisease.includes('healthy')) return '#4CAF50';
    if (lowerDisease.includes('early')) return '#FF9800';
    if (lowerDisease.includes('late')) return '#F44336';
    return '#6200EE';
  };

  return (
    <LinearGradient
      colors={['#f5f7fa', '#e4e8f0']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardHeader}
          >
            <Text style={styles.title}>Potato Disease Classifier</Text>
            <Text style={styles.subtitle}>
              Upload an image of a potato leaf to check for diseases
            </Text>
          </LinearGradient>

          <View style={styles.imageContainer}>
            {selectedImage ? (
              <>
                <Image source={{ uri: selectedImage }} style={styles.image} />
                <View style={styles.imageOverlay} />
              </>
            ) : (
              <View style={styles.placeholderContainer}>
                <MaterialIcons name="photo-camera" size={60} color="#aaa" />
                <Text style={styles.placeholderText}>No image selected</Text>
              </View>
            )}
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6a11cb" />
              <Text style={styles.loadingText}>Analyzing image...</Text>
            </View>
          )}

          {prediction && (
            <View style={[
              styles.resultContainer,
              { borderColor: getDiseaseColor(prediction.class) }
            ]}>
              <Text style={styles.resultTitle}>Analysis Results</Text>
              
              <View style={styles.resultRow}>
                <View style={styles.resultIcon}>
                  <MaterialIcons 
                    name={prediction.class.toLowerCase().includes('healthy') ? 'check-circle' : 'warning'} 
                    size={24} 
                    color={getDiseaseColor(prediction.class)} 
                  />
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultLabel}>Condition:</Text>
                  <Text style={[
                    styles.resultValue,
                    { color: getDiseaseColor(prediction.class) }
                  ]}>
                    {prediction.class}
                  </Text>
                </View>
              </View>
              
              <View style={styles.resultRow}>
                <View style={styles.resultIcon}>
                  <MaterialIcons name="speed" size={24} color="#666" />
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultLabel}>Confidence:</Text>
                  <Text style={styles.resultValue}>
                    {(prediction.confidence * 100).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={24} color="#F44336" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            {selectedImage ? (
              <Button 
                mode="contained" 
                onPress={clearSelection} 
                style={styles.clearButton}
                labelStyle={styles.buttonLabel}
                icon="close"
              >
                Clear Selection
              </Button>
            ) : (
              <>
                <Button 
                  mode="contained" 
                  onPress={pickImage} 
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  icon="image"
                >
                  Choose Photo
                </Button>
                <Button 
                  mode="contained" 
                  onPress={takePhoto} 
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  icon="camera"
                >
                  Take Photo
                </Button>
              </>
            )}
          </View>
        </Card>

        <View style={styles.infoBox}>
          <MaterialIcons name="info" size={20} color="#2575fc" />
          <Text style={styles.infoText}>
            For best results, take a clear photo of a potato leaf against a plain background.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 16,
    color: '#aaa',
    fontSize: 16,
  },
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  resultContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 2,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultIcon: {
    marginRight: 16,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFEBEE',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#F44336',
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    flexWrap: 'wrap',
  },
  button: {
    margin: 8,
    borderRadius: 10,
    minWidth: width * 0.4,
    backgroundColor: '#6a11cb',
    elevation: 2,
  },
  clearButton: {
    margin: 8,
    borderRadius: 10,
    minWidth: width * 0.8,
    backgroundColor: '#F44336',
    elevation: 2,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 6,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
  },
  infoText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
    flex: 1,
  },
});