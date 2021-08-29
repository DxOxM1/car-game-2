class Game {
  constructor() {
    this.leaderboardTitle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
  }
  //reading the gamestate value from the database
  getState(){
    database.ref("gameState").on("value", function(data){
      gameState = data.val()
    })
  }
  //writing the gamestate value to the database
  updateState(state){
    database.ref("/").update({
      gameState: state
    })
  }
  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount()
    car1 = createSprite(width /2 - 100, height - 100)
    car1.addImage(carImage1)
    car1.scale = 0.07
    car2 = createSprite(width /2 + 100, height - 100)
    car2.addImage(carImage2)
    car2.scale = 0.07
    cars = [car1, car2]
  }

  //!== not equal
  play(){
    form.hide()
    Player.getPlayersInfo()
    this.leaderboardTitle.html("Leaderboard")
    this.leaderboardTitle.position(95,140)
    this.leader1.position(95,180)
    this.leader2.position(95,230)
    if(allPlayers!== undefined){
      background("lightblue")
      image(TheEntireMap, 0, -height*5,width,height*6)
      var leader1, leader2
      var players = Object.values(allPlayers)
      if (
        (players[0].rank === 0 && players[1].rank === 0) ||
        players[0].rank === 1
      ) {
        leader1 =
        players[0].rank +
        "     " +
        players[0].name
        leader2 =
        players[1].rank +
        "     " +
        players[1].name  
      }

      if (players[1].rank === 1) {
        leader2 =
        players[0].rank +
        "     " +
        players[0].name
        leader1 =
        players[1].rank +
        "     " +
        players[1].name  

      }
      this.leader1.html(leader1);
      this.leader2.html(leader2);
      var index = 0
      for(var i in allPlayers){
        index = index+1
        var x = allPlayers[i].positionX
        var y = height - allPlayers[i].positionY
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if(index===player.index){
        
          camera.position.y = cars[index - 1].position.y
        }
      }
      if(keyIsDown(UP_ARROW)){
        player.positionY = player.positionY+10
        player.updateDistance()
      }
      if(keyIsDown(LEFT_ARROW) &&player.positionX>500){
        player.positionX = player.positionX-5
        player.updateDistance()
      }
      if(keyIsDown(RIGHT_ARROW) &&player.positionX<width-500){
        player.positionX = player.positionX+5
        player.updateDistance()
      }
      
      drawSprites()
    }
  }
}
