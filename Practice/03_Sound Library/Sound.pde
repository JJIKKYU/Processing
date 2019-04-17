import processing.sound.*;

SoundFile sound1;
SoundFile sound2;
int soundState = 0;

void setup() {
  size(600,500);
  background(255);
  noStroke();
  fill(0);
  colorMode(HSB);
  
  sound1 = new SoundFile(this, "1.aif");
  sound2 = new SoundFile(this, "2.aif");
}

void draw() {
  rect(width/5, height/3, width/5, height/3);
  rect(width/5*3, height/3, width/5, height/3);
  if (soundState == 1) {
    sound2.stop();
    if (sound1.isPlaying() == false) {
      sound1.play();
    }
  }else if (soundState == 2) {
    sound1.stop();
    if (sound2.isPlaying() == false) {
      sound2.play();
    }
  }else {
    sound1.stop();
    sound2.stop();
  }
}

void mousePressed() {
  if (mouseX > width/5 && mouseX < width/5 *2
  && mouseY > height/3 && mouseY < height/3*2){
    soundState = 1;
    }else if (mouseX > width/5*3 && mouseX < width/5 *4
  && mouseY > height/3 && mouseY < height/3*2){
    soundState = 2;
  }else {
    soundState = 3;
  }
}
