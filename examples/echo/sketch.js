var serial; // variable to hold an instance of the serialport library
var portName = '/COM3'; // fill in your serial port name here
var inData; // for incoming serial data
var img;

let waveswitch = 0;
let newdirection = 0;
let currentdirection = 0;

let angle = 0.0;
let jitter = 0.0;
let timer = 5

let start = 0;
let gamelost = 0;


function setup(){
  createCanvas(1920, 1080);

  img = loadImage("https://i.imgur.com/CXxHmNj.png");
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  // serial.on('error', serialError); // callback for errors

  serial.open(portName); // open a serial port
  serial.clear();
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  println("inByte: " + inByte);
  inData = inByte;
}




//Checks if a key is pressed, if a key is pressed it allows the site to start with the countdown
function keyPressed() {
start = 1;
}

function draw(){
  var tilt = (inData);
  background('#0D343A'); 
  strokeWeight(4);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(100);
  
  translate(960, 720); 
  push();
	rotate(radians(angle));
  image(img, -162.5, -722, 325, 722);
  pop();

  //Start screen with 'Ready?' check if timer has started and if the button has been pressed
  if (timer > 0 && start == 0) {
    background('rgba(255,255,255, 0.25)');
    text("Ready?", 0, -375);
  }

  //Timer start whenever a button is pressed
  if (start == 1 && gamelost == 0) {
    if (timer > 0) {
      background('rgba(255,255,255, 0.25)');
      text(timer, 0, -375);
    }
  
    //Timer for 5 seconds
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer --;
    }



    
    //-------------------------------------  GAME START  ---------------------------------------------
    //If timer reaches 0, it starts the game
    if (timer == 0) {
      //boatmechanic();
      //Checks the tilt of the ship
      if (tilt < 8) {
        angle = angle + 0.1;
        if (tilt < 6) {
          angle = angle + 0.1;
          if (tilt < 4) {
            angle = angle + 0.1;
          }
        }
      }

      if (tilt > 12) {
        angle = angle - 0.1;
        if (tilt > 14) {
          angle = angle - 0.1;
          if (tilt > 16) {
            angle = angle - 0.1;
          }
        }
      }

      if (angle < -45 || angle > 45) {
        gamelost = 1;
      }

      //GAME MECHANICS BELOW

    }
  }

  if (gamelost == 1){
    background('rgba(255,255,255, 0.25)');
    text("Bitch, u dead.", 0, -375);

    let i = 0.1;
    i = i + i;

    if (angle < -45 && angle > -90) {
      angle = angle - (0.3 + i);
    }

    if (angle > 45 && angle < 90) {
      angle = angle + (0.3 + i);
    }
  }
}


function boatmechanic(){
  
}
