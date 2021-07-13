var oldmouseX = 0;
var oldmouseY = 0;
var stroke_ = 4;
function setup() {
    createCanvas(displayWidth, displayHeight);
  }
  
  function draw() {
    background("#ffffff00");
    if ((keyIsPressed == true) && (key == '+')) {
        if(stroke_<30){
        stroke_ +=0.2;
        }
    }else if((keyIsPressed == true) && (key == '-')){
        if(stroke_>2){
        stroke_ -=0.2;
        }
    }
    strokeWeight(stroke_);
    if(mouseIsPressed){
        line(mouseX,mouseY,oldmouseX,oldmouseY);
    }
        oldmouseX = mouseX;
        oldmouseY = mouseY;
  }