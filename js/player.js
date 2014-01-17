var Player,
playerBlast,
fireButton,
blasterTime = 0,
laser,
playerCursors,
bottomBooster,
sideBooster;


Player = function(x,y) {

	// CURSORS
	playerCursors = game.input.keyboard.createCursorKeys();

	this._sprite = game.add.sprite(x, y, 'player');
	this._sprite.body
	this._sprite.body.collideWorldBounds = true;
	this._sprite.animations.add('right', [0], 10, false);
	this._sprite.animations.add('left', [1], 10, false);
	this._sprite.scale.x = 0.75;
	this._sprite.scale.y = 0.75;
	this._sprite.facing = Phaser.RIGHT;
	this._sprite.body.maxVelocity = 175;

	// BLASTER EMITTER
	this._blasterEmitter = game.add.emitter(this._sprite.x, this._sprite.y);
	this._blasterEmitter.makeParticles('playerBlasterEmitter');
	this._blasterEmitter.gravity = 10;
	this._blasterBurst = blasterBurst;

	function blasterBurst() {

		if ( player._facing == 'right' ) {
			player._blasterEmitter.x = player._sprite.x + (player._sprite.body.width);
			player._blasterEmitter.y = player._sprite.y + 60;	
			player._blasterEmitter.maxParticleSpeed.x = 2000;
			player._blasterEmitter.start(true, 300, null, 10);
		} else if ( player._facing == 'left' ) {
			player._blasterEmitter.x = player._sprite.x;
			player._blasterEmitter.y = player._sprite.y + 60;
			player._blasterEmitter.maxParticleSpeed.x = -2000;
			player._blasterEmitter.start(true, 300, null, 10);
		}

	}


	this._facing = 'right';

	game.camera.follow(this._sprite);

	// FIRING
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	fireButton.onDown.add(blasterBurst, this);

	playerBlast = game.add.sprite(this.x, this.y, 'playerBlast1');
	playerBlast.anchor.x = 0.5;
	playerBlast.anchor.y = 0.5;
	playerBlast.visible = false;

	laser = game.add.sprite(0, 0, 'laser');
	laser.anchor.y = 0.5;
	laser.visible = true;

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

}

Player.prototype.update = function() {

	game.physics.collide(this._sprite, layer);

	if ( playerCursors.up.isDown ) {

		this._sprite.body.velocity.y = -350;
		bottomBooster.animations.play('burn');

	} else if ( this._sprite.body.velocity.y <= 0 ) {

		this._sprite.body.velocity.y = this._sprite.body.velocity.y + 15;
		bottomBooster.animations.play('idle');
		if ( this._sprite.body.velocity.y >= 0 ) {
			this._sprite.body.velocity.y = 0;
		}

	}

	// PLAYER DOWN
	if ( playerCursors.down.isDown ) {

		this._sprite.body.velocity.y = 350;

	// Slow down
	} else if ( this._sprite.body.velocity.y >= 0 ) {

		this._sprite.body.velocity.y = this._sprite.body.velocity.y -15;

		if ( this._sprite.body.velocity.y <= 0 ) {
			this._sprite.body.velocity.y = 0;
		}

	}

	// PLAYER RIGHT
	if ( playerCursors.right.isDown ) {

		this._facing = 'right';
		this._sprite.body.velocity.x = 350;
		sideBooster.animations.play('burn');

		// Slow down
	} else if ( this._sprite.body.velocity.x >= 0 ) {

		this._sprite.body.velocity.x = this._sprite.body.velocity.x -15;
		sideBooster.animations.play('idle');

		if ( this._sprite.body.velocity.x <= 0 ) {
			this._sprite.body.velocity.x = 0;
		}

	}

	// PLAYER LEFT
	if ( playerCursors.left.isDown ) {

		this._facing = 'left';
		this._sprite.body.velocity.x = -350;
		sideBooster.animations.play('burn');

	} else if ( this._sprite.body.velocity.x <= 0 ) {

		this._sprite.body.velocity.x = this._sprite.body.velocity.x +15;
		sideBooster.animations.play('idle');

		if ( this._sprite.body.velocity.x >= 0 ) {
			this._sprite.body.velocity.x = 0;
		}
	}

	// PLAYER BLAST
	if ( fireButton.isDown ) {

		if ( game.time.now > blasterTime ) {

			this._blasterBurst();

			playerBlast.scale.x = 0.1;
			playerBlast.scale.y = 0.1;
			playerBlast.visible = true;

			if ( this._facing == 'right' ) {
				laser.x = this._sprite.x + (this._sprite.body.width - 30);
				laser.y = this._sprite.y + 60;	
			} else if ( this._facing == 'left' ) {
				laser.x = this._sprite.x;
				laser.y = this._sprite.y + 60;	
			}
			
			laser.visible = true;

			blasterTime = game.time.now + 200;

		}
	}

	if ( playerBlast.visible ) {

		if ( this._facing == 'right' ) {

			playerBlast.x = this._sprite.x + 135;
			playerBlast.y = this._sprite.y + 60;

		} else if ( this._facing == 'left' ) {

			playerBlast.x = this._sprite.x;
			playerBlast.y = this._sprite.y + 60;

		}

		playerBlast.scale.x += 0.1;
		playerBlast.scale.y += 0.1;

		if ( playerBlast.scale.x >= 1 ) {
			playerBlast.visible = false;
		}
	}


	if ( laser.visible ) {

		if ( this._facing == 'right' ) {
			laser.x = laser.x + 25;
		} else if ( this._facing == 'left' ) {
			laser.x = laser.x - 25;
		}

		if ( laser.x > game.world.width || laser.x < 0 ) {
			laser.visible = false;
		}

	}

	if ( this._facing == 'right' ) {

		this._sprite.animations.play('right');
		bottomBooster.x = this._sprite.x + 12;
		bottomBooster.y = this._sprite.y + 65;
		sideBooster.x = this._sprite.x - 9;
		sideBooster.y = this._sprite.y + 35;

	} else if ( this._facing == 'left' ) {

		this._sprite.animations.play('left');
		bottomBooster.x = this._sprite.x + 80;
		bottomBooster.y = this._sprite.y + 65;
		sideBooster.x = this._sprite.x + 100;
		sideBooster.y = this._sprite.y + 35;

	}

} // end update