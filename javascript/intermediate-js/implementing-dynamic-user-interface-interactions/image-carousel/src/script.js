import "./styles.css";
import karthus from "../assets/Karthus.jpg";
import ashe from "../assets/Ashe.jpg";
import skarner from "../assets/Skarner.jpg";
import forward from "../assets/arrow_forward.svg";
import back from "../assets/arrow_back.svg";
import cir from "../assets/circle.svg";
import createImg from "./CreateImg";

import { mod } from "../../../../my-utility-library";
const carousel = document.createElement("div");
carousel.classList.add("carousel");

const images = [karthus, skarner, ashe];
const numOfSlides = images.length;
images.forEach((image, i) => {
  const tempImg = createImg(image);
  tempImg.classList.add("slides");
  tempImg.classList.add("img-" + i);
  carousel.appendChild(tempImg);
});

const arrowBack = createImg(back);
arrowBack.classList.add("back");
const arrowForward = createImg(forward);
arrowForward.classList.add("forward");

arrowBack.addEventListener("click", () => {
  moveLeft(index);
  blemishSlideIndicator();
  highlightCurrentCircle(index);
});
arrowForward.addEventListener("click", () => {
  moveRight(index);
  blemishSlideIndicator();
  highlightCurrentCircle(index);
});

const circles = document.createElement("div");
circles.classList.add("circles");

for (let i = 0; i < numOfSlides; i++) {
  const circle = createImg(cir);
  circle.classList.add("cir" + i);
  circles.appendChild(circle);
  circle.addEventListener("click", (e) => {
    displaySlide(i);
    blemishSlideIndicator();
    e.currentTarget.classList.add("highlight");
  });
}

carousel.appendChild(arrowBack);
carousel.appendChild(arrowForward);

const footer = document.createElement("footer");
footer.classList.add("footer");
footer.textContent = `Image Credits: League of Legends @Riot Games`;

document.body.appendChild(carousel);
document.body.appendChild(circles);
document.body.appendChild(footer);

let index = 0;
// Display & highlight for the first time page load
displaySlide(0);
document.querySelector(".cir0").classList.add("highlight");

setInterval(callbackFunc, 5000);

function callbackFunc() {
  autoRotateSlides();
  blemishSlideIndicator();
  highlightCurrentCircle(index);
}

function autoRotateSlides() {
  moveRight(index++);
}

function moveLeft(idx) {
  const modIndex = mod(idx - 1, numOfSlides);
  displaySlide(modIndex);
  index = modIndex;
}

function moveRight(idx) {
  const modIndex = mod(idx + 1, numOfSlides);
  displaySlide(modIndex);
  index = modIndex;
}

function displaySlide(idx) {
  index = idx;
  const currImg = document.querySelector(`.img-${idx}`);
  const slides = document.querySelectorAll(`.slides`);
  slides.forEach((slide) => (slide.style.display = "none"));
  currImg.style.display = "block";
}

function blemishSlideIndicator() {
  const circlesEle = document.querySelectorAll(".circles>*");
  for (const circle of circlesEle) {
    circle.classList.remove("highlight");
  }
}

function highlightCurrentCircle() {
  const currentCir = document.querySelector(".cir" + index);
  currentCir.classList.add("highlight");
}
