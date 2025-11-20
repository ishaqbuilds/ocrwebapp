from sklearn.datasets import fetch_openml
from sklearn.neighbors import KNeighborsClassifier
import pickle

print("Downloading MNIST dataset...")
mnist = fetch_openml('mnist_784', version=1)
X, y = mnist['data'], mnist['target']

print("Training KNN classifier...")
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)

with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model saved to model.pkl")
