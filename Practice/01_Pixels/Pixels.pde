PImage cat;
PImage img;
PImage background;
PImage img2;
boolean ok = false;

void setup() {
  size(600, 600);
  cat = loadImage("cat.jpg");
  img = createImage(600, 600, RGB);
  background = loadImage("cat2.jpg");
  img2 = createImage(600, 600, RGB);
  noStroke();
  background(255);
}

void draw() {
  img.copy(cat, 0, 0, cat.width, cat.height, 0, 0, img.width, img.height);
  img2.copy(background, 0, 0, background.width, background.height, 0, 0, img2.width, img2.height);
  img.loadPixels();
  img2.loadPixels();
  for (int i =0; i < 400; i++) {
    int x = int(random(width));
    int y = int(random(height));
    float size = random(5, 30);
    
    if(ok == false) {
      fill(color(img.pixels[x+y*width]), 25);
    }else {
      fill(color(img2.pixels[x+y*width]), 25);
    }
    ellipse(x, y, size, size);
  }
  if (mousePressed){
    ok = !ok;
  }
  
  println(ok);
}
