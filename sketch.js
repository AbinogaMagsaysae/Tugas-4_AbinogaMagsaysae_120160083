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
    this.l = 30;
    this.maxspeed = 2;
    this.maxforce = 0.01;
    this.terbangTheta = PI/2;
  }
  
  terbang(){
    let projVector = this.kecepatan.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.posisi);
    
    let terbangRadius = 20;
    let theta = this.terbangTheta + this.kecepatan.heading();
    let xBar = terbangRadius * cos(theta);
    let yBar = terbangRadius * sin(theta);
    
    let terbangPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    let debug = true;
    
    if (debug){
      push()
      fill(150, 75, 0);
      stroke('red')
      line(this.posisi.x, this.posisi.y, projPoint.x, projPoint.y)
      stroke('red');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('red');
      circle(projPoint.x, projPoint.y, terbangRadius*2);
      
      line(this.posisi.x, this.posisi.y, terbangPoint.x, terbangPoint.y)
      stroke('black')
      fill('yellow')
      circle(terbangPoint.x, terbangPoint.y, 10);
      pop()
    }
  
    
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
    rect(-55, -20, 70, 20,  radians(0), radians(280))
    rect(6, -13, 5, 13)

    //spion
    fill(255);
    line(16, -17, 23, -16)
    rect(23, -16, 1, 3, radians(200))

    //jendela
    fill(51, 255, 153);
    arc(10, -18, 23, 20, radians(90), radians(180))
    rect(5, -18, 5, 5)
    rect(-0, -18, 5, 5)
    rect(-5,-18, 5, 5)
    rect(-10,-18, 5, 5)
    //pintu
    fill(255);
    rect(-20, -18, 10, 13)
    rect(-19,-17, 8, 11)
    line(-15, -5, -15, -18)
    fill(255, 128, 0);
    rect(-30, -22,20, 2, radians(30), radians(30)) 
    //jendela
    fill(51, 255, 153);
    rect(-25, -18, 5, 5)
    rect(-30,-18, 5, 5)
    rect(-35,-18, 5, 5)
    rect(-40, -18, 5, 5)
    rect(-45,-18, 5, 5)
    rect(-50,-18, 5, 5)
    rect(-55,-18, 5, 5)

    //ac
    fill(255);
    rect(-52, -7, 5, 6)
    line(-48, -6, -51, -6)
    line(-48, -5, -51, -5)
    line(-48, -4, -51, -4)
    line(-48, -3, -51, -3)
    line(-48, -2, -51, -2)

    //ban
    strokeWeight(2)
    fill(255);
    ellipse(0, 0, 7, 7)
    point(0, 0)
    ellipse(-35, 0, 7, 7)
    point(-35, 0)
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
