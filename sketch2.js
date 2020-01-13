var trex;
var glitter;
var button;
var song1;
var analyzer;
var trexs = [];
let myFont;

function preload() {
  trex = loadModel("./assets/T-Rex Model.obj", true);
  glitter = loadImage("./assets/giphyrosa.gif");
  song1 = loadSound("./assets/AllIWantFor.mp3");
  myFont = loadFont('./assets/Poppins-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  //song
  analyzer = new p5.Amplitude();
  analyzer.setInput(song1);
  //song volume
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  push();
  button = createButton("BE AFRAID TO CLICK");
  button.size(150, 20);
  button.position(CENTER);
  button.position((windowWidth / 2) - 75, (height / 2) + 300);
  button.mousePressed(clickButton);
  pop();

  for (var i = 0; i < 100; i++) {
    let p = new Trex(createVector(random(-width, width, ), random(-1920, 1920), random(100, -100)), random(50, 30), random(1, 10), random(0.05));
    trexs.push(p);
  }

}

function draw() {
  background(0);

  // //istruzioni create con un div
  // guide = createDiv('click the button to play<br>(click everywhere to play/pause)');
  // guide.style('position: absolute; width: 25vw; height: 10vh; bottom: 0.5%; left: 50%; transform: translate(-50%); color: white; text-align: center; font-family: Poppins; font-size: 0.7vw');

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


  orbitControl(12, 1, 0.1);
  trexs.forEach(x => x.update());
  trexs.forEach(x => x.render());


}

//button for going back to the scary trex
function clickButton() {
  window.open("index.html", "_self");
}

//inserisco il modello e lo faccio scendere a pioggia
class Trex {

  constructor(position, size, speed, rotateSpeed) {
    this.pos = position;
    this.size = size;
    this.speed = speed;
    this.rotateSpeed = rotateSpeed;
  }

  update() {
    this.pos.y += this.speed;
    if (this.pos.y > height * 2 + this.size) {
      this.pos.y = 0 - height * 2 + this.size;
    }
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotate(frameCount * this.rotateSpeed)
    rotateY(frameCount * this.rotateSpeed / 1.5);
    rotateZ(frameCount * this.rotateSpeed / 0.5);
    push();
    noStroke();
    ambientLight(255, 255, 255);
    directionalLight(255, 255, 255, -1, 0, 0);
    texture(glitter);
    rotateZ(180);
    model(trex, (this.size / 2), (this.size / 6), 20, 16);
    pop();
    pop();
  }
}
//Pause and Play on click
function mousePressed() {
  if (!song1.isPlaying()) {
    song1.play();
  } else {
    song1.pause();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
