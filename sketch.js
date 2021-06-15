//Create variables here
var dog, happdog, foodS, database, foodstock , dogimg, happdogimg , fedTime ,foodObj,lastFed;

function preload()
{
	//load images here
  happydogimg=loadImage("images/happydog.png")
  dogimg=loadImage("images/dog.png")
  milk=loadImage("images/Milk.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(350,250,0,0)
  dog.addImage(dogimg)
  dog.scale = 0.1
  
  foodstock = database.ref("food")
  foodstock.on("value",readstock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  foodObj = new Food()
}


function draw() {  
  background(46, 139, 87)

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  drawSprites();
  
}

function readstock(data){

foodS = data.val();

}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
