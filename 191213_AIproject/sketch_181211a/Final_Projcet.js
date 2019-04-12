var yoff = 0.0;        // 2nd dimension of perlin noise
var access = 0;
var i = 0;
var hi = 1000;
var defaultH = 840;
  
function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  // canvas.position(0, 0);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Background Refresh
  fill(255,100);
  rect(0,500,windowWidth, windowHeight);
  if ( access == 0 ) {
  // waveDraw(R, G, B, Opacity, xOff, yOff, mapWidth, mapHeight)  
  waveDraw(0, 0, 0, colorTransition(30), 0.004, 0.004, heightTransition(800), 840);
  waveDraw(0, 0, 0 ,colorTransition(20), 0.004, 0.004, heightTransition(800), 870);    
  }
  if (access == 1) {
  waveDraw(colorTransition(100), colorTransition(100), map(colorTransition(100),0,1,0,255), 100, 0.01, 0.005, turnOn(700)-10, 780);
  waveDraw(colorTransition(100), map(colorTransition(100),0,100,0,208), map(colorTransition(100),0,100,0,255) ,100, 0.005, 0.005, turnOn(700), 780);
  }
  
  push();
  translate(this.pos.x, this.pos.y);
  beginShape();
  for (var a = 0; a < TWO_PI; a += 0.1) {
    var x = this.r * cos(a);
    var y = this.r * sin(a);
    vertex(x,y);
  }
  endShape();
  
}

function colorTransition(a){  
  while(i<a){
    i++;
    return i;
  }
 return i;
}

function heightTransition(a){
 while(hi>a){
    hi--;
    return hi;
  }
 return hi;
}

function turnOn(goalH){
  while (defaultH >= goalH) {
    defaultH--;
    
    return defaultH;
  }
  return defaultH;
}


function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    i = 0;
    access = 1;
  }
  if (keyCode == RIGHT_ARROW) {
    i = 0;
    hi = 1000;
    access = 0;
  }
}


// waveDraw(R, G, B, Opacity, xOff, yOff, mapWidth, mapHeight)
function waveDraw(r, g, b, o, Vx, Vy, maxWidth, maxHeight) {
  fill(r,g,b,o);
  //stroke(0,10);
  
  beginShape(); 
  
  var xoff = 0;       // Option #1: 2D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width+10; x += 10) {
    // X value = Wave frequency control.
    // width + 10 -> because , last point isn't filled.
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, maxWidth, maxHeight);
    
    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += Vx;
  }
  // increment y dimension for noise
  yoff += Vy;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
