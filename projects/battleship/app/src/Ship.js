export default class Ship {
  #beenHit = 0;
  constructor(length) {
    this.length = length;
  }

  getNumberOfHits() {
    return this.#beenHit;
  }

  hit() {
    this.#beenHit += 1;
  }

  isSunk() {
    return this.length === this.#beenHit;
  }
}
