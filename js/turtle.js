export default class Turtle {
  // direction should be an enum with 0 - N, 1 - E, 2 - S, 3 - W
  constructor(x = 0, y = 0, direction = 0) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  isFacingNorth() {
    return this.direction === 0;
  }

  isFacingEast() {
    return this.direction === 1;
  }

  isFacingSouth() {
    return this.direction === 2;
  }

  isFacingWest() {
    return this.direction === 3;
  }

  forward(distance) {
    console.log('going forward fron direction', this.direction)
    if (this.isFacingNorth()) {
      this.y += distance;
    } else if (this.isFacingEast()) {
      this.x += distance;
    } else if (this.isFacingSouth()) {
      this.y -= distance;
    } else if (this.isFacingWest()) {
      this.x -= distance;
    }
    return this;
  }

  backward(distance) {
    this.forward(-distance);
  }

  left() {
    if (this.direction === 0) {
      this.direction = 3;
    } else {
      this.direction--;
    }
    return this;
  }

  right() {
    if (this.direction === 3) {
      this.direction = 0;
    } else {
      this.direction++;
    }
    return this;
  }

  position() {
    return [this.x, this.y]
  }
}
