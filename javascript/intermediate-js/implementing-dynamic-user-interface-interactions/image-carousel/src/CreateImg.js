export default function createImg(image, name) {
  const div = document.createElement("div");
  const img = new Image();
  img.classList.add(`img-${name}`);
  img.src = image;
  div.appendChild(img);
  return div;
}
