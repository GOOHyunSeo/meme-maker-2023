const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const fillIcon = document.getElementsByClassName("fill-icon");
const drawIcon = document.getElementsByClassName("draw-icon");
const eraseBtn = document.getElementById("erase-btn");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("line-width");
const saveBtn = document.getElementById("save-btn");

const textInput = document.getElementById("text-input");
const textSize = document.getElementById("text-size");
const textFont = document.getElementById("text-font");
const textBtn = document.getElementById("text-btn");
const fileInput = document.getElementById("file-input");

const RocknRollOne = new FontFace(
  "RocknRollOne",
  "url(RocknRoll_One/RocknRollOne-Regular.ttf)"
);
RocknRollOne.load().then(function () {});

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isDrawing = false;
let isFilling = false;
let isOutline = false;

function onMove(event) {
  if (isDrawing == true) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startDraw(event) {
  isDrawing = true;
}
function stopDraw() {
  isDrawing = false;
  ctx.beginPath();
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onCanvasDoubleClick(event) {
  const text = textInput.value;
  const textSizeValue = parseInt(textSize.value);
  const textFontValue = textFont.value;
  if (text !== null) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${textSizeValue}px ${textFontValue}`;
    if (isOutline) {
      ctx.fillText(text, event.offsetX, event.offsetY);
    } else {
      ctx.strokeText(text, event.offsetX, event.offsetY);
    }
    ctx.restore();
  }
}

function onDestroyClick() {
  const answer = confirm("You really want to destroy?");
  if (answer) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onModeClick() {
  if (isFilling) {
    // console.log("draw clicked!");
    // fillIcon.classList.remove("hidden");
    modeBtn.innerText = "Fill";
    isFilling = false;
  } else {
    // console.log("fill clicked!!!!");
    // drawIcon.classList.remove("hidden");
    modeBtn.innerText = "Draw";
    isFilling = true;
  }
}
function onEraseClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  console.log(colorValue);
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "MyDrawing.png";
  a.click();
}

function onTextBtnClick() {
  if (isOutline) {
    textBtn.innerText = "Solid";
    isOutline = false;
  } else {
    textBtn.innerText = "Outline";
    isOutline = true;
  }
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onCanvasDoubleClick);

destroyBtn.addEventListener("click", onDestroyClick);
modeBtn.addEventListener("click", onModeClick);
eraseBtn.addEventListener("click", onEraseClick);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
lineWidth.addEventListener("change", onLineWidthChange);
saveBtn.addEventListener("click", onSaveClick);

textBtn.addEventListener("click", onTextBtnClick);
fileInput.addEventListener("change", onFileChange);
