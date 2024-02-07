let CANVAS = document.getElementById("myCanvas");
let ctx = CANVAS.getContext("2d");
let imgData = ctx.createImageData(1, 1);
let CanvasMiddleX = CANVAS.width / 2;
let CanvasMiddleY = CANVAS.height / 2;

// Input
let tinggiBendaInput = 100;
let jarakBendaInput = 250;
let jarakFokusInput = 100;

// Real Input Kordinat
const titikFokus = {
    "x": CanvasMiddleX - jarakFokusInput,
    "y": CanvasMiddleY
}
const tinggiBenda = {
    "x": CanvasMiddleX - jarakBendaInput,
    "y": CanvasMiddleY - tinggiBendaInput
}
const jarakBenda = {
    "x": CanvasMiddleX - jarakBendaInput,
    "y": CanvasMiddleY
}

function drawPixel(x, y, colour = "black") {
    if (colour == "blue") {
        ctx.fillStyle = "blue";
    } else if (colour == "red") {
        ctx.fillStyle = "red";
    } else if (colour == "yellow") {
        ctx.fillStyle = "yellow";
    } else if (colour == "green") {
        ctx.fillStyle = "green";
    } else {
        ctx.fillStyle = "black";
    }
    ctx.fillRect(x, y, 1, 1);
}

function garisDDA(x1, y1, x2, y2, colour) {
    let titikx_awal = x1;
    let titiky_awal = y1;

    let titikx_akhir = x2;
    let titiky_akhir = y2;

    let dx = titikx_akhir - titikx_awal;
    let dy = titiky_akhir - titiky_awal;
    let step = 0;

    if (Math.abs(dx) > Math.abs(dy)) {
        step = dx;
    } else {
        step = dy;
    }

    let x_inc = dx / Math.abs(step);
    let y_inc = dy / Math.abs(step);

    let x = titikx_awal;
    let y = titiky_awal;

    for (let s = 0; s < step; s += 1) {
        drawPixel(x, y, colour);
        x = x + x_inc;
        xa = Math.ceil(x);
        y = y + y_inc;
        ya = Math.ceil(y);
        ctx.putImageData(imgData, xa, ya);
    }
}

function getY(x1, y1, x2, y2, xi) {
    const dy = y2 - y1;
    const dx = x2 - x1;
    const m = dy / dx;
    const c = y1 - m * x1;

    return m * xi + c;
}

function getX(x1, y1, x2, y2, yi) {
    const dy = y2 - y1;
    const dx = x2 - x1;
    const m = dy / dx;
    const c = y1 - m * x1;

    return (yi - c) / m;
}

function MainCrossline() {
    garisDDA(CanvasMiddleX, 0, CanvasMiddleX, CANVAS.height, "black");
    garisDDA(0, CanvasMiddleY, CANVAS.width, CanvasMiddleY, "black");
}

function initInput() {
    // Jarak Fokus
    garisDDA(titikFokus.x, titikFokus.y - 3, titikFokus.x, titikFokus.y + 3, "red");
    // Benda
    garisDDA(tinggiBenda.x, tinggiBenda.y, jarakBenda.x, jarakBenda.y + 1, "blue");
}

function cahayaDatang() {
    // Merah
    garisDDA(
        0,
        tinggiBenda.y,
        CanvasMiddleX,
        tinggiBenda.y,
        "red"
    );
    // Kuning
    garisDDA(
        0,
        getY(tinggiBenda.x, tinggiBenda.y, CanvasMiddleX, CanvasMiddleY, 0),
        CanvasMiddleX,
        CanvasMiddleY,
        "yellow"
    );
    // Hijau
    garisDDA(
        getX(tinggiBenda.x, tinggiBenda.y, titikFokus.x, titikFokus.y, 0),
        0,
        CanvasMiddleX,
        getY(tinggiBenda.x, tinggiBenda.y, titikFokus.x, titikFokus.y, CanvasMiddleX),
        "green"
    );
}

// Run
MainCrossline();
cahayaDatang();
initInput();

