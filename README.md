# 🥔 Potato Disease Classifier

A machine learning-based system for classifying potato plant diseases using deep learning and computer vision. This project can identify three categories: Early Blight, Late Blight, and Healthy potato plants.

## 🌟 Features

- **Disease Classification**: Automatically detects and classifies potato plant diseases
- **Three Categories**: Early Blight, Late Blight, and Healthy plants
- **REST API**: FastAPI-based web service for easy integration
- **TensorFlow Serving**: Production-ready model serving capabilities
- **High Accuracy**: Trained on PlantVillage dataset for reliable predictions
- **Easy to Use**: Simple API endpoints for image upload and prediction

## 🏗️ Project Structure

```
Potato_disease_classifier/
├── api/                          # API server files
│   ├── main.py                  # FastAPI main application
│   ├── main-tf-serving.py       # TensorFlow Serving integration
│   └── requirements.txt         # Python dependencies
├── models/                       # Trained model files
│   ├── potatoes.keras           # Main Keras model
│   ├── 1.keras                 # Model version 1
│   └── potatoes.h5              # HDF5 format model
├── saved_models/                # TensorFlow SavedModel files
│   └── potatoes_model/          # Model versions (1, 2, 3)
├── training/                    # Training scripts and data
│   ├── training.ipynb          # Jupyter notebook for model training
│   ├── models/                 # Additional model files
│   └── PlantVillage/           # Dataset directory
├── convert.py                   # Model conversion script
├── models.config               # TensorFlow Serving configuration
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- TensorFlow 2.x
- FastAPI
- PIL (Pillow)
- NumPy

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Potato_disease_classifier
   ```

2. **Install dependencies**
   ```bash
   cd api
   pip install -r requirements.txt
   ```

3. **Run the API server**
   ```bash
   python main.py
   ```

The server will start at `http://localhost:8080`

## 📖 API Usage

### Health Check
```bash
curl http://localhost:8080/ping
```
Response: `{"message": "pong"}`

### Disease Prediction
```bash
curl -X POST "http://localhost:8080/predict" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@path/to/potato_image.jpg"
```

**Response Format:**
```json
{
  "class": "Early Blight",
  "confidence": 0.95
}
```

## 🔧 Model Training

The model training is documented in the Jupyter notebook located at `training/training.ipynb`. This notebook contains:

- Data preprocessing steps
- Model architecture definition
- Training configuration
- Evaluation metrics
- Model saving procedures

## 🚀 TensorFlow Serving

For production deployment, you can use TensorFlow Serving:

1. **Convert models** (if needed):
   ```bash
   python convert.py
   ```

2. **Start TensorFlow Serving**:
   ```bash
   docker run -p 8501:8501 \
     --mount type=bind,source=$(pwd)/saved_models,target=/models \
     -e MODEL_NAME=potatoes_model \
     -t tensorflow/serving
   ```

3. **Use the TF Serving API**:
   ```bash
   python api/main-tf-serving.py
   ```

## 📊 Model Performance

The classifier is trained on the PlantVillage dataset and can achieve high accuracy in distinguishing between:

- **Early Blight**: Characterized by dark, concentric spots on leaves
- **Late Blight**: Water-soaked lesions that spread rapidly
- **Healthy**: Normal, disease-free potato plants

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- PlantVillage dataset for providing the training data
- TensorFlow team for the excellent deep learning framework
- FastAPI for the modern, fast web framework

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include error messages and system information

## 🔮 Future Enhancements

- [ ] Support for more plant species
- [ ] Real-time video classification
- [ ] Mobile app integration
- [ ] Cloud deployment options
- [ ] Model explainability features
- [ ] Batch processing capabilities

---

**Happy Potato Disease Detection! 🥔🔍**

backend server -> https://potato-disease-classifier-ynoz.onrender.com/