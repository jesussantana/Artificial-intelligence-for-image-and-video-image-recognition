let video;
let img;
let label;

function preload() {
  img = loadImage("assets/kitten.jpg");
}

function setup() {
  createCanvas(320, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(width, height / 2);
  video.hide();
}

function videoReady() {
  console.log("Video Ready");
  classifier = ml5.imageClassifier("MobileNet", modelReady);
}

function modelReady() {
  console.log("Model Ready");
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  if (results) {
    console.log(results);
    label = results[0].label;
  }
  classifier.classify(video, gotResult);

  //createDiv('Label: ' + results[0].label);
  //createDiv('Confidence: ' + nf(results[0].confidence, 0, 2));
}

function draw() {
  //background(220);
  image(video, 0, 0);
  image(img, 0, height / 2, width, height / 2);
  textSize(22);
  text(label, 40, 40);

  //fill(255,0,0)
  //rect(mouseX, mouseY, 30, 55);
}
