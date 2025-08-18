from fastapi import FastAPI,UploadFile, File
import uvicorn
import numpy as np
from PIL import Image
import io
import os
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins like ["https://example.com"]
    allow_credentials=True,
    allow_methods=["*"],  # You can specify methods like ["GET", "POST"]
    allow_headers=["*"],  # You can specify headers like ["Authorization", "Content-Type"]
)

# MODEL=tf.keras.models.load_model(r"..\models\potatoes.keras")
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "potatoes.keras")

MODEL = tf.keras.models.load_model(MODEL_PATH)
CLASS_NAMES=["Early Blight", "Late Blight", "Healthy"]

def read_file_as_image(data)->np.ndarray:
    image=np.array(Image.open(io.BytesIO(data)))
    return image

@app.get("/ping")
async def ping():
    return {"message": "pong"}

@app.post("/predict")
async def predict(
    file:UploadFile = File(...),
):
    image=read_file_as_image(await file.read())
    img_batch=np.expand_dims(image, axis=0)
    predictions=MODEL.predict(img_batch)
    class_index=np.argmax(predictions[0]) # return index of max probability
    predicted_class=CLASS_NAMES[class_index]
    confidence=np.max(predictions[0]) # return max probability
    return {
        "class": predicted_class,
        "confidence": float(confidence),
    }

if __name__ == "__main__":
    uvicorn.run(app,host="localhost",port=8080)
