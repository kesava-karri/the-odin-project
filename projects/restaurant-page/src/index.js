import initialPageLoader from "./intial";
import menu from "./menu";
import about from "./about";

initialPageLoader();
const homeBtn = document.getElementById("home");
homeBtn.addEventListener('click', () => initialPageLoader());

const menuBtn = document.getElementById("menu");
menuBtn.addEventListener('click', () => menu());

const aboutBtn = document.getElementById("about");
aboutBtn.addEventListener('click', () => about());
