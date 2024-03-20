import "./style.css";
import Img from "../assets/crêpe.jpeg";

export default function intialPageLoader() {
  const div = document.getElementById("content");

  const img = new Image();
  img.src = Img;
  img.classList.add("snow-goggles-img");
  img.setAttribute("alt", "snow-goggles");

  const headline = document.createElement("h2");
  headline.textContent = "Welcome to Snow Restaurant";

  const description = document.createElement("p");
  description.textContent = "Promoting snow mochi at Timeless Tea";

  div.appendChild(img);
  div.appendChild(headline);
  div.appendChild(description);
}
