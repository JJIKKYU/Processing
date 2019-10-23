import ddf.minim.*;
Minim minim; 
AudioPlayer player;

Mover[] movers = new Mover[200];  // array of objects
Mover[] movers_clicked = new Mover[100];  // array of objects
boolean clicked;
PVector mouse_clicked;
int count = 0;
int x1 = -100;
int y1 = -100;
int x2, y2;
int ii;
int bool_2 = 0;
boolean bg = false;
boolean ok = false;
color A = color(255, 255, 20);

float trans;

PImage idle_1;
PImage idle_2;
PImage active;
PImage active_2;
PImage cali_1;
PImage cali_2;
PImage cali_3;
PImage cali_1_black;
PImage cali_2_black;
PImage cali_3_black;

void Awake() {
  idle_1 = loadImage("idle_1.png");
  idle_2 = loadImage("idle_2.png");
  active = loadImage("active_1.png");
  active_2 = loadImage("active_2.png");
  cali_1 = loadImage("cali_1.png");
  cali_2 = loadImage("cali_2.png");
  cali_3 = loadImage("cali_3.png");
  cali_1_black = loadImage("cali_1_black.png");
  cali_2_black = loadImage("cali_2_black.png");
  cali_3_black = loadImage("cali_3_black.png");

  minim = new Minim(this); 
  player = minim.loadFile("bgm_3.mp3", 512); 
  player.loop();
}

void setup() {
  Awake();
  size(900, 900);
  smooth();
  background(255);
  frameRate(30);
  for (int i = 0; i < movers.length; i++) {
    movers[i] = new Mover();
  }
}

void draw() {
  noStroke();
  if (bg == false) {
    fill(0, 50);
    noStroke();
    rect(0, 0, width, height);
    stroke(255, 50);
  } else {
    fill(255, 40);
    noStroke();
    rect(0, 0, width, height);
    stroke(0, 50);
  }  


  if (count % 2 == 0) {
    line(x1, y1, x2+ii, y2);
    for (int i = 0; i < 15; i++) {
      line(0, y1-i, width, y1+i);
    }
  }
  if (count == 0) {
    image(idle_2, 0, 0);
  }
  if (count % 2 == 1 && bg == true) {
    tint(255, 255);
    image(idle_1, 0, 0);
  } else if (count % 2 == 1 && bg == false) {
    tint(255, 255);
    image(idle_2, 0, 0);
  }
  if (count % 2 == 0 && count != 0 && ok != true && bg == false) {
    tint(255, 255);
    image(active, 0, 0);
  } else if (count % 2 == 0 && count != 0 && ok != true && bg == true) {
    tint(255, 255);
    image(active_2, 0, 0);
  }
  if (ok == true && bg == false) {
    if (trans <= 255) trans += 0.5;
    tint(255, trans);
    if (count % 3 == 0) image(cali_1, 0, 0);
    else if (count % 3 == 1) image(cali_2, 0, 0);
    else if (count % 3 == 2) image(cali_3, 0, 0);
  } 
  else if (ok == true && bg == true) {
    if (trans <= 255) trans += 0.5;
    tint(255, trans);
    if (count % 3 == 0) image(cali_1_black, 0, 0);
    else if (count % 3 == 1) image(cali_2_black, 0, 0);
    else if (count % 3 == 2) image(cali_3_black, 0, 0);
  } 
  else {
    trans = 0;
  }
  noStroke();

  for (int i = 0; i < movers.length; i++) {
    fill(mouseX, mouseY, 255);
    movers[i].update();
    movers[i].display();
  }

  leftRight();

  println(count);
}

void mousePressed() {

  if (mouseButton == LEFT && count % 2 == 0) {
    ok = false;
    x1 = mouseX;
    y1 = mouseY;
    count++;
  } else if (mouseButton == LEFT && count % 2 == 1) {
    mouse_clicked = new PVector(mouseX, mouseY);
    x2 = mouseX;
    y2 = mouseY;
    count++;
  } else if (mouseButton == RIGHT) {
    bg = !bg;
  }
  if (mouseButton == CENTER) {
    ok = !ok;
  }
}

void leftRight() {
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
}


class Mover {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float topspeed;   // to limit velocity
  color c1;
  PVector mouse;
  PVector dir;
  float size;

  Mover() {
    location = new PVector(random(width/2), random(height/2));
    topspeed = random(8, 10);
    velocity = new PVector(0, 0);
    colorMode(HSB);
    c1 = color(random(100, 255), 180, 255, 30);
    size = random(10, 30);
  }

  void update() {
    if (count % 2 == 1 || count == 0) {
      mouse = new PVector(mouseX, mouseY);
      dir = PVector.sub(mouse, location);
    } else if (count % 2 == 0 && count != 0) {
      fill(mouseX, mouseY, 255);
      dir = PVector.sub(mouse_clicked, location);
    }


    dir.normalize();
    dir.mult(0.5);
    acceleration = dir;

    velocity.add(acceleration);
    velocity.limit(topspeed); // to limit velocity
    location.add(velocity);
  }

  void display() {
    noStroke();

    fill(c1);
    if (count % 2 ==0 && count !=0) {
      //      fill(map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255), 255, 40);

      if (ok == true) {
        velocity.add(map(mouseX, 0, 900, random(-8, 8), 0), map(mouseY, 0, 900, random(-1, -1.5), 0));
      }
    }
    ellipse(location.x, location.y, size, size);
  }
}
