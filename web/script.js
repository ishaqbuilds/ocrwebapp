const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let lastX = 0;
let lastY = 0;

// Drawing style
ctx.lineWidth = 18;
ctx.lineCap = "round";
ctx.lineJoin = "round"; // smoother joins
ctx.strokeStyle = "#00ffcc";

// Mouse events
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseout", () => drawing = false); // stop drawing if cursor leaves canvas
canvas.addEventListener("mousemove", draw);

// Touch events
canvas.addEventListener("touchstart", (e) => {
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    lastX = touch.clientX - rect.left;
    lastY = touch.clientY - rect.top;
});
canvas.addEventListener("touchend", () => drawing = false);
canvas.addEventListener("touchcancel", () => drawing = false);
canvas.addEventListener("touchmove", drawTouch);

function draw(e) {
    if (!drawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function drawTouch(e) {
    e.preventDefault();
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

// Clear canvas
document.getElementById("clear").onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("digit").innerText = "-";
};

// Predict digit
document.getElementById("predict").onclick = async () => {
    const base64 = canvas.toDataURL("image/png").split(",")[1];

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 })
        });

        const data = await response.json();
        document.getElementById("digit").innerText = data.prediction;
    } catch (err) {
        alert("Error connecting to server. Make sure server.py is running!");
        console.error(err);
    }
};
