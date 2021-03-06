var map;
var layer;
var player;
var jumperBotGroup;
var ninjaBotGroup;
var turret;

function Level1(game) {
	this.game = game;
	var map;
}

Level1.prototype = {

  preload: function() {

	this.game.load.tilemap('level1', 'assets/cave_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.image('cave-level-1', 'assets/cave_tiles.png');
	//this.game.load.image('tiles', 'assets/cave_tiles.png');
	//this.game.load.tileset('tiles', 'assets/cave_tiles.png', 32, 39);

	this.game.load.spritesheet('player', 'assets/player.png', 182, 86);
	this.game.load.spritesheet('bottomBooster', 'assets/bottom-booster.png', 61, 44);
	this.game.load.spritesheet('sideBooster', 'assets/side-booster.png', 13, 20);
	this.game.load.image('playerBlast1', 'assets/player-blast-spark-normal.png');
	this.game.load.image('laser', 'assets/laser.png');
	this.game.load.image('playerBlasterEmitter', 'assets/player-blaster-emitter.png');
	this.game.load.image('playerShield', 'assets/player-shield.png');

	this.game.load.spritesheet('jumperBot', 'assets/jumper-bot.png', 48, 120);

	this.game.load.spritesheet('ninjaBot', 'http://localhost:8888/upgrader/assets/ninja-bot.png', 62, 54);

	this.game.load.image('turretCannon', 'assets/turret-cannon.png');
	this.game.load.image('turretJoint', 'assets/turret-joint.png');
	this.game.load.image('turret1Base', 'assets/turret1-base.png');

  },

  create: function() {

  	
  	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	// MAP
	map = this.game.add.tilemap('level1'); // From key of loaded JSON
	map.addTilesetImage('cave-level-1'); // From the JSON (Tiled) and loaded image
	

	layer = map.createLayer('Level 1 Layer'); // From the JSON (Tiled)
	map.setCollisionBetween(1, 6);
	layer.resizeWorld();
	this.game.physics.arcade.enable(map);
	this.game.physics.setBoundsToWorld();
	//map = this.game.add.tileSprite(0, 0, 640, 480, 'tiles');
	//tileset = this.game.add.tileset('tiles');
	//map.addTileSetImage('level1', 'tiles');
	// map.setCollisionRange(0, map.total - 1, true, true, true, true);
	// map.setCollision(6, false, false, false, false);
	// this.layer = map.createLayer('Tile Layer 1');
	// this.layer.resizeWorld();

	// PLAYER
	player = new Player(this.game, (this.game.world.width / 2) - 250, (this.game.world.height / 2));
	this.game.add.existing(player);
	player.body.collideWorldBounds = true;

	// JumperBots
	jumperBotGroup = new JumperBot(this.game, 'jumperBot', 5);
	this.game.add.existing(jumperBotGroup);

	// // NinjaBots
	// ninjaBotGroup = new NinjaBot(this.game, 'ninjaBot', 2);

	// // TURRET 1
	// turret = new Turret(Math.floor(Math.random() * this.game.width +1), Math.floor(Math.random() * this.game.height +1));

  },

  update: function() {


  	this.game.camera.focusOnXY(player.x, player.y);
	// player.update();
	// turret.update();
	// jumperBotGroup.update();
	// ninjaBotGroup.update();

  }

};