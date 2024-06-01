export default function createImg(image) {
  const div = document.createElement("div");
  const img = new Image();
  img.src = image;
  div.appendChild(img);
  return div;
}
