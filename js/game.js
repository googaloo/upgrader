var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var bottomBooster;
var cursors;
var platforms;
var map;
var jumperBot;
var ground;
var map;
var tileset;
var layer;
var player;
var turret1Base;
var turretJoint;
var turretCanon;
var playerFacing = 'right';
var jumperFacing = 'right';
var turretDirection = 'right';

function preload() {

	game.load.spritesheet('player', 'assets/player.png', 182, 86);
	game.load.spritesheet('bottomBooster', 'assets/bottom-booster.png', 61, 44);
	game.load.spritesheet('sideBooster', 'assets/side-booster.png', 13, 20);
	game.load.spritesheet('jumperBot', 'assets/jumper-bot.png', 48, 120);
	game.load.tilemap('level1', 'assets/cave_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tileset('tiles', 'assets/cave_tiles.png', 32, 39);
	game.load.image('turretCanon', 'assets/turret-canon.png');
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
	player = game.add.sprite((game.world.width / 2) - 250, (game.world.height / 2), 'player');
	player.body.collideWorldBounds = true;
	player.animations.add('right', [0], 10, false);
	player.animations.add('left', [1], 10, false);
	player.scale.x = 0.75;
	player.scale.y = 0.75;
	player.facing = Phaser.RIGHT;
	player.body.maxVelocity = 175;

	game.camera.follow(player);

	// CURSORS
	cursors = game.input.keyboard.createCursorKeys();

	// JUMPERBOT
	jumperBot = game.add.sprite(Math.floor(Math.random() * game.width +1), Math.floor(Math.random() * game.height +1), 'jumperBot');
	jumperBot.body.collideWorldBounds = true;
	jumperBot.animations.add('jump-left', [3,1,2,0], 9, false);
	jumperBot.animations.add('jump-right', [4,6,5,7], 9, false);
	jumperBot.animations.add('idle', [1], 10, false);
	jumperBot.body.gravity.y = 10;

	// BOTTOMBOOSTER
	bottomBooster = game.add.sprite(0, 0, 'bottomBooster');
	bottomBooster.scale.x = 0.75;
	bottomBooster.scale.y = 0.75;
	bottomBooster.animations.add('burn', [1,2,3,4,5,6], 10, true);
	bottomBooster.animations.add('idle', [0]);

	// SIDEBOOSTER
	sideBooster = game.add.sprite(0, 0, 'sideBooster');
	sideBooster.scale.x = 0.75;
	sideBooster.scale.y = 0.75;
	sideBooster.animations.add('burn', [1,2,3,4,5], 8, true);
	sideBooster.animations.add('idle', [0]);

	// TURRET 1
	turret1Base = game.add.sprite(Math.floor(Math.random() * game.width +1), Math.floor(Math.random() * game.height +1), 'turret1Base');
	turretCanon = game.add.sprite(0, 0, 'turretCanon');
	turretCanon.anchor.x = 0.5;
	turretCanon.anchor.y = 1;
	turretJoint = game.add.sprite(0, 0, 'turretJoint');
	turretJoint.x = (turret1Base.x + (turret1Base.width / 2)) - (turretJoint.width / 2);
	turretJoint.y = turret1Base.y + 10;
	turretCanon.x = turretJoint.x + (turretJoint.width / 2);
	turretCanon.y = turretJoint.y + (turretJoint.height / 2);
	turret1Base.body.gravity.y = 10;
}

function update() {

	game.physics.collide(jumperBot, layer);
	game.physics.collide(player, layer);
	game.physics.collide(turret1Base, layer);

	turretJoint.x = (turret1Base.x + (turret1Base.width / 2)) - (turretJoint.width / 2);
	turretJoint.y = turret1Base.y + 10;
	turretCanon.x = turretJoint.x + (turretJoint.width / 2);
	turretCanon.y = turretJoint.y + (turretJoint.height / 2);

	// PLAYER UP
	if ( cursors.up.isDown ) {

		player.body.velocity.y = -350;
		bottomBooster.animations.play('burn');

	} else if ( player.body.velocity.y <= 0 ) {

		player.body.velocity.y = player.body.velocity.y + 15;
		bottomBooster.animations.play('idle');
		if ( player.body.velocity.y >= 0 ) {
			player.body.velocity.y = 0;
		}

	}

	// PLAYER DOWN
	if ( cursors.down.isDown ) {

		player.body.velocity.y = 350;

	// Slow down
	} else if ( player.body.velocity.y >= 0 ) {

		player.body.velocity.y = player.body.velocity.y -15;

		if ( player.body.velocity.y <= 0 ) {
			player.body.velocity.y = 0;
		}

	}

	// PLAYER RIGHT
	if ( cursors.right.isDown ) {

		playerFacing = 'right';
		player.body.velocity.x = 350;
		sideBooster.animations.play('burn');

		// Slow down
	} else if ( player.body.velocity.x >= 0 ) {

		player.body.velocity.x = player.body.velocity.x -15;
		sideBooster.animations.play('idle');

		if ( player.body.velocity.x <= 0 ) {
			player.body.velocity.x = 0;
		}

	}

	// PLAYER LEFT
	if ( cursors.left.isDown ) {

		playerFacing = 'left';
		player.body.velocity.x = -350;
		sideBooster.animations.play('burn');

	} else if ( player.body.velocity.x <= 0 ) {

		player.body.velocity.x = player.body.velocity.x +15;
		sideBooster.animations.play('idle');

		if ( player.body.velocity.x >= 0 ) {
			player.body.velocity.x = 0;
		}
	}

	if ( playerFacing == 'right' ) {

		player.animations.play('right');
		bottomBooster.x = player.x + 12;
		bottomBooster.y = player.y + 65;
		sideBooster.x = player.x - 9;
		sideBooster.y = player.y + 35;

	} else if ( playerFacing == 'left' ) {

		player.animations.play('left');
		bottomBooster.x = player.x + 80;
		bottomBooster.y = player.y + 65;
		sideBooster.x = player.x + 100;
		sideBooster.y = player.y + 35;

	}

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

	if ( turretCanon.angle >= 65 ) {
		turretDirection = 'left';
	}

	if ( turretCanon.angle <= -65 ) {
		turretDirection = 'right';
	}

	if ( turretDirection == 'right' ) {
		turretCanon.angle = turretCanon.angle + 2;
	}

	if ( turretDirection == 'left' ) {
		turretCanon.angle = turretCanon.angle - 2;
	}

}

function randomMapPosX() {
	var random = Math.floor(Math.random() * game.width +1);
	return random;
}

function randomMapPosY() {
	var random = Math.floor(Math.random() * game.height +1);
	return random;
}