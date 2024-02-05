let CANVAS = document.getElementById("myCanvas");
let ctx = CANVAS.getContext("2d");
let imgData = ctx.createImageData(1, 1);
let CanvasMiddleX = CANVAS.width / 2;
let CanvasMiddleY = CANVAS.height / 2;


function drawPixel(x, y) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 1, 1);
}

function garisDDA(x1, y1, x2, y2) {
  let titikx_awal = x1;
  let titiky_awal = y1;

  let titikx_akhir = x2;
  let titiky_akhir = y2;

  let dx = titikx_akhir - titikx_awal;
  let dy = titiky_akhir - titiky_awal;
  let step = 0;

  if (dx > dy) {
    step = dx;
  } else {
    step = dy;
  }

  let x_inc = dx / step;
  let y_inc = dy / step;

  let x = titikx_awal;
  let y = titiky_awal;

  for (let s = 0; s < step; s += 1) {
    x = x + x_inc;
    xa = Math.ceil(x);
    y = y + y_inc;
    ya = Math.ceil(y);
    ctx.putImageData(imgData, xa, ya);
    drawPixel(x, y);
    console.log(x_inc + " " + y_inc);
  }
}

function MainCrossline() {
  garisDDA(CanvasMiddleX, 0, CanvasMiddleX, CANVAS.height);
  garisDDA(0,CanvasMiddleY,CANVAS.width,CanvasMiddleY);
}

MainCrossline();

