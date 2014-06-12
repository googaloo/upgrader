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

	this.forEach(updateBots, this, false, this.sprite);

}

JumperBot.prototype.jumpDestroy = function jumperDestroy(jumpsBot, laser, context) {
	laserExplode(laser, jumpsBot, context);
	jumpsBot.destroy();
	laser.kill();
	console.log(game);
}

function updateBots(jumperBot) {

	game.physics.collide(jumperBot, layer);

	if ( jumperBot.body.touching.left ) {
		jumperBot.facing = 'right';
	}

	if ( jumperBot.body.touching.right ) {
		jumperBot.facing = 'left';
	}

	// JUMP
	if ( jumperBot.body.touching.down ) {

		if ( jumperBot.facing == 'left' ) {

			jumperBot.animations.play('jump-left');
			jumperBot.body.velocity.y = -375;
			jumperBot.body.velocity.x = -150;

		} else if ( jumperBot.facing == 'right' ) {

			jumperBot.animations.play('jump-right');
			jumperBot.body.velocity.y = -375;
			jumperBot.body.velocity.x = 150;

		}
		
	}

}