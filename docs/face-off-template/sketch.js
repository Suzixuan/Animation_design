/*

  CREATIVE CODING FOR THE INTERNET

  FACE OFF TEMPLATE

  by Prof K

  Last updated: 10/04/19

*/

var mic;

var reVolume = 0;
var eaVolume = 0;
var mouthReVolume = 0;
var mouthEaVolume = 0;
var browReVolume = 0;
var browEaVolume = 0;


// The closer to 1 the less it eases. The closer to 0 the more it eases.
var easing = .3;

var svgs = [];

function preload() {
  svgs[0] = loadImage("cap.svg");
  svgs[1] = loadImage("star.svg");
  soundFormats('mp3', 'ogg');
  mySound = loadSound('片霧烈火,大岛启之 - why,or why not.mp3');
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  // Create a div that tells the user they need to click.
  var myDiv = createDiv('click to start audio capture');
  myDiv.position(0, 0);

  mic = new p5.AudioIn()
  mic.start();

  // //test
  mySound.setVolume(1);
  mySound.play();

  // Start the audio context on a click/touch event. Required for Chrome.
  userStartAudio().then(function() {
    myDiv.remove();
  });
}

function draw() {

  micLevel = mic.getLevel();
  testFace(micLevel);
}

function testFace(micLevel) {

  // map() remaps one number set to another. Our v variable
  // only goes from 0 to 1, but we can map it to any number.
  reVolume = map(micLevel, 0, 1, 0, 600);

  eaVolume += (reVolume - eaVolume) * easing;

  print(micLevel);

  ellipse(width / 2, height / 2, eaVolume, eaVolume);

  background(40, 44, 52);

  //face
  fill(247, 211, 176);
  strokeWeight(0);
  bezier(133, 300, 140, 370, 310, 650, 420, 300);

  //ear note: 角度不同方向不同
  arc(160, 335, 80, 80, 85, 275);
  arc(390, 340, 80, 80, 290, 110);

  fill(112,80,52);
  arc(150, 340, 40,40, 70, 255);
  arc(400, 345, 40, 40, 290, 110);

  //cap
  // print(mouseX, mouseY);
  image(svgs[0], 100, 100, 350, 200);

  push();
  stroke(255);
  strokeWeight(3);
  line(130, 182, 438, 274);
  line(209, 118, 427, 191);
  line(343, 118, 109, 214);
  line(397, 160, 103, 265);
  line(101, 242, 326, 296);
  line(168, 295, 445, 223);
  pop();


  //eye
  if (eaVolume >= 0 && eaVolume <= 170) {
    fill(0);
    ellipse(215, 345, 60, 60);
    ellipse(345, 345, 60, 60);
    fill(255);
    ellipse(225, 350, 30, 30);
    ellipse(332, 350, 30, 30);

    //star
    image(svgs[1], 205, 320, 10, 10);
    image(svgs[1], 192, 348, 8, 8);
    image(svgs[1], 348, 322, 10, 10);
    image(svgs[1], 358, 356, 7, 7);
  } else {
    strokeWeight(5);
    line(201, 320, 244, 341);
    line(244, 341, 201, 360);
    line(350, 318, 321, 341);
    line(321, 341, 357, 360);
  }

  // eyebrow vol >=60 && vol <=170
  push();
  strokeWeight(4);
  stroke(0);
  noFill();
  strokeCap(ROUND);
  browReVolume = map(eaVolume, 100, 170, 0, -20);
  browEaVolume += (browReVolume - browEaVolume) * easing;
  if (eaVolume >= 60 && eaVolume <= 170) {
    translate(0, browEaVolume);
  } else if (eaVolume > 170) {
    translate(0, browEaVolume + random([0, -5]));
  }
  if (eaVolume < 50) {
    bezier(165, 333, 175, 350, 190, 305, 223, 305);
  } else {
    bezier(165, 333, 175, 310, 190, 305, 223, 305);
  }
  bezier(330, 304, 365, 300, 380, 320, 393, 335);
  pop();


  //mouth  default vol >=50 && vol <60
  strokeWeight(3);
  noFill();
  if (eaVolume >= 50 && eaVolume < 60) {
    bezier(240, 426, 260, 440, 310, 433, 332, 426);
  }
  if (eaVolume < 50) {
    bezier(240, 426, 260, 400, 310, 410, 332, 426);
  }

  //mouth speaking vol >=60 && vol <=170
  fill(0);
  if (eaVolume >= 60 && eaVolume <= 170) {
    mouthReVolume = map(eaVolume, 100, 170, -40, 40);
    mouthEaVolume += (mouthReVolume - mouthEaVolume) * easing;
    bezier(246, 410, 262, 467 + mouthEaVolume, 310, 467 + mouthEaVolume, 320, 410);
  }

  if (eaVolume > 170) {
    // scale(map(mouthEaVolume,0,30,0.5,1.6));
    ellipse(285, 426, (55 + map(eaVolume, 170, 300, 0, 5)), 65 + map(eaVolume, 170, 300, -5, 3));
  }

}
