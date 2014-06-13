JumperBot = function(game, image) {

	Phaser.Group.call(this, game);

	for ( var i = 0; i < 5; i++ ) {

        var sprite = this.create(game.world.randomX, game.world.randomY, image);
        sprite.body.collideWorldBounds = true;
		sprite.animations.add('jump-left', [3,1,2,0], 12, false);
		sprite.animations.add('jump-right', [4,6,5,7], 12, false);
		sprite.animations.add('idle', [1], 10, false);
		sprite.body.gravity.y = 10;
		sprite.facing = 'right';

	}

}

JumperBot.prototype = Object.create(Phaser.Group.prototype);
JumperBot.prototype.constructor = JumperBot;
JumperBot.prototype.update = function() {

	this.forEach(updateBots, this, false);

}

JumperBot.prototype.jumpDestroy = function(bot, laser) {

	bot.kill();
}

function updateBots(bot) {

	game.physics.collide(bot, layer);
	game.physics.collide(bot, player.laser, this.jumpDestroy);

	if ( bot.body.touching.left ) {
		bot.facing = 'right';
	}

	if ( bot.body.touching.right ) {
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

}