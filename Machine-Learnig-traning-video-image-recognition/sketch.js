// Machine-Learnig-traning-Video-Image-Recognition

let video;
let extratorCaracteristiques;
let inputEtiqueta;
let controlDades = {};
let titular = "Titular";
let options = {
  numLabels: 3,
};

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.hide();
}

function videoReady() {
  console.log("video Ready!");
  extratorCaracteristiques = ml5.featureExtractor(
    "MobileNet",
    options,
    modelLoaded
  );
}

function modelLoaded() {
  console.log("Model Loaded!!");
  classificador = extratorCaracteristiques.classification(
    video,
    classificadorReady
  );
}

function classificadorReady() {
  console.log("classificador Ready!!");
  creacioInterficie(30, height - 30);
}

function creacioInterficie(x, y) {
  /* button = createButton('add Imatge');
  button.position(10, 10);
  button.mousePressed(addImatge);*/
  addEtiquetaImatge = createButton("add Imatge")
    .position(x, y)
    .mousePressed(addImatge);

  /*inputEtiqueta = createInput('');
  inputEtiqueta.position(20, 60);
  inputEtiqueta.size(100);*/
  inputEtiqueta = createInput("")
    .position(x + addEtiquetaImatge.size()["width"], y)
    .size(100);

  btnEntrenar = createButton("Entrenar")
    .position(
      x + addEtiquetaImatge.size()["width"] + inputEtiqueta.size()["width"],
      y
    )
    .mousePressed(entrenar);
}

function entrenar() {
  console.log("entrenar");

  classificador.train(entrenant);
}

function entrenant(loss) {
  console.log(loss);
  if (loss == null) {
    console.log("entrenament completat");
    classificador.classify(gotResults);
  }
}

function gotResults(error, resultats) {
  if (error) {
    console.log(error);
  }
  if (resultats) {
    console.log(resultats);
    titular = resultats[0].label + " " + resultats[0].confidence.toFixed(2);
  }
  classificador.classify(gotResults);
}

function addImatge() {
  etiqueta = inputEtiqueta.value();
  console.log("addImatge " + etiqueta);
  classificador.addImage(video, etiqueta);
  if (controlDades[etiqueta] == undefined) {
    console.log("NO ESTA LA ETIQUETA");
    controlDades[etiqueta] = 1;
  } else {
    controlDades[etiqueta] = controlDades[etiqueta] + 1;
  }
  console.log(controlDades);
}

function draw() {
  background(220);

  image(video, 0, 0);
  stroke(255, 204, 0);
  strokeWeight(4);
  textSize(20);
  text(titular, 30, 30);
}
