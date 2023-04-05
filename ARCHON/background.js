let canvas;

const order = 7;
let N;
let total;

let path = [];

let counter = 0;

let bubble;
const bubbles = []

function mousePressed() {
  let r = random(10, 100);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 255, 255);
  canvas.parent("background");
  //background(51, 51, 51);
  // updatePath();
  updateHilbertCurve();
}

/* function updatePath() {
  N = int(pow(2, order));
  total = N * N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
} */

function updateHilbertCurve() {
  N = int(pow(2, order));
  total = N * N;
  path = [];

  for (let i = 0; i < total; i++) {
    const point = hilbert(i);
    const len = width / N;
    const x = point.x * len + len / 2;
    const y = point.y * len + len / 2;
    path.push(createVector(x, y));
  }
}

function hasScreenSizeChanged() {
  return (windowWidth !== width || windowHeight !== height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateHilbertCurve();
}

function draw() {
  if (hasScreenSizeChanged()) {
    windowResized();
  }

  background(51);

  stroke(255);
  strokeWeight(1);
  noFill();
  //beginShape();
  for (let i = 1; i < counter; i++) {
    let h = map(i, 0, path.length, 270, 300);
    stroke(h, 255, 65);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
  //endShape();

  counter += 50;
  // if (counter >= path.length) {
  //  counter = counter;
  //}

  // strokeWeight(4);
  // for (let i = 0; i < path.length; i++) {
  //  point(path[i].x, path[i].y);
  //  text(i, path[i].x+5, path[i].y);
  // }
}

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
      }
    }
    return v;
  }

  