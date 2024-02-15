let CANVAS = document.getElementById("myCanvas");
let ctx = CANVAS.getContext("2d");
let imgData = ctx.createImageData(1, 1);
let CanvasMiddleX = CANVAS.width / 2;
let CanvasMiddleY = CANVAS.height / 2;

let TinggiObjek = document.getElementById("tinggiObjek");
let tinggiObjekValue = document.getElementById("tinggiObjekValue");
tinggiObjekValue.textContent = TinggiObjek.value;
let JarakBenda = document.getElementById("jarakBenda");
let jarakBendaValue = document.getElementById("jarakBendaValue");
jarakBendaValue.textContent = JarakBenda.value;
let JarakFokus = document.getElementById("jarakFokus");
let jarakFokusValue = document.getElementById("jarakFokusValue");
jarakFokusValue.textContent = jarakFokus.value;

// Input
let tinggiBendaInput = TinggiObjek.value;
let jarakBendaInput = JarakBenda.value;
let jarakFokusInput = JarakFokus.value;

TinggiObjek.addEventListener("input", () => {
    tinggiBendaInput = TinggiObjek.value;
    tinggiObjekValue.textContent = TinggiObjek.value;
    // Update 
    koorTinggiBenda.y = CanvasMiddleY - tinggiBendaInput;

    refreshBayangan();
    refreshDraw();
});

JarakBenda.addEventListener("input", () => {
    jarakBendaInput = JarakBenda.value;
    jarakBendaValue.textContent = JarakBenda.value;
    // Update 
    koorTinggiBenda.x = CanvasMiddleX - jarakBendaInput;
    koorJarakBenda.x = CanvasMiddleX - jarakBendaInput;

    refreshBayangan();
    refreshDraw();
});

JarakFokus.addEventListener("input", () => {
    jarakFokusInput = JarakFokus.value;
    jarakFokusValue.textContent = JarakFokus.value;
    // Update 
    titikFokus.x = CanvasMiddleX - jarakFokusInput;

    refreshBayangan();
    refreshDraw();
});

// Real Input Kordinat
const titikFokus = {
    x: CanvasMiddleX - jarakFokusInput,
    y: CanvasMiddleY,
};
const koorTinggiBenda = {
    x: CanvasMiddleX - jarakBendaInput,
    y: CanvasMiddleY - tinggiBendaInput,
};
const koorJarakBenda = {
    x: CanvasMiddleX - jarakBendaInput,
    y: CanvasMiddleY,
};

// Real Bayangan
const koorTinggiBayangan = {};
const koorJarakBayangan = {};
let si = 0;
let m = 0;

function refreshBayangan() {
    if (jarakFokusInput != jarakBendaInput) {
        si = 1 / ((1 / jarakFokusInput) - (1 / jarakBendaInput));
        m = Math.abs(si / jarakBendaInput);
    }

    if (jarakBendaInput > jarakFokusInput) {
        koorJarakBayangan.x = CanvasMiddleX - si;
        koorJarakBayangan.y = CanvasMiddleY;
        koorTinggiBayangan.x = CanvasMiddleX - si;
        koorTinggiBayangan.y = CanvasMiddleY + (m * tinggiBendaInput);
    } else {
        koorJarakBayangan.x = CanvasMiddleX + Math.abs(si);
        koorJarakBayangan.y = CanvasMiddleY;
        koorTinggiBayangan.x = CanvasMiddleX + Math.abs(si);
        koorTinggiBayangan.y = CanvasMiddleY - (m * tinggiBendaInput);
    }
}

// Drawing
function drawPixel(x, y, colour = "black") {
    if (colour == "blue") {
        ctx.fillStyle = "blue";
    } else if (colour == "red") {
        ctx.fillStyle = "red";
    } else if (colour == "orange") {
        ctx.fillStyle = "#FF4900";
    } else if (colour == "green") {
        ctx.fillStyle = "green";
    } else {
        ctx.fillStyle = "black";
    }
    ctx.fillRect(x, y, 1.3, 1.3);
}

function garisDDA(x1, y1, x2, y2, colour) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let step = 0;

    if (Math.abs(dx) > Math.abs(dy)) {
        step = Math.abs(dx);
    } else {
        step = Math.abs(dy);
    }

    let x_inc = dx / step;
    let y_inc = dy / step;

    let x = x1;
    let y = y1;

    for (let s = 0; s < step; s += 1) {
        drawPixel(x, y, colour);
        x = x + x_inc;
        y = y + y_inc;
    }
}

function garisDash(x1, y1, x2, y2, colour) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let step = 0;
    let dash = 0;

    if (Math.abs(dx) > Math.abs(dy)) {
        step = Math.abs(dx);
    } else {
        step = Math.abs(dy);
    }

    let x_inc = dx / step;
    let y_inc = dy / step;

    let x = x1;
    let y = y1;

    for (let s = 0; s < step; s += 1) {
        if (dash < 4) {
            drawPixel(x, y, colour);
            dash += 1;
        } else if (dash == 4) {
            dash = 9;
        } else {
            dash -= 1;
            if (dash == 5) {
                dash = 0;
            }
        }
        x = x + x_inc;
        y = y + y_inc;
    }
}

