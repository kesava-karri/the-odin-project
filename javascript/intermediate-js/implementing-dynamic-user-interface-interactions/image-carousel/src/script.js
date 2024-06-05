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

const imgKarthus = createImg(karthus);
imgKarthus.classList.add("slides");
imgKarthus.classList.add("img-0");
carousel.appendChild(imgKarthus);

const imgSkarner = createImg(skarner);
imgSkarner.classList.add("slides");
imgSkarner.classList.add("img-1");
carousel.appendChild(imgSkarner);

const imgAshe = createImg(ashe);
imgAshe.classList.add("slides");
imgAshe.classList.add("img-2");
carousel.appendChild(imgAshe);

const arrowBack = createImg(back);
arrowBack.classList.add("back");
const arrowForward = createImg(forward);
arrowForward.classList.add("forward");

const circle0 = createImg(cir);
circle0.classList.add("cir0");
const circle1 = createImg(cir);
circle1.classList.add("cir1");
const circle2 = createImg(cir);
circle2.classList.add("cir2");

carousel.appendChild(arrowBack);
carousel.appendChild(arrowForward);

const footer = document.createElement("footer");
footer.classList.add("footer");
footer.textContent = `Image Credits: League of Legends @Riot Games`;

document.body.appendChild(carousel);
const circles = document.createElement("div");
circles.classList.add("circles");
circles.appendChild(circle0);
circles.appendChild(circle1);
circles.appendChild(circle2);
document.body.appendChild(circles);
document.body.appendChild(footer);

let index = 0;
const numOfSlides = 3;
// Display & highlight for the first time page load
displaySlide(0);
circle0.classList.add("highlight");

setInterval(callbackFunc, 5000);

function callbackFunc() {
  autoRotateSlides();
  blemishSlideIndicator();
  highlightCurrentCircle(index);
}
function autoRotateSlides() {
  moveRight(index++);
  console.log("Hey Ashe, what's up?");
}

circle0.addEventListener("click", (e) => {
  displaySlide(0);
  blemishSlideIndicator();
  e.currentTarget.classList.add("highlight");
});
circle1.addEventListener("click", (e) => {
  displaySlide(1);
  blemishSlideIndicator();
  e.currentTarget.classList.add("highlight");
});
circle2.addEventListener("click", (e) => {
  displaySlide(2);
  blemishSlideIndicator();
  e.currentTarget.classList.add("highlight");
});

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
