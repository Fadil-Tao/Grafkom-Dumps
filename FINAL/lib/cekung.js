export default function drawCekung() {
  let CANVAS = document.getElementById("myCanvas");
  let ctx = CANVAS.getContext("2d");
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
  jarakFokusValue.textContent = JarakFokus.value;

  const gantiObjek = document.getElementById("gantiObjek");
  let userOption = gantiObjek.value;

  // Input
  let tinggiBendaInput = Number(TinggiObjek.value);
  let jarakBendaInput = Number(JarakBenda.value);
  let jarakFokusInput = Number(JarakFokus.value);

  gantiObjek.addEventListener("click", () => {
    userOption = gantiObjek.value;
    refreshDraw();
  });

  TinggiObjek.addEventListener("input", () => {
    tinggiBendaInput = Number(TinggiObjek.value);
    tinggiObjekValue.textContent = `${TinggiObjek.value} px`;
    // Update
    koorTinggiBenda.y = CanvasMiddleY - tinggiBendaInput;
    refreshDraw();
  });

  JarakBenda.addEventListener("input", () => {
    jarakBendaInput = Number(JarakBenda.value);
    jarakBendaValue.textContent = `${JarakBenda.value} px`;
    // Update
    koorTinggiBenda.x = CanvasMiddleX - jarakBendaInput;
    koorJarakBenda.x = CanvasMiddleX - jarakBendaInput;
    refreshDraw();
  });

  JarakFokus.addEventListener("input", () => {
    jarakFokusInput = Number(JarakFokus.value);
    jarakFokusValue.textContent = `${JarakFokus.value} px`;
    // Update
    titikFokus.x = CanvasMiddleX - jarakFokusInput;
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
  let bayanganInput = 0;
  let m = 0;

  // Fungsi untuk mengambil beberapa nilai dibelakang koma
  function truncate(num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
  }

  function refreshBayangan() {
    if (jarakFokusInput != jarakBendaInput) {
      bayanganInput = 1 / (1 / jarakFokusInput - 1 / jarakBendaInput);
      m = Math.abs(bayanganInput / jarakBendaInput);
    } else {
      jarakFokusInput += 1;
    }

    if (jarakBendaInput > jarakFokusInput) {
      koorJarakBayangan.x = CanvasMiddleX - bayanganInput;
      koorJarakBayangan.y = CanvasMiddleY;
      koorTinggiBayangan.x = CanvasMiddleX - bayanganInput;
      koorTinggiBayangan.y = CanvasMiddleY + m * tinggiBendaInput;
    } else if (jarakBendaInput < jarakFokusInput) {
      koorJarakBayangan.x = CanvasMiddleX + Math.abs(bayanganInput);
      koorJarakBayangan.y = CanvasMiddleY;
      koorTinggiBayangan.x = CanvasMiddleX + Math.abs(bayanganInput);
      koorTinggiBayangan.y = CanvasMiddleY - m * tinggiBendaInput;
    }
  }

  // Drawing
  function drawPixel(x, y, colour = "black") {
    if (colour == "blue") {
      ctx.fillStyle = "blue";
    } else if (colour == "red") {
      ctx.fillStyle = "red";
    } else if (colour == "purple") {
      ctx.fillStyle = "#FF00FF";
    } else if (colour == "green") {
      ctx.fillStyle = "green";
    } else if (colour == "badBlue") {
      ctx.fillStyle = "#00008B";
    } else if (colour == "badPurple") {
      ctx.fillStyle = "#5d2097";
    } else if (colour == "abu") {
      ctx.fillStyle = "#6a6868";
    } else if (colour == "Peach") {
      ctx.fillStyle = "#fe676e";
    } else if (colour == "badAbu") {
      ctx.fillStyle = "#9e9393";
    } else {
      ctx.fillStyle = "black";
    }
    ctx.fillRect(x, y, 1.1, 1.1);
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

  function Rumah(input, objectJarak, objectTinggi) {
    // Ukuran pembesaran dari masing-masing titik
    const incX = input / 3;
    const incSegitiga = input / 6;
    const incPintuX = input / 10;
    const incPintuY = input / 3.5;
    const incCerobong = input / 15;

    // Titik Sudut
    const bawahKiri = { x: objectJarak.x - incX, y: CanvasMiddleY - 10 };
    const bawahKanan = { x: objectJarak.x + incX, y: CanvasMiddleY - 10 };
    const atasKiri = {
      x: objectJarak.x - incX,
      y: objectTinggi.y + incSegitiga + incPintuX,
    };
    const atasKanan = {
      x: objectJarak.x + incX,
      y: objectTinggi.y + incSegitiga + incPintuX,
    };
    const tinggiSegitiga = { x: objectTinggi.x, y: objectTinggi.y };
    // Titik sudut Lebihan Atap Rumah
    const lebihAtapKiri = getY(
      atasKiri.x,
      atasKiri.y,
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      atasKiri.x - incSegitiga
    );
    const lebihAtapKanan = getY(
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      atasKanan.x,
      atasKanan.y,
      atasKanan.x + incSegitiga
    );

    // Alas
    garisDDA(
      // Kiri ke pintu
      bawahKiri.x,
      bawahKiri.y,
      objectJarak.x - incPintuX,
      bawahKanan.y,
      "black"
    );
    garisDDA(
      // Kanan ke pintu
      bawahKanan.x,
      bawahKanan.y,
      objectJarak.x + incPintuX,
      bawahKanan.y,
      "black"
    );
    garisDDA(
      // Kiri pintu ke atas
      objectJarak.x - incPintuX,
      bawahKiri.y,
      objectJarak.x - incPintuX,
      bawahKiri.y - incPintuY,
      "black"
    );
    garisDDA(
      // Kanan pintu ke atas
      objectJarak.x + incPintuX,
      bawahKiri.y,
      objectJarak.x + incPintuX,
      bawahKiri.y - incPintuY,
      "black"
    );
    garisDDA(
      // Sudut pintu ke sudut pintu
      objectJarak.x - incPintuX,
      bawahKiri.y - incPintuY,
      objectJarak.x + incPintuX,
      bawahKiri.y - incPintuY,
      "black"
    );

    // Sisi Rumah
    garisDDA(bawahKiri.x, bawahKanan.y, atasKiri.x, atasKanan.y, "black");
    garisDDA(bawahKanan.x, bawahKanan.y, atasKanan.x, atasKanan.y, "black");

    // Atap
    garisDDA(
      atasKiri.x - incSegitiga,
      lebihAtapKiri,
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      "badBlue"
    );
    garisDDA(
      atasKanan.x + incSegitiga,
      lebihAtapKanan,
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      "badBlue"
    );

    if (objectJarak == koorJarakBenda) {
      // Cerobong Asap
      garisDDA(
        atasKiri.x + incCerobong,
        getY(
          atasKiri.x,
          atasKiri.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKiri.x + incCerobong
        ),
        atasKiri.x + incCerobong,
        getY(
          atasKiri.x,
          atasKiri.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKiri.x + incCerobong
        ) - incSegitiga
      );
      garisDDA(
        atasKiri.x + incSegitiga,
        getY(
          atasKiri.x,
          atasKiri.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKiri.x + incSegitiga
        ),
        atasKiri.x + incSegitiga,
        getY(
          atasKiri.x,
          atasKiri.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKiri.x + incCerobong
        ) - incSegitiga
      );
      garisDDA(
        atasKiri.x + incCerobong,
        getY(
          atasKiri.x,
          atasKiri.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKiri.x + incCerobong
        ) - incSegitiga,
        atasKiri.x + incSegitiga,
        getY(
          atasKiri.x,
          atasKiri.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKiri.x + incCerobong
        ) - incSegitiga
      );

      // Jendela
      garisDDA(
        // Sisi Kiri
        objectJarak.x + incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        objectJarak.x + incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        "red"
      );
      garisDDA(
        // Sisi Kanan
        objectJarak.x + 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        objectJarak.x + 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        "red"
      );
      garisDDA(
        // Sisi Bawah
        objectJarak.x + incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        objectJarak.x + 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        "red"
      );
      garisDDA(
        // Sisi Atas
        objectJarak.x + incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        objectJarak.x + 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        "red"
      );
      garisDDA(
        // Pembelah x
        objectJarak.x + incPintuX,
        bawahKiri.y - 1.8 * incPintuY - incCerobong,
        objectJarak.x + 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - incCerobong,
        "abu"
      );
      garisDDA(
        // Pembelah y
        objectJarak.x + (3 / 2) * incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        objectJarak.x + (3 / 2) * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        "abu"
      );
    } else {
      // Cerobong Asap
      // Panjang
      garisDDA(
        atasKanan.x - incCerobong,
        getY(
          atasKanan.x,
          atasKanan.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKanan.x - incCerobong
        ),
        atasKanan.x - incCerobong,
        getY(
          atasKanan.x,
          atasKanan.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKanan.x - incCerobong
        ) - incSegitiga
      );
      // Pendek
      garisDDA(
        atasKanan.x - incSegitiga,
        getY(
          atasKanan.x,
          atasKanan.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKanan.x - incSegitiga
        ),
        atasKanan.x - incSegitiga,
        getY(
          atasKanan.x,
          atasKanan.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKanan.x - incCerobong
        ) - incSegitiga
      );
      // Penghubung
      garisDDA(
        atasKanan.x - incCerobong,
        getY(
          atasKanan.x,
          atasKanan.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKanan.x - incCerobong
        ) - incSegitiga,
        atasKanan.x - incSegitiga,
        getY(
          atasKanan.x,
          atasKanan.y,
          tinggiSegitiga.x,
          tinggiSegitiga.y,
          atasKanan.x - incCerobong
        ) - incSegitiga
      );

      // Jendela
      garisDDA(
        // Sisi Kiri
        objectJarak.x - incPintuX,
        bawahKanan.y - 1.8 * incPintuY,
        objectJarak.x - incPintuX,
        bawahKanan.y - 1.8 * incPintuY - 2 * incCerobong,
        "red"
      );
      garisDDA(
        // Sisi Kanan
        objectJarak.x - 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        objectJarak.x - 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        "red"
      );
      garisDDA(
        // Sisi Bawah
        objectJarak.x - incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        objectJarak.x - 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        "red"
      );
      garisDDA(
        // Sisi Atas
        objectJarak.x - incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        objectJarak.x - 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        "red"
      );
      garisDDA(
        // Pembelah x
        objectJarak.x - incPintuX,
        bawahKiri.y - 1.8 * incPintuY - incCerobong,
        objectJarak.x - 2 * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - incCerobong,
        "abu"
      );
      garisDDA(
        // Pembelah y
        objectJarak.x - (3 / 2) * incPintuX,
        bawahKiri.y - 1.8 * incPintuY,
        objectJarak.x - (3 / 2) * incPintuX,
        bawahKiri.y - 1.8 * incPintuY - 2 * incCerobong,
        "abu"
      );
    }
  }

  function RumahTerbalik(input, objectJarak, objectTinggi) {
    // Ukuran pembesaran dari masing-masing titik
    const incX = input / 3;
    const incSegitiga = input / 6;
    const incPintuX = input / 10;
    const incPintuY = input / 3.5;
    const incCerobong = input / 15;

    // Titik Sudut
    const bawahKiri = { x: objectJarak.x - incX, y: CanvasMiddleY + 10 };
    const bawahKanan = { x: objectJarak.x + incX, y: CanvasMiddleY + 10 };
    const atasKiri = {
      x: objectJarak.x - incX,
      y: objectTinggi.y - incSegitiga - incPintuX,
    };
    const atasKanan = {
      x: objectJarak.x + incX,
      y: objectTinggi.y - incSegitiga - incPintuX,
    };
    const tinggiSegitiga = { x: objectTinggi.x, y: objectTinggi.y };
    // Titik sudut Lebihan Atap Rumah
    const lebihAtapKiri = getY(
      atasKiri.x,
      atasKiri.y,
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      atasKiri.x - incSegitiga
    );
    const lebihAtapKanan = getY(
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      atasKanan.x,
      atasKanan.y,
      atasKanan.x + incSegitiga
    );

    // Alas
    garisDDA(
      // Kiri ke pintu
      bawahKiri.x,
      bawahKiri.y,
      objectJarak.x - incPintuX,
      bawahKanan.y,
      "black"
    );
    garisDDA(
      // Kanan ke pintu
      bawahKanan.x,
      bawahKanan.y,
      objectJarak.x + incPintuX,
      bawahKanan.y,
      "black"
    );
    garisDDA(
      // Kiri pintu ke atas
      objectJarak.x - incPintuX,
      bawahKiri.y,
      objectJarak.x - incPintuX,
      bawahKiri.y + incPintuY,
      "black"
    );
    garisDDA(
      // Kanan pintu ke atas
      objectJarak.x + incPintuX,
      bawahKiri.y,
      objectJarak.x + incPintuX,
      bawahKiri.y + incPintuY,
      "black"
    );
    garisDDA(
      // Sudut pintu ke sudut pintu
      objectJarak.x - incPintuX,
      bawahKiri.y + incPintuY,
      objectJarak.x + incPintuX,
      bawahKiri.y + incPintuY,
      "black"
    );

    // Sisi Rumah
    garisDDA(bawahKiri.x, bawahKanan.y, atasKiri.x, atasKanan.y, "black");
    garisDDA(bawahKanan.x, bawahKanan.y, atasKanan.x, atasKanan.y, "black");

    // Atap
    garisDDA(
      atasKiri.x - incSegitiga,
      lebihAtapKiri,
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      "badBlue"
    );
    garisDDA(
      atasKanan.x + incSegitiga,
      lebihAtapKanan,
      tinggiSegitiga.x,
      tinggiSegitiga.y,
      "badBlue"
    );

    // Cerobong Asap
    // Pendek
    garisDDA(
      atasKiri.x + incCerobong,
      getY(
        atasKiri.x,
        atasKiri.y,
        tinggiSegitiga.x,
        tinggiSegitiga.y,
        atasKiri.x + incCerobong
      ),
      atasKiri.x + incCerobong,
      getY(
        atasKiri.x,
        atasKiri.y,
        tinggiSegitiga.x,
        tinggiSegitiga.y,
        atasKiri.x + incCerobong
      ) + incSegitiga
    );
    // Panjang
    garisDDA(
      atasKiri.x + incSegitiga,
      getY(
        atasKiri.x,
        atasKiri.y,
        tinggiSegitiga.x,
        tinggiSegitiga.y,
        atasKiri.x + incSegitiga
      ),
      atasKiri.x + incSegitiga,
      getY(
        atasKiri.x,
        atasKiri.y,
        tinggiSegitiga.x,
        tinggiSegitiga.y,
        atasKiri.x + incCerobong
      ) + incSegitiga
    );
    // Penghubung
    garisDDA(
      atasKiri.x + incCerobong,
      getY(
        atasKiri.x,
        atasKiri.y,
        tinggiSegitiga.x,
        tinggiSegitiga.y,
        atasKiri.x + incCerobong
      ) + incSegitiga,
      atasKiri.x + incSegitiga,
      getY(
        atasKiri.x,
        atasKiri.y,
        tinggiSegitiga.x,
        tinggiSegitiga.y,
        atasKiri.x + incCerobong
      ) + incSegitiga
    );

    // Jendela
    garisDDA(
      // Sisi Kiri
      objectJarak.x + incPintuX,
      bawahKanan.y + 1.8 * incPintuY,
      objectJarak.x + incPintuX,
      bawahKanan.y + 1.8 * incPintuY + 2 * incCerobong,
      "red"
    );
    garisDDA(
      // Sisi Kanan
      objectJarak.x + 2 * incPintuX,
      bawahKiri.y + 1.8 * incPintuY,
      objectJarak.x + 2 * incPintuX,
      bawahKiri.y + 1.8 * incPintuY + 2 * incCerobong,
      "red"
    );
    garisDDA(
      // Sisi Bawah
      objectJarak.x + incPintuX,
      bawahKiri.y + 1.8 * incPintuY,
      objectJarak.x + 2 * incPintuX,
      bawahKiri.y + 1.8 * incPintuY,
      "red"
    );
    garisDDA(
      // Sisi Atas
      objectJarak.x + incPintuX,
      bawahKiri.y + 1.8 * incPintuY + 2 * incCerobong,
      objectJarak.x + 2 * incPintuX,
      bawahKiri.y + 1.8 * incPintuY + 2 * incCerobong,
      "red"
    );
    garisDDA(
      // Pembelah x
      objectJarak.x + incPintuX,
      bawahKiri.y + 1.8 * incPintuY + incCerobong,
      objectJarak.x + 2 * incPintuX,
      bawahKiri.y + 1.8 * incPintuY + incCerobong,
      "abu"
    );
    garisDDA(
      // Pembelah y
      objectJarak.x + (3 / 2) * incPintuX,
      bawahKiri.y + 1.8 * incPintuY,
      objectJarak.x + (3 / 2) * incPintuX,
      bawahKiri.y + 1.8 * incPintuY + 2 * incCerobong,
      "abu"
    );
  }

  // Garis tengah canvas
  function MainCrossline() {
    // Sumbu Y
    for (let i = 0; i <= 4; i++) {
      garisDDA(CanvasMiddleX + i, 0, CanvasMiddleX + i, CANVAS.height, "abu");
    }
    // Sumbu x
    garisDDA(0, CanvasMiddleY, CANVAS.width, CanvasMiddleY, "black");
  }

  // Garis benda dan titik fokus
  function initInput() {
    refreshBayangan();
    // Benda
    if (userOption == "Rumah") {
      Rumah(tinggiBendaInput, koorJarakBenda, koorTinggiBenda);
      if (jarakBendaInput < jarakFokusInput) {
        Rumah(tinggiBendaInput * m, koorJarakBayangan, koorTinggiBayangan);
      } else {
        RumahTerbalik(
          tinggiBendaInput * m,
          koorJarakBayangan,
          koorTinggiBayangan
        );
      }
    } else {
      Gelas(tinggiBendaInput, koorJarakBenda, koorTinggiBenda, false);
      Gelas(tinggiBendaInput * m, koorJarakBayangan, koorTinggiBayangan, true);
    }

    // Titik Fokus
    garisDDA(
      titikFokus.x,
      titikFokus.y - 5,
      titikFokus.x,
      titikFokus.y + 5,
      "red"
    );
    garisDDA(
      titikFokus.x + 1,
      titikFokus.y - 5,
      titikFokus.x + 1,
      titikFokus.y + 5,
      "red"
    );
    // R ( 2 x Titik Fokus)
    garisDDA(
      titikFokus.x - jarakFokusInput,
      titikFokus.y - 5,
      titikFokus.x - jarakFokusInput,
      titikFokus.y + 5,
      "red"
    );
    garisDDA(
      titikFokus.x - jarakFokusInput - 1,
      titikFokus.y - 5,
      titikFokus.x - jarakFokusInput - 1,
      titikFokus.y + 5,
      "red"
    );
    // TItik-titik tengah benda
    garisDash(
      koorTinggiBenda.x,
      koorTinggiBenda.y,
      koorJarakBenda.x,
      koorJarakBenda.y + 1,
      "badPurple"
    );
    // Bayangan
    garisDash(
      koorJarakBayangan.x,
      koorJarakBayangan.y,
      koorTinggiBayangan.x,
      koorTinggiBayangan.y,
      "badPurple"
    );
  }

  const cahayaMerah = (terbalik) => {
    garisDDA(
      getX(
        koorTinggiBenda.x,
        koorTinggiBenda.y,
        CanvasMiddleX,
        CanvasMiddleY,
        0
      ),
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
      getY(
        koorTinggiBayangan.x,
        koorTinggiBayangan.y,
        CanvasMiddleX,
        CanvasMiddleY,
        0
      ),
      "red"
    );
    // Ruang 4
    if (!terbalik) {
      garisDash(
        CanvasMiddleX,
        CanvasMiddleY,
        getX(
          koorTinggiBayangan.x,
          koorTinggiBayangan.y,
          CanvasMiddleX,
          CanvasMiddleY,
          0
        ),
        0,
        "red"
      );
    }
  };

  const cahayaHijau = (terbalik) => {
    let Xpantul = 0;
    let Ypantul = 0;
    if (terbalik) {
      Xpantul = CanvasMiddleX;
      Ypantul = getY(
        koorTinggiBenda.x,
        koorTinggiBenda.y,
        titikFokus.x,
        titikFokus.y,
        CanvasMiddleX
      );
      garisDDA(
        getX(
          koorTinggiBenda.x,
          koorTinggiBenda.y,
          titikFokus.x,
          titikFokus.y,
          0
        ),
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
      // Ruang 4
    } else {
      Xpantul = CanvasMiddleX;
      Ypantul = koorTinggiBayangan.y;
      garisDDA(koorTinggiBenda.x, koorTinggiBenda.y, Xpantul, Ypantul, "green");
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
        CanvasMiddleX * 2,
        koorTinggiBayangan.y,
        "green"
      );
    }
  };

  const cahayaUngu = (terbalik) => {
    const Xpantul = CanvasMiddleX;
    const Ypantul = koorTinggiBenda.y;

    garisDDA(0, koorTinggiBenda.y, Xpantul, Ypantul, "purple");
    // Pantulan
    garisDDA(
      Xpantul,
      Ypantul,
      getX(
        Xpantul,
        Ypantul,
        koorTinggiBayangan.x,
        koorTinggiBayangan.y,
        CANVAS.height
      ),
      CANVAS.height,
      "purple"
    );
    // Ruang 4
    if (!terbalik) {
      garisDash(
        Xpantul,
        Ypantul,
        getX(koorTinggiBayangan.x, koorTinggiBayangan.y, Xpantul, Ypantul, 0),
        0,
        "purple"
      );
    }
  };

  function Lingkaran(xc, yc, radius, terbalik, theta, maxTheta = Math.PI * 2) {
    if (!terbalik) {
      while (truncate(theta, 3) <= maxTheta) {
        let xi = xc + radius * Math.cos(theta);
        let yi = yc + radius * Math.sin(theta);
        drawPixel(xi, yi, "blue");
        theta += 0.003;
      }
    } else {
      while (truncate(theta, 3) <= maxTheta) {
        let xi = xc + radius * Math.cos(theta);
        let yi = yc - radius * Math.sin(theta);
        drawPixel(xi, yi, "blue");
        theta += 0.003;
      }
    }
  }

  function elips(xc, yc, radiusX, radiusY, theta, maxTheta = Math.PI * 2) {
    while (truncate(theta, 3) <= maxTheta) {
      let xi = xc + radiusX * Math.cos(theta);
      let yi = yc + radiusY * Math.sin(theta);
      drawPixel(xi, yi, "badAbu");
      theta += 0.003;
    }
  }

  function cahayaDatang() {
    if (jarakBendaInput <= jarakFokusInput) {
      // Merah
      cahayaMerah(false);
      // Oranye
      cahayaUngu(false);
      if (jarakBendaInput != jarakFokusInput) {
        // Hijau
        cahayaHijau(false);
      }
      // Ruang 4
    } else {
      // Merah
      cahayaMerah(true);
      // Hijau
      cahayaHijau(true);
      // Oranye
      cahayaUngu(true);
    }
  }

  function Gelas(input, objectJarak, objectTinggi, bayangan) {
    const incX = input / 3;
    const incY = input / 10;
    const incGagang = input / 7;
    const bawahKiri = { x: objectJarak.x - incX, y: 0 };
    const bawahKanan = { x: objectJarak.x + incX, y: 0 };
    const atasKiri = { x: objectJarak.x - incX, y: objectTinggi.y };
    const atasKanan = { x: objectJarak.x + incX, y: objectTinggi.y };
    if (!bayangan) {
      bawahKiri.y = CanvasMiddleY - 10;
      bawahKanan.y = CanvasMiddleY - 10;
      // Alas Gelas
      elips(objectJarak.x, bawahKiri.y, incX, incY, 0, 3.14);
      // Gagang
      garisDDA(
        bawahKiri.x,
        bawahKiri.y - incGagang,
        bawahKiri.x - incX,
        bawahKiri.y - incGagang,
        "black"
      );
      garisDDA(
        atasKiri.x,
        atasKiri.y + incGagang,
        atasKiri.x - incX,
        atasKiri.y + incGagang,
        "black"
      );
      garisDDA(
        bawahKiri.x - incX,
        bawahKiri.y - incGagang,
        atasKiri.x - incX,
        atasKiri.y + incGagang,
        "black"
      );
    } else {
      if (jarakBendaInput > jarakFokusInput) {
        bawahKiri.y = CanvasMiddleY + 10;
        bawahKanan.y = CanvasMiddleY + 10;
        // Alas Gelas
        elips(objectJarak.x, bawahKiri.y, incX, incY, 3.14, 6.28);
        // Gagang
        garisDDA(
          bawahKiri.x,
          bawahKiri.y + incGagang,
          bawahKiri.x - incX,
          bawahKiri.y + incGagang,
          "black"
        );
        garisDDA(
          atasKiri.x,
          atasKiri.y - incGagang,
          atasKiri.x - incX,
          atasKiri.y - incGagang,
          "black"
        );
        garisDDA(
          bawahKiri.x - incX,
          bawahKiri.y + incGagang,
          atasKiri.x - incX,
          atasKiri.y - incGagang,
          "black"
        );
      } else {
        bawahKiri.y = CanvasMiddleY - 10;
        bawahKanan.y = CanvasMiddleY - 10;
        // Alas Gelas
        elips(objectJarak.x, bawahKiri.y, incX, incY, 0, 3.14);
        // Gagang
        garisDDA(
          bawahKanan.x,
          bawahKanan.y - incGagang,
          bawahKanan.x + incX,
          bawahKanan.y - incGagang,
          "black"
        );
        garisDDA(
          atasKanan.x,
          atasKanan.y + incGagang,
          atasKanan.x + incX,
          atasKanan.y + incGagang,
          "black"
        );
        garisDDA(
          bawahKanan.x + incX,
          bawahKanan.y - incGagang,
          atasKanan.x + incX,
          atasKanan.y + incGagang,
          "black"
        );
      }
    }
    // Sisi
    garisDDA(bawahKiri.x, bawahKiri.y, atasKiri.x, atasKiri.y, "Peach");
    garisDDA(bawahKanan.x, bawahKanan.y, atasKanan.x, atasKanan.y, "Peach");
    // Atas Gelas
    elips(objectJarak.x, objectTinggi.y, incX, incY, 0, Math.PI * 2);
  }

  function refreshDraw() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    refreshBayangan();
    MainCrossline();
    initInput();
    cahayaDatang();
    // Cermin
    Lingkaran(
      CanvasMiddleX - jarakFokusInput * 2,
      CanvasMiddleY,
      jarakFokusInput * 2,
      false,
      0,
      0.6
    );
    Lingkaran(
      CanvasMiddleX - jarakFokusInput * 2,
      CanvasMiddleY,
      jarakFokusInput * 2,
      true,
      0,
      0.6
    );
  }

  // Initiate
  refreshDraw();
}
