var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var platforms;
var map;
var ground;
var map;
var tileset;
var layer;
var player;
var jumperBot;
var turret;


function preload() {

	game.load.tilemap('level1', 'assets/cave_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tileset('tiles', 'assets/cave_tiles.png', 32, 39);

	game.load.spritesheet('player', 'assets/player.png', 182, 86);
	game.load.spritesheet('bottomBooster', 'assets/bottom-booster.png', 61, 44);
	game.load.spritesheet('sideBooster', 'assets/side-booster.png', 13, 20);
	game.load.image('playerBlast1', 'assets/player-blast-spark-normal.png');
	game.load.image('laser', 'assets/laser.png');
	game.load.image('playerBlasterEmitter', 'assets/player-blaster-emitter.png');

	game.load.spritesheet('jumperBot', 'assets/jumper-bot.png', 48, 120);

	game.load.image('turretCannon', 'assets/turret-cannon.png');
	game.load.image('turretJoint', 'assets/turret-joint.png');
	game.load.image('turret1Base', 'assets/turret1-base.png');

}

function create() {

	map = game.add.tilemap('level1');
	tileset = game.add.tileset('tiles');
	tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
	tileset.setCollision(6, false, false, false, false);
	layer = game.add.tilemapLayer(0,0,800,600,tileset,map,0);
	layer.resizeWorld();

	// PLAYER
	player = new Player((game.world.width / 2) - 250, (game.world.height / 2));
	
	// JUMPERBOT
	jumperBot = new JumperBot(Math.floor(Math.random() * game.width +1), Math.floor(Math.random() * game.height +1));

	// TURRET 1
	turret = new Turret(Math.floor(Math.random() * game.width +1), Math.floor(Math.random() * game.height +1));

}

function update() {

	player.update();
	turret.update();
	jumperBot.update();

}

