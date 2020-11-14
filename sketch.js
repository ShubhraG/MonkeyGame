var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var gameState = "play";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400)
  monkey = createSprite(70, 350, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 380, 400, 10);
  ground.velocityX = -2;
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("#abcdef");
  fill("black");
  textSize(15);
  text("Survival Time.: " + score, 250, 50);
  if (ground.x < 200) {
    ground.x = ground.width / 2;
  }

  //console.log(getFrameRate());
  if (gameState == "play") {

    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space") && monkey.y > 100) {
      monkey.velocityY = -6;
    }
    monkey.velocityY = monkey.velocityY + 0.5;


    spawnBananas();
    spawnObstacles();

    if (FoodGroup.isTouching(monkey)) {
      monkey.scale = 0.18;
      FoodGroup.destroyEach();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = "end";
    }
  } else if (gameState == "end") {
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setvelocityXEach = 0;
    obstacleGroup.setvelocityXEach = 0;
    monkey.destroy();
    textSize(20);
    text("Game Over!",150,200);
  }

  
  monkey.collide(ground);
  drawSprites();
}

function spawnBananas() {
  if (frameCount % 100 == 0) {
    banana = createSprite(400, Math.round(random(150, 250)), 10, 10)
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    FoodGroup.add(banana);

  }

}

function spawnObstacles() {
  if (frameCount % 300 == 0) {
    obstacle = createSprite(400, 365, 10, 10)
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }

}
