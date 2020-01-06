var trex;
var glitter;
var button;
var song;


function preload() {
  trex = loadModel("./assets/T-Rex Model.obj", true);
  glitter = loadImage("./assets/giphyrosa.gif");
  song = loadSound("./assets/ProfondoRosso.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  //song
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  //song volume
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  button = createButton("RIDDICULUS");
  button.size(100, 20);
  button.position((width / 2) - 50, (height / 2) + 300);
  button.mousePressed(clickButton);

  //song
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);


}

function draw() {
  background(0);

  //istruzioni create con un div
  guide = createDiv('click the button to play<br>(click everywhere to play/pause)');
  guide.style('position: absolute; width: 25vw; height: 10vh; bottom: 0.5%; left: 50%; transform: translate(-50%); color: white; text-align: center; font-family: Poppins; font-size: 0.7vw');


  orbitControl(12, 1, 0.1);
  rotateZ(180);

  rotateY(frameCount + volume / 2000);
  noStroke();

  ambientLight(40, 0, 0);
  var mouse1 = mouseX - height / 2;
  var mouse2 = mouseY - width / 2;

  directionalLight(155, 20, 0, 1, 0, 0);
  pointLight(0, 0, 155, mouse1, mouse2, 0);

  ambientMaterial(255);
  model(trex);
}

function clickButton() {
  window.open("index2.html", "_self");}

//Pause and Play on click
function mousePressed() {
  if(!song.isPlaying()){  song.play();  } else{  song.pause();  }}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
