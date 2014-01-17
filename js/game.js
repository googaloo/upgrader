var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var bottomBooster;
var platforms;
var map;
var jumperBot;
var ground;
var map;
var tileset;
var layer;
var player;
var turret;
var jumperFacing = 'right';


function preload() {

	game.load.tilemap('level1', 'assets/cave_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tileset('tiles', 'assets/cave_tiles.png', 32, 39);

	game.load.spritesheet('player', 'assets/player.png', 182, 86);
	game.load.spritesheet('bottomBooster', 'assets/bottom-booster.png', 61, 44);
	game.load.spritesheet('sideBooster', 'assets/side-booster.png', 13, 20);
	game.load.image('playerBlast1', 'assets/player-blast-spark-normal.png');
	game.load.image('laser', 'assets/laser.png');

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
	jumperBot = game.add.sprite(Math.floor(Math.random() * game.width +1), Math.floor(Math.random() * game.height +1), 'jumperBot');
	jumperBot.body.collideWorldBounds = true;
	jumperBot.animations.add('jump-left', [3,1,2,0], 12, false);
	jumperBot.animations.add('jump-right', [4,6,5,7], 12, false);
	jumperBot.animations.add('idle', [1], 10, false);
	jumperBot.body.gravity.y = 10;

	// TURRET 1
	turret = new Turret(Math.floor(Math.random() * game.width +1), Math.floor(Math.random() * game.height +1));

}

function update() {

	player.update();
	turret.update();

	game.physics.collide(jumperBot, layer);

	if ( jumperBot.body.touching.left ) {
		jumperFacing = 'right';
	}

	if ( jumperBot.body.touching.right ) {
		jumperFacing = 'left';
		console.log('touched right');
	}

	// JUMPERBOT JUMP
	if ( jumperBot.body.touching.down ) {

		if ( jumperFacing == 'left' ) {

			jumperBot.animations.play('jump-left');
			jumperBot.body.velocity.y = -375;
			jumperBot.body.velocity.x = -150;

		} else if ( jumperFacing == 'right' ) {

			jumperBot.animations.play('jump-right');
			jumperBot.body.velocity.y = -375;
			jumperBot.body.velocity.x = 150;

		}
	}

}