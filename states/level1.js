var platforms;
var map;
var ground;
var map;
var tileset;
var layer;
var player;
var jumperBotGroup;
var ninjaBotGroup;
var turret;

function Level1(game) {
	this.game = game;
}

Level1.prototype = {

  preload: function() {

	this.game.load.tilemap('level1', 'assets/cave_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.tileset('tiles', 'assets/cave_tiles.png', 32, 39);

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

	// MAP
	map = this.game.add.tilemap('level1');
	tileset = this.game.add.tileset('tiles');
	tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
	tileset.setCollision(6, false, false, false, false);
	layer = this.game.add.tilemapLayer(0,0,800,600,tileset,map,0);
	layer.resizeWorld();

	// PLAYER
	player = new Player(this.game, (this.game.world.width / 2) - 250, (this.game.world.height / 2));
	this.game.add.existing(player);

	// JumperBots
	jumperBotGroup = new JumperBot(this.game, 'jumperBot', 2);
	//this.game.add.existing(jumperBotGroup);

	// // NinjaBots
	// ninjaBotGroup = new NinjaBot(this.game, 'ninjaBot', 2);

	// // TURRET 1
	// turret = new Turret(Math.floor(Math.random() * this.game.width +1), Math.floor(Math.random() * this.game.height +1));

  },

  update: function() {

	//player.update();
	// turret.update();
	jumperBotGroup.update();
	// ninjaBotGroup.update();

  }

};