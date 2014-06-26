NinjaBot = function(game, image, num_bots) {

	Phaser.Group.call(this, game);

	for ( var i = 0; i < num_bots; i++ ) {

        var sprite = this.create(game.world.randomX, game.world.randomY, image);
        sprite.body.collideWorldBounds = true;
		sprite.animations.add('float-left', [0,2], 12, true);
		sprite.animations.add('float-right', [1,3], 12, true);
		sprite.animations.add('idle', [0], 10, false);
		sprite.animations.play('idle');
		//sprite.body.gravity.y = 10;
		sprite.facing = 'right';

		// sprite.jumperBullets = game.add.group();
		// sprite.jumperBullets.createMultiple(10, 'laser');
		// sprite.jumperFireTime = game.time.now + 200;

		// sprite.fire = function() {

		// 	console.log();

		// 	var singleShot = this.jumperBullets.getFirstExists(false);

		// 	if ( singleShot && game.time.now > this.jumperFireTime ) {

		// 		if ( this.facing == 'left' ) {

		// 			singleShot.reset(this.x, this.y);
		// 			singleShot.body.velocity.x = jumperBulletSpeed * -1;

		// 		} else if ( this.facing == 'right' ) {

		// 			singleShot.reset(this.x, this.y);
		// 			singleShot.body.velocity.x = jumperBulletSpeed;

		// 		}

		// 		this.jumperFireTime = game.time.now + 200;

		// 	}

		// }

	}

}

NinjaBot.prototype = Object.create(Phaser.Group.prototype);
NinjaBot.prototype.constructor = NinjaBot;
NinjaBot.prototype.update = function() {

	this.forEach(updateNinjaBots, this, false);

}

// NinjaBot.prototype.fire = function(bot, dir) {

// 	console.log('fire!');

// 	var singleShot = bot.jumperBullets.getFirstExists(false);

// 	if ( singleShot && game.time.now > jumperFireTime ) {

// 		if ( dir == 'left' ) {

// 			singleShot.reset(bot.x, bot.y);
// 			singleShot.body.velocity.x = jumperBulletSpeed * -1;

// 		} else if ( dir == 'right' ) {

// 			singleShot.reset(bot.x, bot.y);
// 			singleShot.body.velocity.x = jumperBulletSpeed;

// 		}

// 		jumperFireTime = game.time.now + 200;

// 	}

// }

// Update for each NinjaBot
function updateNinjaBots(bot) {

	var playerPosX = player._sprite.body.x;
	var playerPosY = player._sprite.body.y;

	game.physics.collide(bot, layer);
	game.physics.collide(bot, ninjaBotGroup);
	game.physics.collide(bot, jumperBotGroup);
	// game.physics.overlap(bot, player.laser, jumperBotLaserShot);
	// game.physics.collide(bot.jumperBullets, layer, layerShoot);
	// game.physics.overlap(bot.jumperBullets, player._shield, jumperBulletShield);

	if ( playerPosX > bot.x ) {

		bot.facing = 'right';
		bot.body.velocity.x = 150;
	}

	if ( playerPosX < bot.x ) {

		bot.facing = 'left';
		bot.body.velocity.x = -150;
	}

	if ( playerPosY > bot.y ) {

		//bot.facing = 'left';
		bot.body.velocity.y = 150;
	}

	if ( playerPosY < bot.y ) {

		//bot.facing = 'left';
		bot.body.velocity.y = -150;
	}

	// Facing Animations
	if ( bot.facing == 'left' ) {

		bot.animations.play('float-left');	

	} else if ( bot.facing == 'right' ) {

		bot.animations.play('float-right');

	}

	// Dissappear as they come close to Player
	var playerBotYdiff = playerPosY - bot.y;
	var playerBotXdiff = playerPosX - bot.x;

	if ( playerBotYdiff < 250 && playerBotYdiff > -250 && bot.exists && playerBotXdiff < 250 && playerBotXdiff > -250 ) {

		if ( bot.alpha > 0 ) {
			bot.alpha -= 0.1;
		}

	} else {

		if ( bot.alpha < 1 ) {
			bot.alpha += 0.1;
		}

	}
	

	// JUMP
	//if ( bot.body.touching.down ) {

		// if ( bot.facing == 'left' ) {

		// 	bot.animations.play('float-left');
		// 	bot.body.velocity.y = -375;
		// 	bot.body.velocity.x = -150;

		// } else if ( bot.facing == 'right' ) {

		// 	bot.animations.play('float-right');
		// 	bot.body.velocity.y = -375;
		// 	bot.body.velocity.x = 150;

		// }

	//}

// 	// Check if Jumper is between 20 and -20 Y of the player
// 	var playerBotYdiff = playerPosY - bot.y;
// 	if ( playerBotYdiff < 20 && playerBotYdiff > -20 && bot.exists ) {

// 		bot.fire();

// 	}

// }

// function jumperBotLaserShot(bot, singleLaser) {

// 	player.laser.laserExplode(singleLaser, singleLaser.body.velocity.x);
// 	bot.kill();

// }

// function layerShoot(bullet, layer) {

// 	bullet.kill();

// }

// function jumperBulletShield(shield, bullet) {

// 	bullet.kill();

}