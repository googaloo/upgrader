var JumperBot;

JumperBot = function(x,y) {

	this._sprite = game.add.sprite(x, y, 'jumperBot');
	this._sprite.body.collideWorldBounds = true;
	this._sprite.animations.add('jump-left', [3,1,2,0], 12, false);
	this._sprite.animations.add('jump-right', [4,6,5,7], 12, false);
	this._sprite.animations.add('idle', [1], 10, false);
	this._sprite.body.gravity.y = 10;

	this._facing = 'right';

}

JumperBot.prototype.update = function() {

	game.physics.collide(this._sprite, layer);

	if ( this._sprite.body.touching.left ) {
		this._facing = 'right';
	}

	if ( this._sprite.body.touching.right ) {
		this._facing = 'left';
	}

	// JUMP
	if ( this._sprite.body.touching.down ) {

		if ( this._facing == 'left' ) {

			this._sprite.animations.play('jump-left');
			this._sprite.body.velocity.y = -375;
			this._sprite.body.velocity.x = -150;

		} else if ( this._facing == 'right' ) {

			this._sprite.animations.play('jump-right');
			this._sprite.body.velocity.y = -375;
			this._sprite.body.velocity.x = 150;

		}
	}

}