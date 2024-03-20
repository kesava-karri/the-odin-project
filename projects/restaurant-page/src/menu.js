export default function menu() {
  const div = document.getElementById("content");
  
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  const items = ["Tiramisu Crêpe Cake", "Coffee ☕️", "Maggi 🍜", "Snow Mochi 🍡", 
    "Coconut Ice cream  w Black Rice 🍨", "Taro Boba Milk Tea 🧋", "Rava Idli", 
    "Philly Steak - Pepperoni Pizza 🍕"
  ];

  for (let i = 0; i < items.length; i++) {
    const p = document.createElement("p");
    p.textContent = items[i];
    div.appendChild(p);
    p.classList.add("menu-items");
  }
  document.body.appendChild(div);
}