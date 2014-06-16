var jumperFireTime;

JumperBot = function(game, image, num_bots) {

	Phaser.Group.call(this, game);

	for ( var i = 0; i < num_bots; i++ ) {

        var sprite = this.create(game.world.randomX, game.world.randomY, image);
        sprite.body.collideWorldBounds = true;
		sprite.animations.add('jump-left', [3,1,2,0], 12, false);
		sprite.animations.add('jump-right', [4,6,5,7], 12, false);
		sprite.animations.add('idle', [1], 10, false);
		sprite.body.gravity.y = 10;
		sprite.facing = 'right';

	}

	this.jumperBullets = game.add.group();
	this.jumperBullets.createMultiple(10, 'laser');

	jumperFireTime = game.time.now + 200

}

JumperBot.prototype = Object.create(Phaser.Group.prototype);
JumperBot.prototype.constructor = JumperBot;
JumperBot.prototype.update = function() {

	this.forEach(updateBots, this, false);

}

JumperBot.prototype.fire = function(bot, dir) {

	var singleShot = jumperBotGroup.jumperBullets.getFirstExists(false);

	if ( singleShot && game.time.now > jumperFireTime ) {

		if ( dir == 'left' ) {

			singleShot.reset(bot.x, bot.y);
			singleShot.body.velocity.x = jumperBulletSpeed * -1;

		} else if ( dir == 'right' ) {

			singleShot.reset(bot.x, bot.y);
			singleShot.body.velocity.x = jumperBulletSpeed;

		}

		jumperFireTime = game.time.now + 200;

	}

}

// Update for each JumperBot
function updateBots(bot) {

	var playerPosX = player._sprite.body.x;
	var playerPosY = player._sprite.body.y;

	game.physics.collide(bot, layer);
	game.physics.overlap(bot, player.laser, jumperBotLaserShot);
	game.physics.collide(jumperBotGroup.jumperBullets, layer, layerShoot);

	if ( playerPosX > bot.x ) {
		bot.facing = 'right';
	}

	if ( playerPosX < bot.x ) {
		bot.facing = 'left';
	}

	// JUMP AND FIRE
	if ( bot.body.touching.down ) {

		if ( bot.facing == 'left' ) {

			bot.animations.play('jump-left');
			bot.body.velocity.y = -375;
			bot.body.velocity.x = -150;

		} else if ( bot.facing == 'right' ) {

			bot.animations.play('jump-right');
			bot.body.velocity.y = -375;
			bot.body.velocity.x = 150;

		}

	}

	// Check if Jumper is between 20 and -20 Y of the player
	var playerBotYdiff = playerPosY - bot.y;
	if ( playerBotYdiff < 20 && playerBotYdiff > -20 && bot.exists ) {

		jumperBotGroup.fire(bot, bot.facing);
		jumperFireTime = game.time.now + 200;

	}

}

function jumperBotLaserShot(bot, singleLaser) {

	player.laser.laserExplode(singleLaser, singleLaser.body.velocity.x);
	bot.kill();

}

function layerShoot(bullet, layer) {

	bullet.kill();

}