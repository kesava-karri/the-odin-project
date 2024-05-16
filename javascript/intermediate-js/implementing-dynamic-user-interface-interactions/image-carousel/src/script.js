import "./styles.css";
import karthus from "../assets/Karthus.jpg";
import ashe from "../assets/Ashe.jpg";
import lux from "../assets/5.jpg";
import forward from "../assets/arrow_forward.svg";
import back from "../assets/arrow_back.svg";
import cir from "../assets/circle.svg";
import createImg from "./CreateImg";

const carousel = document.createElement("div");
carousel.classList.add("carousel");

const container = document.createElement("div");
container.classList.add("container");

container.appendChild(createImg(karthus, "karthus"));
container.appendChild(createImg(ashe, "ashe"));
container.appendChild(createImg(lux, "lux"));

const arrowForward = createImg(forward, "forward");
const arrowBack = createImg(back, "back");
const circle0 = createImg(cir, "circle0");
const circle1 = createImg(cir, "circle1");
const circle2 = createImg(cir, "circle2");

carousel.appendChild(arrowBack);
carousel.appendChild(container);
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
