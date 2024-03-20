export default function about() {
  const div = document.getElementById("content");

  // Remove previous content before appending new content while tab switching
  while(div.firstChild) {
    div.removeChild(div.firstChild);
  }

  const restaurantName = document.createElement("h3");
  restaurantName.textContent = "Restaurant Name: Snow Restaurant 🌨️";
  const location = document.createElement("p");
  location.textContent = "Location: Fantasy World, Snoqualmie Central, Seattle"
  const phone = document.createElement("p");
  phone.textContent = "Contact: (999) 329-9999";

  div.appendChild(restaurantName);
  div.appendChild(location);
  div.appendChild(phone);
  
  document.body.appendChild(div);
};
