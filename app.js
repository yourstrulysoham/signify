const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const retrieveBtn = document.getElementById('retrieve-btn');
const textColorPicker = document.getElementById('text-color');
const backgroundColorPicker = document.getElementById('background-color');
const fontSizePicker = document.getElementById('font-size');

// Set canvas dimensions
canvas.width = 500;
canvas.height = 300;

// Set initial drawing properties
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;

// Drawing functionality
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);

// Clear canvas
clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

// Save and download signature
saveBtn.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = dataUrl;
    link.click();
});

// Retrieve saved signature
retrieveBtn.addEventListener('click', () => {
    const savedSignature = localStorage.getItem('signature');
    if (savedSignature) {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = savedSignature;
    }
});

// Update drawing properties
textColorPicker.addEventListener('input', () => ctx.strokeStyle = textColorPicker.value);
backgroundColorPicker.addEventListener('input', () => canvas.style.backgroundColor = backgroundColorPicker.value);
fontSizePicker.addEventListener('input', () => ctx.lineWidth = fontSizePicker.value);