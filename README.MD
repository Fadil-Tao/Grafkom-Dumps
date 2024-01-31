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