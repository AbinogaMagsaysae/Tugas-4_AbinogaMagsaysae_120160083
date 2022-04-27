let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Kendaraan(200,500);
}

function draw() {
  background(220);
  
  v.display()
  v.batas()
  v.diperbarui();
  v.terbang();
  
}

class Kendaraan{
  constructor(x,y){
    this.posisi = createVector(x,y);
    this.kecepatan = createVector(1,0);
    this.percepatan = createVector(0,0);
    this.l = 20;
    this.maxspeed = 2;
    this.maxforce = 0.1;
    this.terbangTheta = PI/2;
  }
  
  terbang(){
    let projVector = this.kecepatan.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.posisi);
    
    let terbangRadius = 50;
    let theta = this.terbangTheta + this.kecepatan.heading();
    let xBar = terbangRadius * cos(theta);
    let yBar = terbangRadius * sin(theta);
    
    let terbangPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
  
    
    let mengemudiForce = terbangPoint.sub(this.posisi);
    mengemudiForce.setMag(this.maxforce);
    this.applyForce(mengemudiForce);
    
    this.terbangTheta += random(-0.5, 0.5);
    
  }
  
  mencari(vektorTarget){
    var tujuan = p5.Vector.sub(vektorTarget, this.posisi);
    tujuan.normalize();
    tujuan.mult(this.maxspeed);
    
    //kemudi
    var mengendarai = p5.Vector.sub(tujuan, this.kecepatan);
    mengendarai.limit(this.maxforce);
    this.applyForce(mengendarai);
  }
  
  sampai(vektorTarget){
    var tujuan = p5.Vector.sub(vektorTarget, this.posisi);
    var jarak = tujuan.mag()

    if (jarak < 50){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      tujuan.normalize();
      tujuan.mult(m);
      
    }
    else{
      tujuan.normalize();
      tujuan.mult(this.maxspeed);    
    }

    var mengendarai = p5.Vector.sub(tujuan, this.kecepatan);
    mengendarai.limit(this.maxforce);
    this.applyForce(mengendari);
  }
  
  
  diperbarui(){
    this.kecepatan.add(this.percepatan);
    this.kecepatan.limit(this.maxspeed);
    this.posisi.add(this.kecepatan);
    this.percepatan.mult(0);
  }
  applyForce(force){
    this.percepatan.add(force);
  }
  display(){
    var theta = this.kecepatan.heading()//+ PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.posisi.x, this.posisi.y)
    rotate(theta)
  //Mobil kuning
    strokeWeight(0.5)
    stroke(0);
    fill(255, 128, 0);
    rect(40, 155, 70, 20,  radians(500), radians(180))
    rect(43, 162, 5, 13)

    //spion
    fill(255);
    line(35, 159, 42, 158)
    rect(35, 159, 1, 3, radians(200))

    //jendela
    fill(51, 255, 153);
    arc(43, 157, 23, 20, radians(0), radians(90))
    rect(43, 157, 5, 5, radians(290), radians(0))
    rect(48, 157, 5, 5)
    rect(53, 157, 5, 5)
    rect(58, 157, 5, 5)
    //pintu
    fill(255);
    rect(63, 157, 10, 13)
    rect(64, 158, 8, 11)
    line(68, 170, 68, 157)
    fill(255, 128, 0);
    rect(67, 153,20, 2, radians(30), radians(30)) 
    //jendela
    fill(51, 255, 153);
    rect(73, 157, 5, 5)
    rect(78, 157, 5, 5)
    rect(83, 157, 5, 5)
    rect(88, 157, 5, 5)
    rect(93, 157, 5, 5)
    rect(98, 157, 5, 5)
    rect(103, 157, 5, 5, radians(0), radians(20))

    //acc
    fill(255);
    rect(100, 168, 5, 6)
    line(104, 169, 101, 169)
    line(104, 170, 101, 170)
    line(104, 171, 101, 171)
    line(104, 172, 101, 172)
    line(104, 173, 101, 173)

    //ban
    strokeWeight(2)
    fill(255);
    ellipse(55, 175, 7, 7)
    point(55, 175)
    ellipse(90, 175, 7, 7)
    point(90, 175)
    pop();
  }

   batas() {
    if (this.posisi.x > width + 10) {
      this.posisi.x = -10;
    } else if (this.posisi.x < -10) {
      this.posisi.x = width + 10;
    }
    if (this.posisi.y > height + 10) {
      this.posisi.y = -10;
    } else if (this.posisi.y < -10) {
      this.posisi.y = height + 10;
    }
  }

}