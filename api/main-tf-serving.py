# # from fastapi import FastAPI,UploadFile, File,HTTPException
# # import uvicorn
# # import numpy as np
# # from PIL import Image
# # import io
# # import tensorflow as tf
# # import requests

# # app= FastAPI()

# # endpoint="http://localhost:8502/v1/models/potatoes_model:predict"

# # # MODEL=tf.keras.models.load_model(r"..\models\3\potatoes3.keras")
# # CLASS_NAMES=["Early Blight", "Late Blight", "Healthy"]

# # def read_file_as_image(data)->np.ndarray:
# #     image=np.array(Image.open(io.BytesIO(data)))
# #     return image

# # @app.get("/ping")
# # async def ping():
# #     return {"message": "pong"}

# # @app.post("/predict")
# # async def predict(
# #     file:UploadFile = File(...),
# # ):
# #     image=read_file_as_image(await file.read())
# #     img_batch=np.expand_dims(image, axis=0)
# #     json_data = {
# #         "instances": img_batch.tolist()
# #     }
# #     headers = {"Content-Type": "application/json"}
# #     response=requests.post(endpoint,json=json_data, headers=headers)
# #     # Handle potential errors
# #     if response.status_code != 200:
# #         raise HTTPException(
# #             status_code=response.status_code,
# #             detail=f"Error from TensorFlow Serving: {response.text}"
# #         )
    
# #     prediction=np.array(response.json()["predictions"][0])
# #     predicted_class = CLASS_NAMES[np.argmax(prediction)] # return index of max probability
# #     confidence=np.max(prediction) # return max probability
# #     return {
# #         "class": predicted_class,
# #         "confidence": float(confidence)
# #     }

# # if __name__ == "__main__":
# #     uvicorn.run(app,host="localhost",port=8080)

# from fastapi import FastAPI, UploadFile, File, HTTPException
# import uvicorn
# import numpy as np
# from PIL import Image
# import io
# import requests

# app = FastAPI()

# # TensorFlow Serving endpoint
# endpoint = "http://localhost:8502/v1/models/potatoes_model:predict"

# # Classes (update if model has more/less classes)
# CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

# def read_file_as_image(data: bytes, target_size=(256, 256)) -> np.ndarray:
#     """
#     Convert uploaded image bytes into a preprocessed numpy array.
#     Resizes, converts to RGB, and normalizes between 0-1.
#     """
#     try:
#         image = Image.open(io.BytesIO(data)).convert("RGB")
#         image = image.resize(target_size)  # Resize to model's expected input
#         image = np.array(image).astype(np.float32) / 255.0  # Normalize
#         return image
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Image processing failed: {str(e)}")

# @app.get("/ping")
# async def ping():
#     """Health check endpoint."""
#     return {"message": "pong"}

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     try:
#         # Read uploaded image
#         contents = await file.read()
#         image = read_file_as_image(contents)

#         # Ensure shape is (1, H, W, C)
#         if image.ndim == 3:
#             img_batch = np.expand_dims(image, axis=0)  # (1,H,W,C)
#         else:
#             raise HTTPException(status_code=400, detail="Invalid image format")

#         # Prepare JSON for TF Serving
#         json_data = {"instances": img_batch.tolist()}
#         headers = {"Content-Type": "application/json"}

#         # Send request to TensorFlow Serving
#         response = requests.post(endpoint, json=json_data, headers=headers)

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"TensorFlow Serving Error: {response.text}"
#             )

#         # Parse prediction
#         result = response.json()
#         if "predictions" not in result:
#             raise HTTPException(status_code=500, detail="Invalid response from TF Serving")

#         prediction = np.array(result["predictions"][0])
#         predicted_class = CLASS_NAMES[int(np.argmax(prediction))]
#         confidence = float(np.max(prediction))

#         return {"class": predicted_class, "confidence": confidence}

#     except HTTPException:
#         raise  # Re-raise known exceptions
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# if __name__ == "__main__":
#     uvicorn.run(app, host="localhost", port=8080)
