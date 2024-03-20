import "./styles.css";
import Img from "../assets/crêpe.jpeg";

export default function initialPageLoader() {
  const div = document.getElementById("content");

  // Remove previous content before appending new content while tab switching
  while(div.firstChild) {
    div.removeChild(div.firstChild);
  }

  const img = new Image();
  img.src = Img;
  img.classList.add("crêpe");
  img.setAttribute("alt", "crêpe-and-coffee");
  
  const headline = document.createElement("h2");
  headline.textContent = "Welcome to Snow Restaurant 🌨️";
  
  const description = document.createElement("p");
  description.textContent = "Bon Appétit";

  div.appendChild(img);
  div.appendChild(headline);
  div.appendChild(description);

  document.body.appendChild(div);
}
