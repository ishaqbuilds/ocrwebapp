# OCR Web App

 Full-stack handwritten digit recognition web app. Draw digits in the browser and see predictions.

---

## 🚀 Features

- Draw digits on a responsive canvas in the browser
- Predict digits using a KNN model trained on MNIST
- Works with mouse and touch devices
- Backend uses Python Flask

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Python Flask  
- **Machine Learning:** scikit-learn KNN, MNIST dataset  
- **Libraries:** NumPy, Pillow, Flask-CORS  

---

## ⚡ How to Use


### 1️⃣ Clone the repository
```bash
git clone https://github.com/ishaqbuilds/ocrwebapp.git
cd ocrwebapp/server
```

### 2️⃣ Create virtual environment & install dependencies
```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1   # Windows PowerShell
pip install -r requirements.txt
```

### 3️⃣ Train the model
```bash
python train_model.py
```
This will download the MNIST dataset, train a simple KNN model, and save it as `model.pkl`.

### 4️⃣ Start the backend server
```bash
python server.py
```
Your Flask server will run at `http://127.0.0.1:5000`.

### 5️⃣ Serve the frontend
Open a **new terminal** in the `web/` folder:
```bash
cd ../web
python -m http.server 8000
```
Your frontend will be available at `http://localhost:8000`.

### 6️⃣ Open in browser
Go to `http://localhost:8000`, draw a digit on the canvas, and click **Predict**.  
You will see the predicted digit displayed immediately.



