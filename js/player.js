var Player,
playerBlast,
fireButton,
blasterTime = 0,
playerCursors,
bottomBooster,
sideBooster,
shieldButton,
shieldOpen = false;


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
	this._canMove = true; // For shield stop
	this._facing = 'right';
	game.camera.follow(this._sprite);

	// BLASTER EMITTER
	this._blasterEmitter = game.add.emitter(this._sprite.x, this._sprite.y);
	this._blasterEmitter.makeParticles('playerBlasterEmitter');
	this._blasterEmitter.gravity = 10;
	this._blasterEmitter.bounce.x = 0.3;
	this._blasterEmitter.bounce.y = 0.3;
	this._blasterBurst = blasterBurst;

	function blasterBurst() {

		if ( !shieldOpen ) {

			if ( player._facing == 'right' ) {
				player._blasterEmitter.x = player._sprite.x + (player._sprite.body.width);
				player._blasterEmitter.y = player._sprite.y + 60;	
				player._blasterEmitter.maxParticleSpeed.x = 300;
				player._blasterEmitter.start(true, 1000, null, 1);

			} else if ( player._facing == 'left' ) {
				player._blasterEmitter.x = player._sprite.x;
				player._blasterEmitter.y = player._sprite.y + 60;
				player._blasterEmitter.maxParticleSpeed.x = -300;
				player._blasterEmitter.start(true, 1000, null, 1);
			}

		}

	}

	// LASER (x, y, type of laser (ie standard, rapid, continuious)) /////////////////////////
	this._laser = new Laser(0, 0, 'standard');

	// SHIELD ////////////////////////////////////////////////////////////////////////////////
	shieldButton = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

	this._shield = game.add.sprite(this._sprite.x, this._sprite.y, 'playerShield');
	this._shield.scale.x = 0.1;
	this._shield.scale.y = 0.1;
	this._shield.anchor.x = 0.5;
	this._shield.anchor.y = 0.5;
	this._shield.visible = false;

	// FIRING ////////////////////////////////////////////////////////////////////////////////
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	fireButton.onDown.add(blasterBurst, this);

	playerBlast = game.add.sprite(this.x, this.y, 'playerBlast1');
	playerBlast.anchor.x = 0.5;
	playerBlast.anchor.y = 0.5;
	playerBlast.visible = false;

	// BOTTOMBOOSTER ////////////////////////////////////////////////////////////////////////////////
	bottomBooster = game.add.sprite(0, 0, 'bottomBooster');
	bottomBooster.scale.x = 0.75;
	bottomBooster.scale.y = 0.75;
	bottomBooster.animations.add('burn', [1,2,3,4,5,6], 10, true);
	bottomBooster.animations.add('idle', [0]);

	// SIDEBOOSTER ////////////////////////////////////////////////////////////////////////////////
	sideBooster = game.add.sprite(0, 0, 'sideBooster');
	sideBooster.scale.x = 0.75;
	sideBooster.scale.y = 0.75;
	sideBooster.animations.add('burn', [1,2,3,4,5], 8, true);
	sideBooster.animations.add('idle', [0]);

}

Player.prototype.update = function() {

	game.physics.collide(this._sprite, layer);
	game.physics.collide(this._blasterEmitter, layer);
	this._laser.update();
	


///////////////////////////////////////////////////
	////////////// PLAYER MOVE //////////////
///////////////////////////////////////////////////

	if ( player._canMove ) {

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

	} else {

		this._sprite.body.velocity.x = 0;
		this._sprite.body.velocity.y = 0;
		sideBooster.animations.play('idle');
		bottomBooster.animations.play('idle');


	}


///////////////////////////////////////////////////
	////////////// PLAYER BLAST //////////////
///////////////////////////////////////////////////


	if ( fireButton.isDown ) {

		if ( game.time.now > blasterTime && !shieldOpen ) {

			this._blasterBurst();
			this._laser._fire();

			playerBlast.scale.x = 0.1;
			playerBlast.scale.y = 0.1;
			playerBlast.visible = true;

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

///////////////////////////////////////////////////
	////////////// PLAYER SHIELD //////////////
///////////////////////////////////////////////////

	if ( shieldButton.isDown ) {

		player._canMove = false;

		if ( !shieldOpen ) {

			console.log('uhh');
			//player._shield.x = player._sprite.body.width - (player._sprite.body.width / 2);
			player._shield.x = player._sprite.x + (player._sprite.width / 2);
			player._shield.y = player._sprite.y + (player._sprite.height / 2);
			player._shield.visible = true;

			if ( player._shield.scale.x < 0.75 ) {

				player._shield.scale.x = player._shield.scale.x + 0.1;
				player._shield.scale.y = player._shield.scale.y + 0.1;

			} else {

				shieldOpen = true;	

			}

		}

	} if ( shieldButton.isUp ) {

		if ( shieldOpen ) {

			if ( player._shield.scale.x > 0.1 ) {

				player._shield.scale.x = player._shield.scale.x - 0.1;
				player._shield.scale.y = player._shield.scale.y - 0.1;

			} else {

				player._shield.visible = false;
				shieldOpen = false;	
				player._canMove = true;

			}

		} else {

			player._shield.visible = false;
			player._shield.scale.x = 0.1;
			player._shield.scale.y = 0.1;

		}

	}

///////////////////////////////////////////////////
	////////////// PLAYER BOOSTERS ///////////
///////////////////////////////////////////////////

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