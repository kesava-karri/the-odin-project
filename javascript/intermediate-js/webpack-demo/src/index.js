import _ from 'lodash';
import './style.css';
import Img from './unsplash.jpg';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myImg = new Image();
  myImg.src = Img;

  element.appendChild(myImg);

  return element;
}

document.body.appendChild(component());
