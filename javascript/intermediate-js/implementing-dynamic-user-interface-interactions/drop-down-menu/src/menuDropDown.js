import Svg from "../assets/arrow_drop_down.svg";
import "./styles.css";

export default class MenuDropDown {
  static i = 0;
  constructor() {}

  createDropDown() {
    const navBar = document.createElement("div");
    navBar.classList.add("nav-bar");
    document.body.appendChild(navBar);

    const dropDown = document.createElement("div");
    dropDown.classList.add("drop-down" + MenuDropDown.i);
    dropDown.classList.add("drop-down");

    const menuContent = document.createElement("div");
    menuContent.classList.add("menu-content" + MenuDropDown.i);
    menuContent.classList.add("hide");

    menuContent.appendChild(this.createLinkEle("Settings"));
    menuContent.appendChild(this.createLinkEle("About"));
    menuContent.appendChild(this.createLinkEle("Log out"));

    const dropDownSvg = new Image();
    dropDownSvg.classList.add("drop-down-svg");
    dropDownSvg.src = Svg;

    dropDown.appendChild(dropDownSvg);
    dropDown.appendChild(menuContent);

    // To handle multiple dropdowns on the same page, update i for every
    // instance to keep event listeners unique and making a closure of i w
    // respective dropdowns
    let ref_i = MenuDropDown.i;
    MenuDropDown.i++;
    // desktop browser events
    dropDown.addEventListener("mouseover", menuContentToggle);
    dropDown.addEventListener("mouseout", menuContentToggle);
    // mobile browser event
    dropDownSvg.addEventListener("touchend", menuContentToggle);

    function menuContentToggle() {
      document.querySelector(".menu-content" + ref_i).classList.toggle("hide");
    }

    navBar.appendChild(dropDown);
  }

  createLinkEle(inputText) {
    const div = document.createElement("div");
    const a = document.createElement("a");
    div.classList.add("content-box");
    a.textContent = inputText;
    a.href = "#";
    div.appendChild(a);
    return div;
  }
}
