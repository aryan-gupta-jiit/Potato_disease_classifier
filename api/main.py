from fastapi import FastAPI,UploadFile, File
import uvicorn
import numpy as np
from PIL import Image
import io
import os
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

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

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

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
    # print(file.split(".")[-1])
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

@app.post("/treatment")
async def treatment(data:dict):
    disease=data.get("disease","unknown")
    if disease == "unknown":
        return {"advice": "Your plant is healthy. No treatment needed ✅"}
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"Give a farmer-friendly treatment advice for potato disease: {disease}. Keep it short and practical."
    response = model.generate_content(prompt)
    return {"advice": response.text}

if __name__ == "__main__":
    uvicorn.run(app,host="192.168.1.38",port=8080)