// Mencari nilai y yang belum diketahui dengan y = mx + c
function getY(x1, y1, x2, y2, xi) {
    const dy = y2 - y1;
    const dx = x2 - x1;
    const m = dy / dx;
    const c = y1 - m * x1;

    return m * xi + c;
}

// Invers Y => Mencari nilai x yang belum diketahui
function getX(x1, y1, x2, y2, yi) {
    const dy = y2 - y1;
    const dx = x2 - x1;
    const m = dy / dx;
    const c = y1 - m * x1;

    return (yi - c) / m;
}

// Garis tengah canvas
function MainCrossline() {
    garisDDA(CanvasMiddleX, 0, CanvasMiddleX, CANVAS.height, "black");
    garisDDA(0, CanvasMiddleY, CANVAS.width, CanvasMiddleY, "black");
}

// Garis benda dan titik fokus
function initInput() {
    refreshBayangan();
    // Jarak Fokus
    garisDDA(
        titikFokus.x,
        titikFokus.y - 3,
        titikFokus.x,
        titikFokus.y + 3,
        "red"
    );
    // R ( 2 x Jarak Fokus)
    garisDDA(
        titikFokus.x - jarakFokusInput,
        titikFokus.y - 3,
        titikFokus.x - jarakFokusInput,
        titikFokus.y + 3,
        "red"
    );
    // Benda
    garisDDA(
        koorTinggiBenda.x,
        koorTinggiBenda.y,
        koorJarakBenda.x,
        koorJarakBenda.y + 1,
        "blue"
    );
    // Bayangan
    garisDDA(
        koorJarakBayangan.x,
        koorJarakBayangan.y,
        koorTinggiBayangan.x,
        koorTinggiBayangan.y,
        "blue"
    );
}

const cahayaMerah = (nyata) => {
    garisDDA(
        getX(koorTinggiBenda.x, koorTinggiBenda.y, CanvasMiddleX, CanvasMiddleY, 0),
        0,
        CanvasMiddleX,
        CanvasMiddleY,
        "red"
    );
    // Pantulan
    garisDDA(
        CanvasMiddleX,
        CanvasMiddleY,
        0,
        getY(koorTinggiBayangan.x, koorTinggiBayangan.y, CanvasMiddleX, CanvasMiddleY, 0),
        "red"
    );
    if (!nyata) {
        garisDash(
            CanvasMiddleX,
            CanvasMiddleY,
            getX(koorTinggiBayangan.x, koorTinggiBayangan.y, CanvasMiddleX, CanvasMiddleY, 0),
            0,
            "red"
        );
    }
}

const cahayaHijau = (nyata) => {
    let Xpantul = 0;
    let Ypantul = 0;
    if (nyata) {
        Xpantul = CanvasMiddleX;
        Ypantul = getY(koorTinggiBenda.x, koorTinggiBenda.y, titikFokus.x, titikFokus.y, CanvasMiddleX);
        garisDDA(
            getX(koorTinggiBenda.x, koorTinggiBenda.y, titikFokus.x, titikFokus.y, 0),
            0,
            Xpantul,
            Ypantul,
            "green"
        );
        // Pantulan
        garisDDA(
            Xpantul,
            Ypantul,
            0,
            getY(koorTinggiBayangan.x, koorTinggiBayangan.y, Xpantul, Ypantul, 0),
            "green"
        );
    } else {
        Xpantul = CanvasMiddleX;
        Ypantul = koorTinggiBayangan.y;
        garisDDA(
            koorTinggiBenda.x,
            koorTinggiBenda.y,
            Xpantul,
            Ypantul,
            "green"
        );
        garisDDA(
            0,
            getY(Xpantul, Ypantul, koorTinggiBayangan.x, koorTinggiBayangan.y, 0),
            CanvasMiddleX,
            koorTinggiBayangan.y,
            "green"
        );
        garisDash(
            Xpantul,
            Ypantul,
            koorTinggiBayangan.x,
            koorTinggiBayangan.y,
            "green"
        );
    }
}

const cahayaOranye = (nyata) => {
    const Xpantul = CanvasMiddleX;
    const Ypantul = koorTinggiBenda.y;

    garisDDA(
        0,
        koorTinggiBenda.y,
        Xpantul,
        Ypantul,
        "orange"
    );
    // Pantulan
    garisDDA(
        Xpantul,
        Ypantul,
        getX(Xpantul, Ypantul, koorTinggiBayangan.x, koorTinggiBayangan.y, CANVAS.height),
        CANVAS.height,
        "orange"
    );

    if (!nyata) {
        garisDash(
            Xpantul,
            Ypantul,
            getX(koorTinggiBayangan.x, koorTinggiBayangan.y, Xpantul, Ypantul, 0),
            0,
            "orange"
        );
    }
}

function cahayaDatang() {
    if (jarakBendaInput < jarakFokusInput) {
        // Merah
        cahayaMerah(false);
        // Hijau
        cahayaHijau(false);
        // Oranye
        cahayaOranye(false);
    } else {
        // Merah
        cahayaMerah(true);
        // Hijau
        cahayaHijau(true);
        // Oranye
        cahayaOranye(true);
    }
}

function refreshDraw() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    MainCrossline();
    initInput();
    cahayaDatang();
}

// Run
refreshDraw();
