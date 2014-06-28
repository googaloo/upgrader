var Player = function(game, x, y) {

	this.game = game;

	Phaser.Sprite.call(this, this.game, x, y, 'player');

	this.playerCursors = this.game.input.keyboard.createCursorKeys();

	this.body.collideWorldBounds = true;
	this.animations.add('right', [0], 10, false);
	this.animations.add('left', [1], 10, false);
	this.scale.x = 0.75;
	this.scale.y = 0.75;
	this.facing = Phaser.RIGHT;
	this.body.maxVelocity = 175;
	this.canMove = true; // For shield stop
	this.facing = 'right';
	this.game.camera.follow(this);
	this.game.camera.setBoundsToWorld();

	// SHIELD ////////////////////////////////////////////////////////////////////////////////
	shieldButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

	this.shieldOpen = false;
	this.shield = this.game.add.sprite(0, 0, 'playerShield');
	this.shield.scale.x = 0.1;
	this.shield.scale.y = 0.1;
	this.shield.anchor.x = 0.5;
	this.shield.anchor.y = 0.5;
	this.shield.visible = false;

	// BLASTER EMITTER
	this.blasterEmitter = this.game.add.emitter(this.x, this.y);
	this.blasterEmitter.makeParticles('playerBlasterEmitter');
	this.blasterEmitter.gravity = 10;
	this.blasterEmitter.bounce.x = 0.3;
	this.blasterEmitter.bounce.y = 0.3;
	//this.blasterBurst = blasterBurst;

	// LASER (x, y, type of laser (ie standard, rapid, continuious)) /////////////////////////
	this.laser = new Laser(this.game, 'laser');

	// FIRING ////////////////////////////////////////////////////////////////////////////////
	this.blasterTime = 0;
	fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	fireButton.onDown.add(this.blasterBurst, this);

	playerBlast = this.game.add.sprite(this.x, this.y, 'playerBlast1');
	playerBlast.anchor.x = 0.5;
	playerBlast.anchor.y = 0.5;
	playerBlast.visible = false;

	// BOTTOMBOOSTER ////////////////////////////////////////////////////////////////////////////////
	bottomBooster = this.game.add.sprite(0, 0, 'bottomBooster');
	bottomBooster.scale.x = 0.75;
	bottomBooster.scale.y = 0.75;
	bottomBooster.animations.add('burn', [1,2,3,4,5,6], 10, true);
	bottomBooster.animations.add('idle', [0]);

	// SIDEBOOSTER ////////////////////////////////////////////////////////////////////////////////
	sideBooster = this.game.add.sprite(0, 0, 'sideBooster');
	sideBooster.scale.x = 0.75;
	sideBooster.scale.y = 0.75;
	sideBooster.animations.add('burn', [1,2,3,4,5], 8, true);
	sideBooster.animations.add('idle', [0]);

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.blasterBurst = function blasterBurst() {

	if ( !this.shieldOpen ) {

		if ( this.facing == 'right' ) {
			this.blasterEmitter.x = this.x + (this.body.width);
			this.blasterEmitter.y = this.y + 60;	
			this.blasterEmitter.maxParticleSpeed.x = 300;
			this.blasterEmitter.start(true, 1000, null, 1);

		} else if ( this.facing == 'left' ) {
			this.blasterEmitter.x = this.x;
			this.blasterEmitter.y = this.y + 60;
			this.blasterEmitter.maxParticleSpeed.x = -300;
			this.blasterEmitter.start(true, 1000, null, 1);
		}

	}

}

Player.prototype.update = function() {

	this.game.physics.collide(this, layer);
	this.game.physics.collide(this._blasterEmitter, layer);
	this.laser.update();
	


///////////////////////////////////////////////////
	////////////// PLAYER MOVE //////////////
///////////////////////////////////////////////////

	if ( this.canMove ) {

		if ( this.playerCursors.up.isDown ) {

			this.body.velocity.y = -350;
			bottomBooster.animations.play('burn');

		} else if ( this.body.velocity.y <= 0 ) {

			this.body.velocity.y = this.body.velocity.y + 15;
			bottomBooster.animations.play('idle');
			if ( this.body.velocity.y >= 0 ) {
				this.body.velocity.y = 0;
			}

		}

		// PLAYER DOWN
		if ( this.playerCursors.down.isDown ) {

			this.body.velocity.y = 350;

		// Slow down
		} else if ( this.body.velocity.y >= 0 ) {

			this.body.velocity.y = this.body.velocity.y -15;

			if ( this.body.velocity.y <= 0 ) {
				this.body.velocity.y = 0;
			}

		}

		// PLAYER RIGHT
		if ( this.playerCursors.right.isDown ) {

			this.facing = 'right';
			this.body.velocity.x = 350;
			sideBooster.animations.play('burn');

			// Slow down
		} else if ( this.body.velocity.x >= 0 ) {

			this.body.velocity.x = this.body.velocity.x -15;
			sideBooster.animations.play('idle');

			if ( this.body.velocity.x <= 0 ) {
				this.body.velocity.x = 0;
			}

		}

		// PLAYER LEFT
		if ( this.playerCursors.left.isDown ) {

			this.facing = 'left';
			this.body.velocity.x = -350;
			sideBooster.animations.play('burn');

		} else if ( this.body.velocity.x <= 0 ) {

			this.body.velocity.x = this.body.velocity.x +15;
			sideBooster.animations.play('idle');

			if ( this.body.velocity.x >= 0 ) {
				this.body.velocity.x = 0;
			}
		}

	} else {

		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		sideBooster.animations.play('idle');
		bottomBooster.animations.play('idle');


	}


///////////////////////////////////////////////////
	////////////// PLAYER BLAST //////////////
///////////////////////////////////////////////////


	if ( fireButton.isDown ) {

		if ( this.game.time.now > this.blasterTime && !this.shieldOpen ) {

			this.blasterBurst();
			this.laser.fire();

			playerBlast.scale.x = 0.1;
			playerBlast.scale.y = 0.1;
			playerBlast.visible = true;

			this.blasterTime = this.game.time.now + 200;

		}
	}

	if ( playerBlast.visible ) {

		if ( this.facing == 'right' ) {

			playerBlast.x = this.x + 135;
			playerBlast.y = this.y + 60;

		} else if ( this.facing == 'left' ) {

			playerBlast.x = this.x;
			playerBlast.y = this.y + 60;

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

		this.canMove = false;

		if ( !this.shieldOpen ) {

			this.shield.x = this.x + (this.width / 2);
			this.shield.y = this.y + (this.height / 2);
			this.shield.visible = true;

			if ( this.shield.scale.x < 0.75 ) {

				this.shield.scale.x = this.shield.scale.x + 0.1;
				this.shield.scale.y = this.shield.scale.y + 0.1;

			} else {

				this.shieldOpen = true;	

			}

		}

	} if ( shieldButton.isUp ) {

		if ( this.shieldOpen ) {

			if ( this.shield.scale.x > 0.1 ) {

				this.shield.scale.x = this.shield.scale.x - 0.1;
				this.shield.scale.y = this.shield.scale.y - 0.1;

			} else {

				this.shield.visible = false;
				this.shieldOpen = false;	
				this.canMove = true;

			}

		} else {

			this.shield.visible = false;
			this.shield.scale.x = 0.1;
			this.shield.scale.y = 0.1;

		}

	}

///////////////////////////////////////////////////
	////////////// PLAYER BOOSTERS ///////////
///////////////////////////////////////////////////

	if ( this.facing == 'right' ) {

		this.animations.play('right');
		bottomBooster.x = this.x + 12;
		bottomBooster.y = this.y + 65;
		sideBooster.x = this.x - 9;
		sideBooster.y = this.y + 35;

	} else if ( this.facing == 'left' ) {

		this.animations.play('left');
		bottomBooster.x = this.x + 80;
		bottomBooster.y = this.y + 65;
		sideBooster.x = this.x + 100;
		sideBooster.y = this.y + 35;

	}

} // end update