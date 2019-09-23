var resolution = 128;
var size = 512;
var maxVal = size - 1;
var w = size / resolution;
var ys = new Array(resolution).fill(maxVal);
var ysFFT = new Array(resolution).fill(new ComplexNumber({ re: 0 }));
var pulses = new Array(resolution);
var clicking = false;
var shiftting = false;
var playSound = false;
var initialFreq = 220;
var pulse;

function loadSin() {
  for (var i = 0; i < resolution; i++) {
    ys[i] = map(Math.sin(map(i, 0, resolution, 0, 2 * Math.PI)), -1, 1, 0, maxVal);
    ysFFT[i] = new ComplexNumber({ re: ys[i] });
  }
}

function loadCos() {
  for (var i = 0; i < resolution; i++) {
    ys[i] = map(Math.cos(map(i, 0, resolution, 0, 2 * Math.PI)), -1, 1, 0, maxVal);
    ysFFT[i] = new ComplexNumber({ re: ys[i] });
  }
}

function loadSqrt() {
  for (var i = 0; i < resolution; i++) {
    ys[i] = map(Math.sqrt(i), 0, Math.sqrt(resolution), 0, maxVal);
    ysFFT[i] = new ComplexNumber({ re: ys[i] });
  }
}

function loadSquare() {
  for (var i = 0; i < resolution; i++) {
    ys[i] = map(Math.round(i / resolution), 0, 1, 0, maxVal);
    ysFFT[i] = new ComplexNumber({ re: ys[i] });
  }
}

function loadTriangle() {
  for (var i = 0; i < resolution; i++) {
    ys[i] = map(Math.asin(Math.cos(map(i, 0, resolution, 0, 2 * Math.PI))), -1.5, 1.5, 0, maxVal);
    ysFFT[i] = new ComplexNumber({ re: ys[i] });
  }
}

function indexToFreq(i) {
  return i * (initialFreq / resolution / 2.);
}

function setup() {
  colorMode(HSB);
  createCanvas(size * 2, size);
  createButton('clear')
    .mousePressed(() => {
      ys.fill(maxVal);
      ysFFT.fill(new ComplexNumber({ re: 0 }));
    })
    .position(size + 10, size + 10)
    .size(50, 20);

  createButton('sin')
    .mousePressed(loadSin)
    .position(size + 60, size + 10)
    .size(50, 20);

  createButton('cos')
    .mousePressed(loadCos)
    .position(size + 110, size + 10)
    .size(50, 20);

  createButton('sqrt')
    .mousePressed(loadSqrt)
    .position(size + 160, size + 10)
    .size(50, 20);

  createButton('square')
    .mousePressed(loadSquare)
    .position(size + 210, size + 10)
    .size(50, 20);

  createButton('triangle')
    .mousePressed(loadTriangle)
    .position(size + 260, size + 10)
    .size(50, 20);

  createCheckbox('shift', false)
    .changed(function () {
      shiftting = this.checked();
    })
    .position(size + 310, size + 10)
    .size(50, 20);

  createCheckbox('sound', false)
    .changed(function () {
      playSound = this.checked();
    })
    .position(size + 360, size + 10)
    .size(60, 20);


  for (var i = 0; i < resolution; i++) {
    var freq = indexToFreq(i);
    pulses[i] = new p5.Pulse(freq);
    pulses[i].amp(0);
    pulses[i].start();
  }
}

function mousePressed() {
  clicking = true;
}

function mouseReleased() {
  clicking = false;
}

function draw() {
  background(0);
  if ((keyCode === RIGHT_ARROW && keyIsPressed) || shiftting) {
    ys.push(ys.shift());
    ysFFT.push(ysFFT.shift());
  }

  if (playSound) {
    for (var i = 0; i < resolution; i++) {
      pulses[i].start();
    }
  } else {
    for (var i = 0; i < resolution; i++) {
      pulses[i].stop(0);
    }
  }

  if (clicking && mouseX < size) {
    ys[Math.floor(mouseX / w)] = mouseY;
    ysFFT[Math.floor(mouseX / w)] = new ComplexNumber({ re: mouseY });
  }
  ellipse(mouseX, mouseY, 5, 5);

  for (var i = 0; i < resolution; i++) {
    var y = ys[i];
    fill(map(i, 0, maxVal, 0, 360), maxVal, maxVal);
    noStroke();
    rect(i * w, y, w, height - y);
  }

  var ys_ = fastFourierTransform(ysFFT);

  for (var i = 0; i < resolution; i++) {
    var y = map(ys_[i].getRadius(), 0, maxVal, maxVal, 0);
    fill(map(i, 0, resolution, 0, 360), maxVal, maxVal);
    noStroke();
    rect(i * w + size, y, w, height - y);
    
    var amp = map(y, maxVal, 0, 0, 1);
    pulses[i].amp(amp);
  }
}