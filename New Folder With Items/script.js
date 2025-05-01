const graphSets = [
  {
    graphs: [
      { func: x => x, color: [0, 0, 255], zOffset: 0, scale: 5, segments: ['negative', 'positive'] },
      { func: x => Math.pow(x, 3), color: [0, 0, 0], zOffset: 10, scale: 0.05, segments: ['negative', 'positive'] },
      { func: x => Math.pow(x, 5), color: [255, 0, 0], zOffset: 20, scale: 0.0005, segments: ['negative', 'positive'] }
    ]
  },
  {
    graphs: [
      { func: x => (x !== 0 ? 1 / Math.pow(x, 2) : 0), color: [0, 0, 255], zOffset: 0, scale: 12.5, segments: ['negative', 'positive'] },
      { func: x => (x !== 0 ? 1 / Math.pow(x, 4) : 0), color: [0, 0, 0], zOffset: 10, scale: 3.125, segments: ['negative', 'positive'] },
      { func: x => (x !== 0 ? 1 / Math.pow(x, 6) : 0), color: [255, 0, 0], zOffset: 20, scale: 0.781, segments: ['negative', 'positive'] }
    ]
  },
  {
    graphs: [
      { func: x => (x !== 0 ? 1 / x : 0), color: [0, 0, 255], zOffset: 0, scale: 25, segments: ['negative', 'positive'] },
      { func: x => (x !== 0 ? 1 / Math.pow(x, 3) : 0), color: [0, 0, 0], zOffset: 10, scale: 6.25, segments: ['negative', 'positive'] },
      { func: x => (x !== 0 ? 1 / Math.pow(x, 5) : 0), color: [255, 0, 0], zOffset: 20, scale: 1.5625, segments: ['negative', 'positive'] }
    ]
  },
  {
    graphs: [
      { func: x => Math.sign(x) * Math.pow(Math.abs(x), 1/3), color: [0, 0, 255], zOffset: 0, scale: 20, segments: ['negative', 'positive'] },
      { func: x => Math.sign(x) * Math.pow(Math.abs(x), 1/5), color: [0, 0, 0], zOffset: 10, scale: 20, segments: ['negative', 'positive'] },
      { func: x => Math.sign(x) * Math.pow(Math.abs(x), 1/7), color: [255, 0, 0], zOffset: 20, scale: 20, segments: ['negative', 'positive'] }
    ]
  },
  {
    graphs: [
      { func: x => Math.pow(2, x), color: [0, 0, 255], zOffset: 0, scale: 0.05, segments: ['negative', 'positive'] },
      { func: x => Math.exp(x), color: [0, 0, 0], zOffset: 10, scale: 0.002, segments: ['negative', 'positive'] },
      { func: x => Math.pow(10, x), color: [255, 0, 0], zOffset: 20, scale: 0.000005, segments: ['negative', 'positive'] },
      { func: x => Math.pow(0.5, x), color: [0, 255, 0], zOffset: 30, scale: 0.05, segments: ['negative', 'positive'] }
    ]
  },
  {
    graphs: [
      { func: x => (x > 0 ? Math.log2(x) : NaN), color: [0, 0, 255], zOffset: 0, scale: 10, segments: ['positive'] },
      { func: x => (x > 0 ? Math.log(x) : NaN), color: [0, 0, 0], zOffset: 10, scale: 10, segments: ['positive'] },
      { func: x => (x > 0 ? Math.log10(x) : NaN), color: [255, 0, 0], zOffset: 20, scale: 10, segments: ['positive'] },
      { func: x => (x > 0 ? Math.log(x) / Math.log(0.5) : NaN), color: [0, 255, 0], zOffset: 30, scale: 10, segments: ['positive'] }
    ]
  }
];

