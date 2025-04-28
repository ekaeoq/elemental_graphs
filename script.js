let dragCount = 0;
let wheelCount = 0; 

let showOnlyXY = false;

function toggleXYPlane() {
  showOnlyXY = !showOnlyXY;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont('Arial');
  camera(0, -100, 100, 0, 0, 0, 0, 1, 0);
  perspective(PI/3, width/height, 10, 10000);
}

function mouseDragged() {
  dragCount++;
  return true;
}

function mouseWheel() {
  wheelCount++;
  return true;
}

function draw() {
  background(255);
  orbitControl(1, 1, 0.005);

  push();
  ortho();
  resetMatrix();
  fill(0);
  textSize(16);
  text("Drag count: " + dragCount, 10, 20);
  text("Wheel count: " + wheelCount, 10, 40); // Fixed y-position to avoid overlap
  pop();

  stroke(200);
  strokeWeight(1);
  stroke(200);
  strokeWeight(1);
  for (let i = -60; i <= 60; i += 20) {
    line(-60, i, 0, 60, i, 0);
    line(i, -60, 0, i, 60, 0);
  }
  for (let i = -60; i <= 60; i += 20) {
    line(-60, 0, i, 60, 0, i);
    line(i, 0, -60, i, 0, 60);
  }
  for (let i = -60; i <= 60; i += 20) {
    line(0, -60, i, 0, 60, i);
    line(0, i, -60, 0, i, 60);
  }
  strokeWeight(2);
  //stroke(255, 0, 0);
  stroke(135,206,235);
  line(-50, 0, 0, 50, 0, 0);
  //stroke(0, 255, 0);
  stroke(65,105,225);
  line(0, -50, 0, 0, 50, 0);
  //stroke(0, 0, 255);
  stroke(100,149,237);
  line(0, 0, -50, 0, 0, 50);

  let graphs = [
    { power: 2, color: [0, 0, 255], zOffset: -60 },
    { power: 4, color: [0, 0, 0], zOffset: -40 },
    { power: 6, color: [255, 0, 0], zOffset: -20 },
    { power: 1, color: [0, 0, 255], zOffset: 20 },
    { power: 3, color: [0, 0, 0], zOffset: 40 },
    { power: 5, color: [255, 0, 0], zOffset: 60 }
  ];

  let desiredMax = 50;

  for (let graph of graphs) {
    let scale = desiredMax / Math.pow(2, graph.power);
    push();
    translate(0, 0, graph.zOffset);
    stroke(graph.color[0], graph.color[1], graph.color[2]);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let x = 0.5; x <= 10; x += 0.1) {
      let y = 1 / Math.pow(x, graph.power);
      vertex(x * 5, y * scale, 0);
    }
    endShape();
    pop();
  }
}

function draw() {
  background(255);
  orbitControl(1, 1, 0.005);

  push();
  ortho();
  resetMatrix();
  fill(0);
  textSize(16);
  text("Drag count: " + dragCount, 10, 20);
  text("Wheel count: " + wheelCount, 10, 40);
  pop();

  stroke(200);
  strokeWeight(1);
  // Draw x-y plane grid (always visible)
  for (let i = -60; i <= 60; i += 20) {
    line(-60, i, 0, 60, i, 0);
    line(i, -60, 0, i, 60, 0);
  }

  // Draw full 3D scene only if showOnlyXY is false
  if (!showOnlyXY) {
    // Draw x-z plane grid
    for (let i = -60; i <= 60; i += 20) {
      line(-60, 0, i, 60, 0, i);
      line(i, 0, -60, i, 0, 60);
    }
    // Draw y-z plane grid
    for (let i = -60; i <= 60; i += 20) {
      line(0, -60, i, 0, 60, i);
      line(0, i, -60, 0, i, 60);
    }
    // Draw axes
    strokeWeight(2);
    stroke(135, 206, 235);
    line(-50, 0, 0, 50, 0, 0);
    stroke(65, 105, 225);
    line(0, -50, 0, 0, 50, 0);
    stroke(100, 149, 237);
    line(0, 0, -50, 0, 0, 50);
    // Draw graphs
    let graphs = [
      { power: 2, color: [0, 0, 255], zOffset: -60 },
      { power: 4, color: [0, 0, 0], zOffset: -40 },
      { power: 6, color: [255, 0, 0], zOffset: -20 },
      { power: 1, color: [0, 0, 255], zOffset: 20 },
      { power: 3, color: [0, 0, 0], zOffset: 40 },
      { power: 5, color: [255, 0, 0], zOffset: 60 }
    ];
    let desiredMax = 50;
    for (let graph of graphs) {
      let scale = desiredMax / Math.pow(2, graph.power);
      push();
      translate(0, 0, graph.zOffset);
      stroke(graph.color[0], graph.color[1], graph.color[2]);
      strokeWeight(2);
      noFill();
      beginShape();
      for (let x = 0.5; x <= 10; x += 0.1) {
        let y = 1 / Math.pow(x, graph.power);
        vertex(x * 5, y * scale, 0);
      }
      endShape();
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
