(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx, name) {
    Parse.initialize("nueAryn2C8gBOUYBMM3Dzil1CSv8xIYt1FJHlnR9", 
      "ZITOzMOjg0nyuFLqOmc5YAWLu6CTHNkxuk8hIFrN");
    this.game = game;
    this.name = name;
    this.ctx = ctx;
    this.game.ctx = ctx;
    Asteroids.GameScore = Parse.Object.extend("GameScore");
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var gameView = this;
    function intervalTrigger() {
      return window.setInterval(function () { 
      this.game.step(this.ctx, gameView); }, 15);
    }

    function moveInterval() { 
      return window.setInterval(function () { moveCallback(); }, 40);
    }

    function shootInterval() {
      return window.setInterval(function() { fireCallback();}, 200);
    }

    Asteroids.moveInterval = moveInterval();
    Asteroids.shootInterval = shootInterval();
    Asteroids.intervalTrigger = intervalTrigger();
    this.game.draw(this.ctx);
  };

  GameView.prototype.stop = function () {
    window.cancelAnimationFrame(Asteroids.drawId);
    var gameScore = new Asteroids.GameScore();
    var query = new Parse.Query(Asteroids.GameScore);
    var points = this.game.points;
    
    this.ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
      this.ctx.drawImage(
        this.game.backgroundImage,
        0,
        0,
        960,
        640
      );
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "24px Open Sans";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "Game over!  Your score was: " + points, Asteroids.DIM_X / 2, 40
    );

    gameScore.save({
      score: points,
      playerName: this.name
    }, {
      success: function(gameScore) {
        this.ctx.font = "16px Open Sans";
        this.ctx.fillStyle = "#f00";
        this.ctx.fillText(
          "Press enter to play again!", Asteroids.DIM_X / 2, 90
        );
        var textPosition = 140;
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(
          "High Score List", Asteroids.DIM_X / 2, textPosition
        );
        query.descending("score").limit(10);
        query.find({
          success: function(results) {
            var i = 0;
            results.forEach(function(result) {
              i += 1;
              textPosition += 25;
              this.ctx.fillText(
                i + ". " + result.get("playerName") + ": " +
                result.get("score"), 
                Asteroids.DIM_X / 2,
                textPosition
              );
            }, this);
          }.bind(this)
        });
      }.bind(this)
    });
    window.clearInterval(Asteroids.intervalTrigger);
    window.clearInterval(Asteroids.moveInterval);
    window.clearInterval(Asteroids.shootInterval);
    this.bindEndKeyHandlers();
  };

  var moveCallback = function () {
    if(key.isPressed("up")) this.game.ship.power();
    if(key.isPressed("left")) this.game.ship.turnLeft();
    if(key.isPressed("right")) this.game.ship.turnRight();
    if(key.isPressed("down")) this.game.ship.stop();
  };

  var fireCallback = function () {
    if(key.isPressed("space")) this.game.ship.fireBullet();
  };

  GameView.prototype.bindKeyHandlers = function(){
    gameView = this;
    key('space', function(){ gameView.game.ship.fireBullet(); });
  };

  GameView.prototype.bindEndKeyHandlers = function(){
    gameView = this;
    key.unbind('space');
    key('enter', function(){ 
      gameView.start();
      key.unbind('enter');
    });
  };


})();
