var resolution = 256;
var size = 512;
var maxVal = size - 1;
var song;
var fft;
var button;
var w;
var smoothnessSlider;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('res/mario.mp3');
  // song = loadSound('res/pokemon.mp3');
  // song = loadSound ('res/sonic.mp3');
  // song = loadSound ('res/smooth_criminal.mp3');
}

function setup() {
  colorMode(HSB);
  createCanvas(size, size);
  angleMode(DEGREES);

  fft = new p5.FFT(0, resolution);
  w = width / resolution;

  button = createButton('toggle music');
  button.mousePressed(toggleSong);
  smoothnessSlider = createSlider(0, 100, 0);
  smoothnessSlider.position(10, 10);
  smoothnessSlider.style('width', '80px');
}

function draw() {
  background(0);
  fft.smooth(map(smoothnessSlider.value(), 0, 100, 0, 0.999));
  var spectrum = fft.analyze();  
  for (var i = 0; i < spectrum.length; i++) {
    var amp = map(spectrum[i], 0, 255, 0, maxVal);
    var y = map(amp, 0, maxVal, height, 0);
    fill(map(i, 0, maxVal, 0, 360), maxVal, amp);
    noStroke();
    rect(i * w, y, w, height - y);
  }
  noFill();
}