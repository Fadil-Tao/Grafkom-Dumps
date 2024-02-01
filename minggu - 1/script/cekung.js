
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);


function DrawLine(imagesData, x, y, r, g, b) {
  let index = 4 * (x + y * canvas.width);
  imagesData.data[index] = r;
  imagesData.data[index + 1] = g;
  imagesData.data[index + 2] = b;
  imagesData.data[index + 3] = 255;
}

// Algoritma DDA    
function DDA(imageData, x1, x2, y1, y2, r, g, b) {
  let dx = x2 - x1;
  let dy = y2 - y1;

  if (Math.abs(dx) > Math.abs(dy)) {
    // jalan di x
    if (x2 > x1) {
      // ke kanan
      let y = y1;
      for (let x = x1; x < x2; x++) {
        y = y + dy / Math.abs(dx);
        DrawLine(imageData, x, y, r, g, b);
      }
    } else {
      //ke kiri
      let y = y1;
      for (let x = x1; x > x2; x--) {
        y = y + dy / Math.abs(dx);
        DrawLine(imageData, x, y, r, g, b);
      }
    }
  } else {
    // jalan di y
    if (y2 > y1) {
      // ke atas
      let x = x1;
      for (let y = y1; y < y2; y++) {
        x = x + dx / Math.abs(dy);
        DrawLine(imageData, x, y, r, g, b);
      }
    } else {
      //ke bawah
      let x = x1;
      for (let y = y1; y > y2; y--) {
        x = x + dx / Math.abs(dy);
        DrawLine(imageData, x, y, r, g, b);
      }
    }
  }
}





// Garis X yang warna kuning dari ujung ke ujung
DDA(imageData, 0, 300, 100, 100, 235, 235, 122);
// Garis titik fokus yang warna putih
DDA(imageData,120,120,95,105,255,255,255)
// Garis titik jari jari yang warna biru


cerminCekung(imageData, 100, 100, 50, 50, 110, 110, 110);

ctx.putImageData(imageData, 0, 0);