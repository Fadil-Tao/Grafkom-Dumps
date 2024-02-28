import drawCekung from "../lib/cekung.js";
import drawCembung from "../lib/cembung.js";

const cekungButton = document.getElementById("cekungButton");
const cembungButton = document.getElementById("cembungButton");
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const nav = document.getElementById("main-nav");

cekungButton.addEventListener("click", () => {
  moveNavAside();
  changeTitle("cekung");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCekung();
});
cembungButton.addEventListener("click", () => {
  moveNavAside();
  context.clearRect(0, 0, canvas.width, canvas.height);
  changeTitle("cembung");
  drawCembung();
});

function moveNavAside() {
  nav.style.top = "0";
  nav.style.right = "0";
}

function changeTitle(title) {
  const judulDiv = document.querySelector(".judul");

  const h1Element = judulDiv.querySelector("h1");
  const paragraphs = judulDiv.querySelectorAll("p");
  paragraphs.forEach((p) => p.remove());
  h1Element.textContent = title;
}
