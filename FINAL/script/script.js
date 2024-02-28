import drawCekung from "../lib/cekung.js";
import drawCembung from "../lib/cembung.js";

const cekungButton = document.getElementById("cekungButton");
const cembungButton = document.getElementById("cembungButton");
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const nav = document.getElementById("main-nav");
const lensName = document.getElementById("lensName");
const judulDiv = document.querySelector(".judul");
const h1Element = judulDiv.querySelector("h1");
const paragraphs = judulDiv.querySelectorAll("p");

cekungButton.addEventListener("click", () => {
  changeTitle("cekung");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCekung();
});
cembungButton.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  changeTitle("cembung");
  drawCembung();
});

function changeTitle(title) {
  paragraphs.forEach((p) => p.remove());
  lensName.textContent = title;
  h1Element.remove();
}
