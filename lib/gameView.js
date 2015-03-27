(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    window.setInterval(function () { 
      this.game.step();
      this.game.draw(this.ctx); }, 20);

    window.setInterval(function () { shipPowerCallback(); }, 40);
    window.setInterval(function () { bulletFireCallback(); }, 240);
  };

  var shipPowerCallback = function () {
    var shipPower = [0, 0];

    if (key.isPressed('up')) { shipPower[1] += -0.33;  } 
    if (key.isPressed('down')) { shipPower[1] += 0.33; } 
    if (key.isPressed('left')) { shipPower[0] += -0.33; } 
    if (key.isPressed('right')) { shipPower[0] += 0.33; } 

    gameView.game.ship.power(shipPower);
  };

  var bulletFireCallback = function () {
    if (key.isPressed('w') && key.isPressed('d')) {
      gameView.game.ship.fireBullet([3, -3]);
    } else if (key.isPressed('w') && key.isPressed('a')) {
      gameView.game.ship.fireBullet([-3, -3]);
    } else if (key.isPressed('s') && key.isPressed('a')) {
      gameView.game.ship.fireBullet([-3, 3]);
    } else if (key.isPressed('s') && key.isPressed('d')) {
      gameView.game.ship.fireBullet([3, 3]);
    } else if (key.isPressed('w')) { 
      gameView.game.ship.fireBullet([0, -6]);
    } else if (key.isPressed('a')) { 
      gameView.game.ship.fireBullet([-6, 0]);
    } else if (key.isPressed('s')) { 
      gameView.game.ship.fireBullet([0, 6]);
    } else if (key.isPressed('d')) { 
      gameView.game.ship.fireBullet([6, 0]);
    } 
  };

  GameView.prototype.bindKeyHandlers = function(){
    gameView = this;
    key('w', function(){ gameView.game.ship.fireBullet([0,-3]); });
    key('a', function(){ gameView.game.ship.fireBullet([-3,0]); });
    key('s', function(){ gameView.game.ship.fireBullet([0,3]); });
    key('d', function(){ gameView.game.ship.fireBullet([3,0]); });
    if(key.isPressed("M")) alert('M key is pressed, can ya believe it!?');
    if(key.isPressed(77)) alert('M key is pressed, can ya believe it!?');
  };

})();
