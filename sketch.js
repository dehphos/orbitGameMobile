
var ww = window.innerWidth 
var wh = window.innerHeight *0.95
var playerCount = 100
var playerList = []
var changing = false
var currtime
var prevtime


class Particle {
  constructor(x, y) {
    this.color = color(random(255), random(255), random(255))
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.prev = {x: x, y: x}
    this.dampen = 0.98
  }
  resetOffScreen(){
    this.vy = 0
    this.vx = 0
    this.prev = {}
    if (random(1) > 0.5){
      if (random(1) > 0.5){this.y = random(-200,0); this.x = random(0,ww)}
      else{this.y = random(wh,wh+200); this.x = random(0,ww)}

    }else{
      if (random(1) > 0.5){this.x = random(-200,0); this.y = random(0,wh)}
      else{this.x = random(ww,ww+200); this.y = random(0,wh)}
    }
  }
  update() {
    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy
    this.vx *= this.dampen
    this.vy *= this.dampen
    if (this.x > ww + 200 || this.x < -200 || this.y > wh + 200 || this.y < -200){this.resetOffScreen()}
    if(frameCount % 2 == 0){
      this.prev = {x: this.x, y: this.y}
    }
  }
  draw() {  
    push()
    stroke(this.color)
    fill(255)
    circle(this.x, this.y, 3)
    pop()
  }
  drawTrails(){
    push()
    strokeWeight(1)
    stroke(this.color, 75)
    line(this.x, this.y, this.prev.x, this.prev.y)
    pop()
  }
  calculateAcceleration() {
    let dx = mouseX - this.x
    let dy = mouseY - this.y
    let angle = atan2(dy, dx) + random(-0.05,0)
    let distance = sqrt(dx * dx + dy * dy)
    let force = 200 / distance
    if (force > 2) force = 2
    this.ax = (cos(angle) * force)+random(-0.05,0.05)  
    this.ay = (sin(angle) * force)+random(-0.05,0.05)
    if(!mouseIsPressed){}else{this.ax = -this.ax*5; this.ay = -this.ay*5}
  }
  play(){
    this.calculateAcceleration()
    this.update()
    this.draw()
    this.drawTrails()
  }
}

function resetAndChangePlayerCount(){
  changing = true 
  playerCount = playerslider.value()
  playerList = []
  for (let i = 0; i < playerCount; i++) {
    let p = new Particle(random(ww), random(wh))
    playerList.push(p)
  }
}

function touchReleased(){
  if (changing == true){
  resetAndChangePlayerCount()
  changing = false}}

function setup() {
  pixelDensity(1)
  for (let i = 0; i < playerCount; i++) {
    let p = new Particle(random(ww), random(wh))
    playerList.push(p)
  }
  console.log(playerList)
  createCanvas(ww, wh)
  frameRate(60)
  playerslider = createSlider(1,1500,playerCount,1)
  playerslider.mousePressed(resetAndChangePlayerCount)
  textSize(20)
  fill(235)
  strokeWeight(1)
}




function draw() {
  background(10)
  for (i in playerList){
    if (changing == true) {playerList[i].draw()}else{
    playerList[i].play()}}
  prevtime = currtime
  currtime = Date.now()
  let fps = 1000/(currtime-prevtime)
  text("fps: " + fps.toFixed(2), 10, 30)
  text("Particles: " + playerCount, 10, 60)

}5
