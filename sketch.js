var trex;
var glitter;
var button;
var song;
let myFont;


function preload() {
  trex = loadModel("./assets/T-Rex Model.obj", true);
  glitter = loadImage("./assets/giphyrosa.gif");
  song = loadSound("./assets/ProfondoRosso.mp3");
  myFont = loadFont('./assets/Poppins-Regular.ttf');
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

  push();
  button = createButton("RIDDICULUS");
  button.size(100, 20);
  button.position(CENTER);
  button.position((windowWidth / 2) - 50, (height / 2) + 300);
  button.mousePressed(clickButton);
  pop();

}

function draw() {
  background(0);

  push();
  var myText = "click the button to play";
  noStroke();
  fill('White');
  textAlign(CENTER);
  textFont(myFont);
  textSize(12);
  text(myText, 0, 340);
  pop();

  push();
  var myText = "(click everywhere to play/pause)";
  noStroke();
  fill('White');
  textAlign(CENTER);
  textFont(myFont);
  textSize(12);
  text(myText, 0, 360);
  pop();


  // orbitControl(12, 1, 0.1);
  rotateZ(180);

  rotateY(frameCount + volume / 2000);
  noStroke();

  ambientLight(40, 0, 0);
  var mouse1 = mouseX - height / 2;
  var mouse2 = mouseY - width / 2;

  directionalLight(155, 20, 0, 1, 0, 0);
  pointLight(0, 0, 155, mouse1, mouse2, 0);

  ambientMaterial(255);
  scale(2.5);
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
