var jumperFireTime,
	jumperFire;


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

		sprite.jumperBullets = game.add.group();
		sprite.jumperBullets.createMultiple(10, 'laser');
		sprite.jumperFireTime = game.time.now + 200;

		sprite.fire = function() {

			console.log();

			var singleShot = this.jumperBullets.getFirstExists(false);

			if ( singleShot && game.time.now > this.jumperFireTime ) {

				if ( this.facing == 'left' ) {

					singleShot.reset(this.x, this.y);
					singleShot.body.velocity.x = jumperBulletSpeed * -1;

				} else if ( this.facing == 'right' ) {

					singleShot.reset(this.x, this.y);
					singleShot.body.velocity.x = jumperBulletSpeed;

				}

				this.jumperFireTime = game.time.now + 200;

			}

		}

	}

}

JumperBot.prototype = Object.create(Phaser.Group.prototype);
JumperBot.prototype.constructor = JumperBot;
JumperBot.prototype.update = function() {

	this.forEach(updateJumperBots, this, false);

}

JumperBot.prototype.fire = function(bot, dir) {

	console.log('fire!');

	var singleShot = bot.jumperBullets.getFirstExists(false);

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
function updateJumperBots(bot) {

	var playerPosX = player._sprite.body.x;
	var playerPosY = player._sprite.body.y;

	game.physics.collide(bot, layer);
	game.physics.overlap(bot, player.laser, jumperBotLaserShot);
	game.physics.collide(bot.jumperBullets, layer, layerShoot);
	game.physics.overlap(bot.jumperBullets, player._shield, jumperBulletShield);

	if ( playerPosX > bot.x ) {
		bot.facing = 'right';
	}

	if ( playerPosX < bot.x ) {
		bot.facing = 'left';
	}

	// JUMP
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

		bot.fire();

	}

}

function jumperBotLaserShot(bot, singleLaser) {

	player.laser.laserExplode(singleLaser, singleLaser.body.velocity.x);
	bot.kill();

}

function layerShoot(bullet, layer) {

	bullet.kill();

}

function jumperBulletShield(shield, bullet) {

	bullet.kill();

}