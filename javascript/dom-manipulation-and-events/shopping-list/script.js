const ul = document.querySelector("ul");
const input = document.getElementById("item");
const button = document.querySelector("button");

button.addEventListener('click', () => {
  const span = document.createElement("span");
  const li = document.createElement("li");
  const btn = document.createElement("button");

  li.textContent = input.value;
  btn.textContent = "Delete";
  span.appendChild(li);
  span.appendChild(btn);
  li.style.cssText = "margin-right: 25px; margin-bottom: 0px";
  span.style.cssText = "display: flex; margin-bottom: 10px";

  ul.appendChild(span);

  input.value = "";
  
  btn.addEventListener('click', () => {
    ul.removeChild(span);
  });
  
  input.focus();
});

