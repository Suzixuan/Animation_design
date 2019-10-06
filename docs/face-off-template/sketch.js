/*

  CREATIVE CODING FOR THE INTERNET

  FACE OFF TEMPLATE

  by Prof K

  Last updated: 10/04/19

*/

var mic;

var reVolume = 0;
var eaVolume = 0;

// The closer to 1 the less it eases. The closer to 0 the more it eases.
var easing = .3;

var svgs = [];
function preload() {
  svgs[0] = loadImage("cap.svg");
  svgs[1] = loadImage("star.svg");
  soundFormats('mp3', 'ogg');
  mySound = loadSound('05.WORLDBIGFLAMEUP.mp3');
}

function setup() {
  createCanvas(600, 600);

  // Create a div that tells the user they need to click.
  var myDiv = createDiv('click to start audio capture');
  myDiv.position(0, 0);

  mic = new p5.AudioIn()
  mic.start();

  //test
  mySound.setVolume(10);
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

  print(eaVolume);

  ellipse(width / 2, height / 2, eaVolume, eaVolume);

  background(0);

  //face
  fill(247,211,176);
  bezier(133,300,140,370,310,650,420,300);

  //eye
  fill(0);
  ellipse(215,345,60,60);
  ellipse(345,345,60,60);
  fill(255);
  ellipse(225,350,30,30);
  ellipse(332,350,30,30);

  //star
  image(svgs[1],205,320,10,10);
  image(svgs[1],192,348,8,8);
  image(svgs[1],348,322,10,10);
  image(svgs[1],358,356,7,7);

  // eyebrow
  push();
  strokeWeight(4);
  stroke(0);
  noFill();
  strokeCap(ROUND);
  bezier(165,333,175,310,190,305,223,305);
  bezier(330,304,365,300,380,320,393,335);
  pop();

  //mouth
  strokeWeight(3);
  noFill();
  bezier(240,426,260,440,310,433,332,426);


  //cap
  // print(mouseX,mouseY);
  image(svgs[0],100,100,350,200);

  push();
  stroke(255);
  strokeWeight(3);
  line(130,182,438,274);
  line(209,118,427,191);
  line(343,118,109,214);
  line(397,160,103,265);
  line(101,242,326,296);
  line(168,295,445,223);
  pop();


}