function createSketch(assignedSets) {
  return function(p) {
    p.showOnlyXY = false;
    p.showSets = Array(assignedSets.length).fill(false);
    p.dragCount = 0;
    p.wheelCount = 0;

    p.toggleXYPlane = function() {
      p.showOnlyXY = !p.showOnlyXY;
    };

    p.toggleSet = function(index) {
      p.showSets[index] = !p.showSets[index];
    };

    p.setup = function() {
      let canvas = p.createCanvas(800, 600, p.WEBGL);
      p.textFont('Arial');
      p.camera(0, -15, 150, 0, 0, 0, 0, 1, 0);
      p.perspective(p.PI / 3, p.width / p.height, 10, 10000);
    };

    p.mouseDragged = function() {
      p.dragCount++;
      return true;
    };

    p.mouseWheel = function() {
      p.wheelCount++;
      return true;
    };

    p.draw = function() {
      p.background(255);

      if (p.showOnlyXY) {
        p.camera(0, 0, 100, 0, 0, 0, 0, 1, 0);
        let aspect = p.width / p.height;
        if (aspect > 1) {
          let halfWidth = 60 * aspect;
          p.ortho(-halfWidth, halfWidth, -60, 60, 0, 1000);
        } else {
          let halfHeight = 60 / aspect;
          p.ortho(-60, 60, -halfHeight, halfHeight, 0, 10000);
        }
        p.push();
        p.rotateX(p.PI);
        p.stroke(200);
        p.strokeWeight(1);
        for (let i = -60; i <= 60; i += 20) {
          p.line(-60, i, 0, 60, i, 0);
          p.line(i, -60, 0, i, 60, 0);
        }
        p.drawGraphs();
        p.pop();
      } else {
        p.perspective(p.PI / 3, p.width / p.height, 10, 10000);
        p.orbitControl(1, 1, 0.005);
        p.push();
        p.rotateX(p.PI);
        p.stroke(200);
        p.strokeWeight(1);
        for (let i = -60; i <= 60; i += 20) {
          p.line(-60, i, 0, 60, i, 0);
          p.line(i, -60, 0, i, 60, 0);
          p.line(-60, 0, i, 60, 0, i);
          p.line(i, 0, -60, i, 0, 60);
        }
        p.strokeWeight(2);
        p.stroke(135, 206, 235);
        p.line(-50, 0, 0, 50, 0, 0);
        p.stroke(65, 105, 225);
        p.line(0, -50, 0, 0, 50, 0);
        p.stroke(100, 149, 237);
        p.line(0, 0, -50, 0, 0, 50);
        p.drawGraphs();
        p.pop();
      }

      p.push();
      p.ortho();
      p.resetMatrix();
      p.fill(0);
      p.textSize(16);
      p.text("Drag count: " + p.dragCount, 10, 20);
      p.text("Wheel count: " + p.wheelCount, 10, 40);
      p.pop();
    };

    p.drawGraphs = function() {
      for (let i = 0; i < assignedSets.length; i++) {
        if (p.showSets[i]) {
          let set = assignedSets[i];
          for (let graph of set.graphs) {
            p.push();
            p.translate(0, 0, graph.zOffset);
            p.stroke(graph.color[0], graph.color[1], graph.color[2]);
            p.strokeWeight(3);
            p.noFill();
            if (graph.segments.includes('negative')) {
              p.beginShape();
              for (let x = -10; x <= -0.001; x += 0.1) {
                let y = graph.func(x);
                if (!isNaN(y)) p.vertex(x * 5, y * graph.scale, 0);
              }
              p.endShape();
            }
            if (graph.segments.includes('positive')) {
              p.beginShape();
              for (let x = 0.001; x <= 10; x += 0.1) {
                let y = graph.func(x);
                if (!isNaN(y)) p.vertex(x * 5, y * graph.scale, 0);
              }
              p.endShape();
            }
            p.pop();
          }
        }
      }
    };
  };
}

let p1 = new p5(createSketch(graphSets.slice(0, 3)), 'sketch-container1');
let p2 = new p5(createSketch(graphSets.slice(3, 6)), 'sketch-container2');
let p3 = new p5(createSketch(graphSets.slice(0, 3)), 'sketch-container3');
let p4 = new p5(createSketch(graphSets.slice(3, 6)), 'sketch-container4');

// Burger menu functionality
document.querySelectorAll('.burger-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const menu = icon.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});