/* Draw Images */
PImage img, imgConvert; // 0_hanriver.png
PImage img2, imgConvert2; // 1_tiger.png
PImage img3, imgConvert3; // 2_BW.png
PImage img4, imgConvert4; // 3_CB.png
PImage img5, imgConvert5; // 4_fall.png
PImage img6, imgConvert6; // 5_sea.png

/* Image Select */
int select = 1;

/* Type Select */
int Tselect = 1;

PImage maskImage;

/* Type Images */
PImage type1;
PImage type2;
PImage type3;

/* mouse X, mouse Y color opacity change */
float mouseXvalue;
float mouseYvalue;

/* Boolean */
/* Fill or Stroke */
boolean FS = false;
boolean ok = false;

/* Noise offeset */
float xoff, xoff2, xoff3;
float yoff, yoff2, yoff3;

/* color */
float r, g, b;



void setup() {
  size(1000, 750);
  noFill();
  smooth();
  background(255);
  frameRate(500);

  /* Draw Images */
  img = loadImage("0_hanriver.png");
  imgConvert = createImage(1000, 750, RGB);
  img2 = loadImage("1_tiger.png");
  imgConvert2 = createImage(1000, 750, RGB);
  img3 = loadImage("2_BW.png");
  imgConvert3 = createImage(1000, 750, RGB);
  img4 = loadImage("3_CB.png");
  imgConvert4 = createImage(1000, 750, RGB);
  img5 = loadImage("04_fall.png");
  imgConvert5 = createImage(1000, 750, RGB);
  img6 = loadImage("05_sea.png");
  imgConvert6 = createImage(1000, 750, RGB);

  /* Type Images */
  type1 = loadImage("type1.png");
  type2 = loadImage("type2.png");
  type3 = loadImage("type3.png");
}

void draw() {



  /* Frame type change */
  if (Tselect == 1) {
    image(type1, 0, 0);
  } else if (Tselect == 2) {
    image(type2, 0, 0);
  } else if (Tselect == 3) {
    image(type3, 0, 0);
  }

  /* Photo change */
  if (select == 1) {
    imgConvert.copy(img, 0, 0, img.width, img.height, 0, 0, imgConvert.width, imgConvert.height);
    imgConvert.loadPixels();
  } else if (select == 2) {
    imgConvert.copy(img2, 0, 0, img2.width, img2.height, 0, 0, imgConvert2.width, imgConvert2.height);
    imgConvert2.loadPixels();
  } else if (select == 3) {
    imgConvert.copy(img3, 0, 0, img3.width, img3.height, 0, 0, imgConvert3.width, imgConvert3.height);
    imgConvert3.loadPixels();
  } else if (select == 4) {
    imgConvert.copy(img4, 0, 0, img4.width, img4.height, 0, 0, imgConvert4.width, imgConvert4.height);
    imgConvert4.loadPixels();
  } else if (select == 5) {
    imgConvert.copy(img5, 0, 0, img5.width, img5.height, 0, 0, imgConvert5.width, imgConvert5.height);
    imgConvert5.loadPixels();
  } else if (select ==6) {
    imgConvert.copy(img6, 0, 0, img6.width, img6.height, 0, 0, imgConvert6.width, imgConvert6.height);
    imgConvert6.loadPixels();
  }

  println(r);


  mouseXvalue = map(mouseX, 0, 1000, 10, 80);
  mouseYvalue = map(mouseY, 750, 0, 10, 30);

  /* draw fill and stroke function */
  drawFill(0.008, 0.005);
  drawFill2(0.005, 0.004);
  drawFill3(0.006, 0.008);
}

void drawFill(float xoff, float yoff) {
  int x3 = int(map(noise(xoff2*3), 0, 1, 710, 280));
  int y3 = int(map(noise(yoff2*2), 0, 1, 160, 600));
  float size3 = map(noise(xoff2), 0, 1, 1, mouseYvalue);
  if (FS) {
    noStroke();
    fill(color(imgConvert.pixels[x3+y3*width]), mouseXvalue);
  } else {
    noFill();
    stroke(color(imgConvert.pixels[x3+y3*width]), mouseXvalue);
  }
  ellipse(x3, y3, size3, size3);
  xoff2 += xoff;
  yoff2 += yoff;
}

void drawFill2(float xoffCustom, float yoffCustom) {
  int x2 = int(map(noise(xoff*5), 0, 1, 710, 280));
  int y2 = int(map(noise(yoff*6), 0, 1, 160, 600));
  float size2 = map(noise(xoff*3.05), 0, 1, 1, mouseYvalue);

  if (FS) {
    noStroke();
    fill(color(imgConvert.pixels[x2+y2*width]), mouseXvalue);
  } else {
    noFill();
    stroke(color(imgConvert.pixels[x2+y2*width]), mouseXvalue);
  }
  ellipse(x2, y2, size2, size2);
  xoff += xoffCustom;
  yoff += yoffCustom;
}

void drawFill3(float xoffCustom, float yoffCustom) {
  int x2 = int(map(noise(xoff3*5), 0, 1, 710, 280));
  int y2 = int(map(noise(yoff3*6), 0, 1, 160, 600));
  float size2 = map(noise(xoff3*3.05), 0, 1, 1, mouseYvalue);
  if (FS) {
    noStroke();
    fill(color(imgConvert.pixels[x2+y2*width]), mouseXvalue);
  } else {
    noFill();
    stroke(color(imgConvert.pixels[x2+y2*width]), mouseXvalue);
  }
  ellipse(x2, y2, size2, size2);
  xoff3 += xoffCustom;
  yoff3 += yoffCustom;
}

void drawLine() {
}

void mousePressed() {
  if (mousePressed) {
    FS = !FS;
  }
}

void keyPressed() {
  if (key == '1') {
    select = 1;
    println(select);
  } else if (key == '2') {
    select = 2;
    println(select);
  } else if (key =='3') {
    select = 3;
    println(select);
  } else if (key == '4') {
    select = 4;
    println(select);
  } else if (key == '5') {
    select = 5;
    println(select);
  } else if (key == '6') {
    select = 6;
    println(select);
  }

  if (key == 'q') {
    Tselect = 1;
    println(Tselect);
  } else if (key == 'w') {
    Tselect = 2;
    println(Tselect);
  } else if (key == 'e') {
    Tselect = 3;
    println(Tselect);
  }

  if (key == ' ') {
    fill(255, 100);
    rect(0, 0, width, height);
  }
}


/*
if (Tselect == 1){
 image(type1Convert,0,0);
 }else if (Tselect == 2) {
 image(type2Convert,0,0);
 }
 */
