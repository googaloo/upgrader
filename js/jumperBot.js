var JumperBot = function(game, image, num_bots) {

	this.game = game;

	Phaser.Group.call(this, this.game, 0, 0, 'jumperBot');

	for ( var i = 0; i < num_bots; i++ ) {

		sprite = this.create(this.game.world.randomX, this.game.world.randomY, image);

        sprite.body.collideWorldBounds = true;
		sprite.animations.add('jump-left', [3,1,2,0], 12, false);
		sprite.animations.add('jump-right', [4,6,5,7], 12, false);
		sprite.animations.add('idle', [1], 10, false);
		sprite.body.gravity.y = 10;
		sprite.facing = 'right';

		sprite.jumperBullets = this.game.add.group();
		sprite.jumperBullets.createMultiple(10, 'laser');
		sprite.jumperFireTime = this.game.time.now + 200;

		sprite.fire = function() {

			var singleShot = sprite.jumperBullets.getFirstExists(false);

			if ( singleShot && this.game.time.now > sprite.jumperFireTime ) {

				if ( sprite.facing == 'left' ) {

					singleShot.reset(sprite.x, sprite.y);
					singleShot.body.velocity.x = jumperBulletSpeed * -1;

				} else if ( sprite.facing == 'right' ) {

					singleShot.reset(sprite.x, sprite.y);
					singleShot.body.velocity.x = jumperBulletSpeed;

				}

				sprite.jumperFireTime = this.game.time.now + 200;

			}

		}

	}

}

JumperBot.prototype = Object.create(Phaser.Group.prototype);
JumperBot.prototype.constructor = JumperBot;

JumperBot.prototype.update = function() {

	this.forEach(updateJumperBots, this, false, 'poop');

}

// Update for each JumperBot
function updateJumperBots(bot, poo) {

	console.log(bot);

	var playerPosX = player.body.x;
	var playerPosY = player.body.y;

	this.game.physics.collide(bot, layer);
	this.game.physics.overlap(bot, player.laser, jumperBotLaserShot);
	this.game.physics.collide(bot.jumperBullets, layer, layerShoot);
	this.game.physics.overlap(bot.jumperBullets, player.shield, jumperBulletShield);

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