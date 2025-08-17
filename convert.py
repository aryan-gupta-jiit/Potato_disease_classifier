import tensorflow as tf

models = {
    "potatoes1": "models/1/potatoes1.keras",
    "potatoes2": "models/2/potatoes2.keras",
    "potatoes3": "models/3/potatoes3.keras"
}

for name, path in models.items():
    model = tf.keras.models.load_model(path)
    
    # Save as SavedModel (TF Serving-compatible)
    model.save(f"models/{name}/1")  # No save_format needed! Creates `saved_model.pb`