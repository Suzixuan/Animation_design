/*

  CREATIVE CODING FOR THE INTERNET

  FACE OFF TEMPLATE

  by Prof K

  Last updated: 10/04/19

*/

window.onload = function() {
  var context = new AudioContext();
  // Setup all nodes
  // ...
}

// One-liner to resume playback when user interacted with the page.
document.querySelector('button').addEventListener('click', function() {
  context.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});

var mic;

var reVolume = 0;
var eaVolume = 0;

// The closer to 1 the less it eases. The closer to 0 the more it eases.
var easing = .3;

function setup() {
  createCanvas(600, 600);

  // Create a div that tells the user they need to click.
  var myDiv = createDiv('click to start audio capture');
  myDiv.position(0, 0);

  mic = new p5.AudioIn();
  mic.start();

  var mySynth = new p5.MonoSynth();

  // This won't play until the context has started
  mySynth.play('A6');


  // Start the audio context on a click/touch event. Required for Chrome.
  userStartAudio().then(function() {
    myDiv.remove();
  });
}

function draw() {
  background(45);
  fill(200);
  micLevel = mic.getLevel();
  testFace(micLevel);
}

function testFace(micLevel) {

  // map() remaps one number set to another. Our v variable
  // only goes from 0 to 1, but we can map it to any number.
  reVolume = map(micLevel, 0, 1, 100, 600);

  eaVolume += (reVolume - eaVolume) * easing;

  ellipse(width / 2, height / 2, eaVolume, eaVolume);
}
