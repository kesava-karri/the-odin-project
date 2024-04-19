import Svg from "../assets/arrow_drop_down.svg";

export default function menuDropDown() {
  const navBar = document.createElement("div");
  navBar.classList.add("nav-bar");
  document.body.appendChild(navBar);

  const dropDown = document.createElement("div");
  dropDown.classList.add("drop-down");

  const menuContent = document.createElement("div");
  menuContent.id = "#menu-content";
  menuContent.classList.add("hide");

  menuContent.appendChild(createLinkEle("Settings"));
  menuContent.appendChild(createLinkEle("About"));
  menuContent.appendChild(createLinkEle("Log out"));

  const dropDownSvg = new Image();
  dropDownSvg.classList.add("drop-down-svg");
  dropDownSvg.src = Svg;

  const toggleMenuItems = function (e) {
    const ele = document.getElementById("#menu-content");
    ele.className = ele.className === "hide" ? "show" : "hide";
  };

  dropDown.addEventListener("mouseover", toggleMenuItems);
  dropDown.addEventListener("mouseout", toggleMenuItems);

  dropDown.appendChild(dropDownSvg);
  dropDown.appendChild(menuContent);

  navBar.appendChild(dropDown);
}

function createLinkEle(inputText) {
  const div = document.createElement("div");
  const a = document.createElement("a");
  div.classList.add("content-box");
  a.textContent = inputText;
  a.href = "#";
  div.appendChild(a);
  return div;
}
