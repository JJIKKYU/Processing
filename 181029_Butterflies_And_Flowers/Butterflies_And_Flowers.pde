import ddf.minim.*;
Minim minim; 
AudioSample bgm;

int x1, x2, y1, y2;
int count = 0;
int countRB = 0;
int a; // mouseX map
int b; // mouseY map
float xNoise = 0;
float yNoise = 0;
float keySize = 200;
float keySizeSave =  keySize;
PFont din;
PImage bg_1;
PImage bg_2;
PImage bg_3;
PImage bg_4;
int i = 0;
int bool = 0;
int ii = 0;
int bool_2 = 0;
float yoff = 0;
int moon_i = -50;
int moon_i_bool = 0;


void setup() {
  noCursor();
  size(1000, 1000);
  background(255);
  bg_1 = loadImage("bg_1.jpg");
  bg_1.resize(1000, 1000);
  bg_2 = loadImage("bg_2.jpg");
  bg_2.resize(1000, 1000);
  bg_3 = loadImage("bg_3.png");
  bg_3.resize(1000, 1000);
  bg_4 = loadImage("bg_4.png");
  bg_4.resize(1000, 1000);


  minim = new Minim(this); 
  bgm = minim.loadSample("bgm.mp3", 512); 
  bgm.trigger();
}

void draw() {
  frameRate(60);
  if (bool == 0) {
    background(255);
    image(bg_1, 0, 0);
  } else if (bool == 1) {
    background(255);
    count = 0;
  }
  if (mouseButton == LEFT) {
    bool++;
  }
  if (mouseY >= y2 && bool >= 2 && count % 2 == 0) {
    image(bg_4, 0, 0);
  }
  if (count % 2 == 1 || (count == 0 && bool >= 1)) {
    image(bg_2, 0, 0);
  } 

  if (mouseY < 100) {
    image(bg_3, 0, 0);
    ii = 0;
    frameRate(60);
  }
  if (0 < mouseY && mouseY < y2) {
    frameRate(30);
  }

  noStroke();
  colorMode(RGB);
  if (mouseY >= y2) {
    moon_i = 0;
    moon_i_bool = 0;
    fill(255, 30);
    rect(0, 0, 1000, 1000);
  } else if (mouseY < y2) {
    if (moon_i_bool == 0 && moon_i <= 120) {
      moon_i++;
    } else if (moon_i_bool == 0 && moon_i == 121) {
      moon_i_bool = 1;
    }
    fill(221, 239, 255, 1+ii);
    ellipse(860, moon_i, 100-ii, 100-ii);
    fill(221, 239, 255, 2+ii);
    ellipse(860, moon_i, 130, 130);
    fill(221, 239, 255, 3+ii);
    ellipse(860, moon_i, 160-ii, 160-ii);
    fill(0, 20);
    rect(0, 0, 1000, 1000);
  }

  // left & right 

  if ( ii <= 10 && bool_2 == 0) { 
    ii++;
  }
  if ( ii >= -1 && bool_2 == 1) {
    ii--;
  }

  if ( ii == 10 ) {
    bool_2 = 1;
  }
  if ( ii == -1 ) {
    bool_2 = 0;
  }


  if (count % 2 == 0) {
    stroke(map(mouseY, 0, 1000, 255, 0), 10);
    line(x1, y1, x2+ii, y2);

    if (mouseY <= 100) {
      keySize = 1;
    } else {
      keySize = keySizeSave;
    }
    for ( int g = 0; g < keySize; g += 5) {
      colorMode(HSB);
      stroke(countRB, 255, 255, 5);
      strokeWeight(1);
      line(0, map(noise(xNoise*30), 0, 1, y1-g, y1+g), 
        width, map(noise(yNoise*80), 0, 1, y1-g, y1+g)); // ground
    }

    noStroke();
    fill(0);
  }

  if (keyPressed && key == 'r') {
    keySizeSave -= 10;
  } else if (keyPressed && key == 'f') {
    keySizeSave += 10;
  }
  if (keySize > 1000) {
    keySize = 0;
  }

  a = int(map(mouseX, 0, width-100, 0, 100));
  b = int(map(mouseY, 0, height, 0, 100));

  for (int i = 0; i < a; i++) {

    // rotate(radians(360.0/a));

    if (count % 2 == 0 && count != 0) {
      colorMode(RGB);
      noStroke();

      int mouseY_caution = mouseY;
      int mouseX_caution = mouseX;

      if (mouseY_caution > y2) {
        mouseY_caution = y2;
        mouseX_caution = x2;
      } else if ((mouseY_caution == y2 && mouseX_caution < x2) || (mouseY_caution == y2 && mouseX_caution > x2)) {
        mouseX_caution = x2;
      }

      float mapkeysize = map(mouseY_caution, y2, 1000, 0, 1000);
      float mapkeysizeX = map(mouseX_caution, x2, 1000, 0, 1000);

      if (mouseY > 100) {

        colorMode(HSB);
        fill(countRB, 255, 255, 20);
        ellipse(map(noise(xNoise*100), 0, 1, x2-150+mapkeysize, x2+150-mapkeysize)+mapkeysizeX, 
          map(noise(yNoise*70), 0, 1, y2-150+mapkeysize, y2+150-mapkeysize)+mapkeysize, 20, 20);
        fill(countRB-50, 255, 255, 40);
        ellipse(map(noise(xNoise*40), 0, 1, x2-150+mapkeysize, x2+150-mapkeysize)+mapkeysizeX, 
          map(noise(yNoise*20), 0, 1, y2-150+mapkeysize, y2+150-mapkeysize)+mapkeysize, 5, 5);
        fill(countRB+50, 255, 255, 80);
        ellipse(map(noise(xNoise*90), 0, 1, x2-150+mapkeysize, x2+150-mapkeysize)+mapkeysizeX, 
          map(noise(yNoise*120), 0, 1, y2-150+mapkeysize, y2+150-mapkeysize)+mapkeysize, 3, 3);
      }
      xNoise += 0.02;
      yNoise += 0.01;
    }
  }
  // mouseButton RB to use color change;

  if (mousePressed) {
    if (mouseButton == RIGHT) {
      countRB++;
    }

    if (countRB > 255) {
      countRB = 0;
    }
  }

  // Butterfly

  translate(mouseX, mouseY);
  if (count % 2 ==1 || count ==0) {
    noFill();
    stroke(0, 30);
  } else {
    noStroke();
    fill(countRB, 255, 255, 40);
  }

  float da = PI / 200;
  float dx = 0.05;

  float xoff = 0;
  beginShape();
  for (float a = 0; a <= TWO_PI; a += da) {
    float n = noise(xoff, yoff);
    float r = sin(2 * a) * map(n, 0, 1, 30, 70);
    float x = sin(frameCount * 0.1) * r * cos(a);
    float y = r * sin(a);
    if (a < PI) {
      xoff += dx;
    } else {
      xoff -= dx;
    }
    //point(x, y);
    vertex(x, y);
  }
  endShape();

  yoff += 0.01;
}

void mousePressed() {

  if (mouseButton == LEFT && count % 2 == 0) {
    x1 = mouseX;
    y1 = mouseY;
    count++;
  } else if (mouseButton == LEFT && count % 2 == 1) {
    x2 = mouseX;
    y2 = mouseY;
    count++;
  }
}
