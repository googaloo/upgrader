function Menu() {
}

Menu.prototype = {

  preload: function() {

  	this.game.load.spritesheet('player', 'assets/player.png', 182, 86);

  },
  create: function() {

  	this.game.add.sprite(50, 50, 'player');

  }

};