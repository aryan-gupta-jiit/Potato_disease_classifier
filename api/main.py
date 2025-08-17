from fastapi import FastAPI,UploadFile, File
import uvicorn
import numpy as np
from PIL import Image
import io
import tensorflow as tf

app= FastAPI()

MODEL=tf.keras.models.load_model(r"..\models\potatoes.keras")
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
