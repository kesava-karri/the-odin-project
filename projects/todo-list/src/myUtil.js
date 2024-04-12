import { BUTTON } from './constants';

export default function createCloseBtn() {
  const closeBtn = document.createElement(BUTTON);
  closeBtn.classList.add('close-btn');
  closeBtn.textContent = "Close";

  return closeBtn;
}
