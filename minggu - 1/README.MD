## Note 
- Setiap fungsi pake rgb di 3 parameter terakhir contoh:
```
   function DrawLine(imagesData, x, y, r, g, b) {
  let index = 4 * (x + y * canvas.width);
  imagesData.data[index] = r;
  imagesData.data[index + 1] = g;
  imagesData.data[index + 2] = b;
  imagesData.data[index + 3] = 255;
}
```

rgb buat warna nya


## Function drawline

Fungsi DrawLine digunakan untuk menggambar garis pada sebuah gambar berdasarkan koordinat dan warna yang ditentukan.
### Parameter
    imagesData: Data gambar yang akan dimodifikasi. Ini biasanya berupa objek ImageData dari elemen <canvas>.
    - x: Koordinat horizontal (x) dari titik awal garis.
    - y: Koordinat vertikal (y) dari titik awal garis.
    - r: Nilai warna merah (0-255).
    - g: Nilai warna hijau (0-255).
    - b: Nilai warna biru (0-255).

Penggunaan:
```
  DrawLine(imagesData, x, y, r, g, b);
```

contoh :
```
  // Menggambar garis pada koordinat (100, 100) dengan warna merah
DrawLine(imagesData, 100, 100, 255, 0, 0);

```


## Function DDA


Fungsi `DDA` digunakan untuk menggambar garis menggunakan algoritma Digital Differential Analyzer (DDA) antara dua titik pada sebuah gambar.

## Parameter

- `imageData`: Data gambar yang akan dimodifikasi. Ini biasanya berupa objek `ImageData` dari elemen `<canvas>`.
- `x1`: Koordinat horizontal (x) dari titik awal garis.
- `x2`: Koordinat horizontal (x) dari titik akhir garis.
- `y1`: Koordinat vertikal (y) dari titik awal garis.
- `y2`: Koordinat vertikal (y) dari titik akhir garis.
- `r`: Nilai warna merah (0-255).
- `g`: Nilai warna hijau (0-255).
- `b`: Nilai warna biru (0-255).

## Penggunaan

```javascript
DDA(imageData, x1, x2, y1, y2, r, g, b);
```

```javascript
// Menggambar garis antara titik (100, 100) dan (200, 200) dengan warna merah
DDA(imageData, 100, 200, 100, 200, 255, 0, 0);
```


## function cermin cekung
Pada fungsi `cerminCekung`, nilai `x` dan `y` dihitung menggunakan rumus parameter parametrik untuk elips:

- Untuk nilai `x`: `x = xc + radiusX * Math.cos(theta / 4 - (1/4) * Math.PI )`
- Untuk nilai `y`: `y = yc + radiusY * Math.sin(theta / 4 - (1/4) * Math.PI )`

Di sini:
- `xc` dan `yc` adalah koordinat pusat elips.
- `radiusX` adalah jari-jari elips pada sumbu horizontal.
- `radiusY` adalah jari-jari elips pada sumbu vertikal.
- `theta` adalah sudut dalam radian yang berubah dari 0 hingga 2π (satu putaran lengkap).
- `Math.cos` dan `Math.sin` digunakan untuk menghitung koordinat `x` dan `y` berdasarkan sudut `theta`.
- `(1/4) * Math.PI` digunakan untuk memutar elips sehingga dimulai dari kuadran atas kanan (biasanya elips dimulai dari sumbu x positif).

Nilai `x` dan `y` kemudian digunakan sebagai koordinat titik pada gambar untuk menggambar garis menggunakan fungsi `DrawLine`.
