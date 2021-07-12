const World=Matter.World;
const Engine=Matter.Engine;
const Bodies=Matter.Bodies;

var Gafus, GafusImg;
var Toqq, ToqqImg;
var bgImage1, rockyBgImg2, lifeBgImg4;
var meteorGroup;
var cometGroup;
var starGroup;
var brickGroup;
var gameState=0;
var Start;
var starImg;
var Flag=false;
var Flag2=false;
var cometImg, meteorImg, stillMeteorImg;
var world, engine;
var ToqqBody, brickBody;
var gBrick;
function preload(){
  bgImage1=loadImage("Images/WelcomBG.jpg");
  GafusImg=loadAnimation("Images/Gafus1.png", "Images/Gafus2.png", "Images/Gafus3.png", "Images/Gafus4.png");
  cometImg=loadImage("Images/comet.png");
  meteorImg=loadImage("Images/meteor.png");
  ToqqImg=loadAnimation("Images/Toqq1.png","Images/Toqq2.png","Images/Toqq3.png","Images/Toqq4.png",
  "Images/Toqq5.png","Images/Toqq6.png","Images/Toqq7.png")
  rockyBgImg2=loadImage("Images/Rocky planet.jpg");
  //waterBgImg3=loadImage("Images/Water Planet.jpg")
  lifeBgImg4=loadImage("Images/Life Planet.jpg")
  starImage=loadAnimation("Images/star1.png","Images/star2.png","Images/star3.png", "Images/star4.png",
 "Images/star5.png", "Images/star6.png", "Images/star7.png", "Images/star8.png");
  stillMeteorImg=loadImage("Images/stillMeteor.png");
  //loadAnimation
}
function setup() {
 createCanvas(displayWidth, displayHeight);
 engine =Engine.create();
  world=engine.world;
  Gafus=createSprite(displayWidth/7, displayHeight-100, 10, 10)
  Gafus.addAnimation("alien", GafusImg);
  Toqq=createSprite(displayWidth/2, displayHeight-400);
  Toqq.addAnimation("float", ToqqImg)
  Start=createButton("PLAY");
  Start.position(displayWidth/2, displayHeight-100);
  starGroup = new Group();
  brickGroup = new Group();
  cometGroup = new Group();
  meteorGroup = new Group();
  //ToqqBody = new StarToqq(Toqq.x, Toqq.y);

}
function draw() {
  if(gameState===0){
    background(bgImage1);
    textSize(70);
    stroke("white")
    strokeWeight(5);
    fill("lightblue")
    text("WELCOME TO PLANET VEXILIA", 70, 80)
    textSize(15);
    noStroke();
    fill("white")
    text("Good day, Toqq! It appears that you've finally stumbled across Vexilia!", 20, 300);
    text("I've been waiting for you. I'm Gafus.", 20, 320);
    text("It is your job to restore Vexilia to its former beauty.", 20, 340);
    text("To do this, you must shoot your stars at the meteors that have been", 20, 360);
    text(" destroying the planet.", 20, 374);
    text("Whenever you hit one, your score will go up by 50.", 20, 394);
    text("Be careful though, some of them are falling and if they hit you,", 20, 414);
    text(" you'll die and have to start over!", 20, 428);
    text("Occasionally, you'll see comets, and if you hit those", 20, 448);
    text("you get 100 points!", 20, 462);
    text(".",20, 448)

    Start.mousePressed(()=>{
      gameState=1;
      Start.hide();
    })
  }
  if(gameState===1){
    background(rockyBgImg2);
    //first game level
    //different bg-rock planet
    Toqq.scale=0.5
    Toqq.y=displayHeight-200;
    Gafus.visible=false;
    if(keyDown(LEFT_ARROW)){
      Toqq.x=Toqq.x-2;
    }
    if(keyDown(RIGHT_ARROW)){
      Toqq.x=Toqq.x+2;
    }
    if(Flag===false){
      spawnBricks();
    }
      console.log(gameState);
      console.log(Flag2)
      if(Flag2===true){
        //console.log("1")
        for(var i=0; i<brickGroup.length; i++){
          if(starGroup.isTouching(brickGroup.get(i))){
           brickGroup.get(i).destroy();
            starGroup.destroyEach();
          }
        if(starGroup.isTouching(gBrick)){
          gameState=2;
        }
       }
    }

  }
  if(gameState===2){
    background(lifeBgImg4)
  }
  drawSprites();

  //ToqqBody.display();
  
  Engine.update(engine);
}
function spawnBricks(){
  gBrick=createSprite(random(50, displayWidth-100), random(50, displayHeight-700), 40, 20)
  gBrick.shapeColor="gold";

  for(var i=0; i<=12; i++){
    brick=createSprite(i*100, random(displayHeight-700, displayHeight-550), 50, 30);
    strokeWeight(5);
    brick.addImage(stillMeteorImg);
    brick.scale=0.25;
    brickGroup.add(brick);
  }
  Flag=true;
}
function spawnStars(){
  var star=createSprite(Toqq.x, Toqq.y, 10, 10);
  star.addAnimation("shooting star", starImage);
  star.scale=0.2;
  star.velocityY=-5;
  starGroup.add(star);
  star.lifetime=displayHeight/5;
  Flag2=true;
}
function spawnMeteors(){
  if(frameCount%450===0){
    var meteor = createSprite(random(0, displayWidth), -10, 15, 15)
    meteor.addImage(meteorImg);
    meteor.velocityY=6;
    meteorGroup.add(meteor);
    meteor.lifetime=displayHeight/6;
  }

}
function keyPressed(){
  if (keyCode===32){
    console.log("stars");
    spawnStars();
  }
}