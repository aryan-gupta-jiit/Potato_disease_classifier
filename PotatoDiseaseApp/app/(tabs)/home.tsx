// import React, { useState } from 'react';
// import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView } from 'react-native';
// import { Button, Card, Title, Paragraph } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import * as FileSystem from 'expo-file-system';

// export default function HomeScreen() {

//     type prediction = {
//   label: string;
//   confidence: number;
// };

//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [prediction, setPrediction] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const pickImage = async () => {
//     setError(null);
//     setPrediction(null);
    
//     // Request permissions
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       setError('Permission to access camera roll is required!');
//       return;
//     }

//     // Launch image picker
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    
//     // Request permissions
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       setError('Permission to access camera is required!');
//       return;
//     }

//     // Launch camera
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//       await uploadImage(result.assets[0].uri);
//     }
//   };

//   const uploadImage = async (uri:string) => {
//     setIsLoading(true);
//     try {
//       // Read the file as base64
//       const file = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       // Send to your FastAPI backend
//       const response = await axios.post('http://YOUR_BACKEND_IP:8080/predict', {
//         file: `data:image/jpeg;base64,${file}`,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setPrediction(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to process image. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//           <Paragraph style={styles.subtitle}>Upload an image of a potato leaf to check for diseases</Paragraph>
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
//               source={require('../assets/images/placeholder.png')}
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
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   card: {
//     marginBottom: 20,
//     borderRadius: 12,
//     backgroundColor: 'white',
//     elevation: 3,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//   },
//   image: {
//     height: 300,
//     resizeMode: 'contain',
//     backgroundColor: '#f9f9f9',
//   },
//   placeholderContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 200,
//     paddingVertical: 40,
//   },
//   placeholderImage: {
//     width: 100,
//     height: 100,
//     opacity: 0.3,
//   },
//   placeholderText: {
//     marginTop: 16,
//     color: '#999',
//     fontSize: 16,
//   },
//   loadingContainer: {
//     padding: 40,
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#666',
//   },
//   resultContainer: {
//     marginTop: 20,
//     paddingHorizontal: 16,
//   },
//   resultTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//     textAlign: 'center',
//   },
//   resultRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   resultLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#555',
//   },
//   resultValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#6200ee',
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 16,
//     marginVertical: 8,
//   },
//   actions: {
//     justifyContent: 'center',
//     marginTop: 20,
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
//   button: {
//     margin: 8,
//     borderRadius: 8,
//     minWidth: 160,
//   },
//   buttonLabel: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   outlinedButtonLabel: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen() {

  // ✅ Define Prediction type properly
  type Prediction = {
    class: string;
    confidence: number;
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null); // ✅ fixed type
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
    //   mediaTypes: [ImagePicker.MediaType.Images],
    mediaTypes:'images',
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
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  // ✅ properly typed upload function
//   const uploadImage = async (uri: string) => {
//     setIsLoading(true);
//     try {
//       const file = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       const response = await axios.post<Prediction>(
//         'http:192.168.137.98:8080/predict',
//         { file: `data:image/jpeg;base64,${file}` },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       if (!response.data?.class) {
//         throw new Error('Invalid response from server');
//       }
//       setPrediction(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to process image. Please ensure: \n1. Backend is running\n2. Devices are on same network\n3. Try again');
//     } finally {
//       setIsLoading(false);
//     }
//   };

const uploadImage = async (uri: string) => {
  setIsLoading(true);
  try {
    // Create FormData object
    const formData = new FormData();
    
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const filename = uri.split('/').pop() || 'image.jpg';
    const fileType = 'image/jpeg'; // or detect from filename
    
    // Append the file with proper structure
    formData.append('file', {
      uri,
      name: filename,
      type: fileType,
    } as any); // Type assertion needed for React Native

    const response = await axios.post<Prediction>(
      'http://192.168.1.38:8080/predict',
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Potato Disease Classifier</Title>
          <Paragraph style={styles.subtitle}>
            Upload an image of a potato leaf to check for diseases
          </Paragraph>
        </Card.Content>

        {selectedImage ? (
          <>
            <Card.Cover source={{ uri: selectedImage }} style={styles.image} />
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
                <Text style={styles.loadingText}>Analyzing image...</Text>
              </View>
            ) : prediction ? (
              <Card.Content style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Analysis Results</Text>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Condition:</Text>
                  <Text style={styles.resultValue}>{prediction.class}</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Confidence:</Text>
                  <Text style={styles.resultValue}>
                    {(prediction.confidence * 100).toFixed(2)}%
                  </Text>
                </View>
              </Card.Content>
            ) : null}
          </>
        ) : (
          <Card.Content style={styles.placeholderContainer}>
            <Image
              source={require('../../assets/images/placeholder.png')}
              style={styles.placeholderImage}
            />
            <Text style={styles.placeholderText}>No image selected</Text>
          </Card.Content>
        )}

        {error && (
          <Card.Content>
            <Text style={styles.errorText}>{error}</Text>
          </Card.Content>
        )}

        <Card.Actions style={styles.actions}>
          {selectedImage ? (
            <Button 
              mode="contained" 
              onPress={clearSelection} 
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Clear
            </Button>
          ) : (
            <>
              <Button 
                mode="contained" 
                onPress={pickImage} 
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Choose Photo
              </Button>
              <Button 
                mode="outlined" 
                onPress={takePhoto} 
                style={styles.button}
                labelStyle={styles.outlinedButtonLabel}
              >
                Take Photo
              </Button>
            </>
          )}
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { marginBottom: 20, borderRadius: 12, backgroundColor: 'white', elevation: 3 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  subtitle: { fontSize: 16, color: '#666' },
  image: { height: 300, resizeMode: 'contain', backgroundColor: '#f9f9f9' },
  placeholderContainer: { alignItems: 'center', justifyContent: 'center', height: 200, paddingVertical: 40 },
  placeholderImage: { width: 100, height: 100, opacity: 0.3 },
  placeholderText: { marginTop: 16, color: '#999', fontSize: 16 },
  loadingContainer: { padding: 40, alignItems: 'center' },
  loadingText: { marginTop: 16, fontSize: 16, color: '#666' },
  resultContainer: { marginTop: 20, paddingHorizontal: 16 },
  resultTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333', textAlign: 'center' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 8 },
  resultLabel: { fontSize: 16, fontWeight: '600', color: '#555' },
  resultValue: { fontSize: 16, fontWeight: 'bold', color: '#6200ee' },
  errorText: { color: 'red', textAlign: 'center', fontSize: 16, marginVertical: 8 },
  actions: { justifyContent: 'center', marginTop: 20, paddingHorizontal: 16, paddingBottom: 20 },
  button: { margin: 8, borderRadius: 8, minWidth: 160 },
  buttonLabel: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  outlinedButtonLabel: { fontWeight: 'bold', fontSize: 16 },
});
