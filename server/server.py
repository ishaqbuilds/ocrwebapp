from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
from PIL import Image
import base64
import io

print("Starting server script...")

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load model
print("Loading model...")
try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", e)
    exit(1)

def preprocess_base64_image(image_data):
    image_bytes = base64.b64decode(image_data)
    img = Image.open(io.BytesIO(image_bytes)).convert("L")
    img = img.resize((28, 28))
    arr = np.array(img)
    arr = arr.reshape(1, -1)
    return arr

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    processed = preprocess_base64_image(data["image"])
    prediction = model.predict(processed)[0]
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    print("Starting Flask server on port 5000...")
    app.run(port=5000)
