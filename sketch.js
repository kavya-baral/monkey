
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var gamestate = "play";


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,600);
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
 monkey.scale = 0.1;
   
 ground = createSprite(400,350,900,10);
 ground.velocityX = -4;
  
 score = 0;
 survivaltime = 0;
  
 FoodGroup = new Group();
 obstacleGroup = new Group();
}


function draw() {
 background("white");
  
 if ( gamestate == "play"){
 if (ground.x>0){
 ground.x = ground.width/2;
 }
  if (keyDown("space")&& monkey.y>= 200){
 monkey.velocityY = -12;
 }
 monkey.velocityY = monkey.velocityY + 0.8;

 score = score +Math.round(getFrameRate()/60);

 food();
 obstacles(); 
 
 if (monkey.isTouching(obstacleGroup)){
 gamestate = "end";
 }
 }
else if (gamestate === "end"){
 
 obstacleGroup.setVelocityXEach(0);
 FoodGroup.setVelocityXEach(0);
 monkey.velocityX = 0;
 ground.velocityX = 0;
}
 monkey.collide(ground); 
 drawSprites();
  
 text("survivaltime:" + score,300,40);

}

function food() {
 
 if (frameCount% 80 === 0){
 var banana = createSprite(600,random(120,250));
 banana.addImage(bananaImage);
 banana.velocityX = -12;
 banana.setLifetime = 134;
 banana.scale = 0.1;
 FoodGroup.add(banana);
 }
}

function obstacles(){

 if (frameCount%300 === 0){
 var obstacles = createSprite(600,300);  
 obstacles.addImage(obstacleImage);  
 obstacles.velocityX = -8;  
 obstacles.setLifetime = 134; 
 obstacles.scale = 0.2;
 obstacleGroup.add(obstacles);     
 }
}


