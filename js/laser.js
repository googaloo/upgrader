Laser = function(game, image) {

	this.game = game;

	Phaser.Group.call(this, this.game);

	this.game.physics.enable(this, Phaser.Physics.ARCADE);

	this.enableBody = true;

	this.createMultiple(10, image);
	this.setAll('anchor.y', 0.5);
	this.setAll('outofBoundsKill', true);

	// LASER EXPLOSION ON COLLIDE
	this.laserEmitter = this.game.add.emitter(this.x, this.y);
	this.laserEmitter.makeParticles('playerBlasterEmitter');
	this.laserEmitter.gravity = 10;
	this.laserEmitter.bounce = 20;
	this.laserEmitter.bounce.x = 0.3;
	this.laserEmitter.bounce.y = 0.3;

}

Laser.prototype = Object.create(Phaser.Group.prototype);
Laser.prototype.constructor = Laser;	

Laser.prototype.fire = function() {

	var singleLaser = this.getFirstExists(false);

	if ( singleLaser ) {

		if ( player.facing == 'right' ) {
			singleLaser.reset(player.body.x + (player.body.width - 30), player.body.y + 60);
			singleLaser.body.velocity.x = 2000;
		} else if ( player.facing == 'left' ) {
			singleLaser.reset(player.body.x, player.body.y + 60);
			singleLaser.body.velocity.x = -2000;
		}

	}

}

Laser.prototype.update = function() {

	this.forEach(updateLasers, this, false);

} // end update

Laser.prototype.laserExplode = function(laser, laserV) {

	if ( laserV !== null ) {
		laserVelocity = laserV;
	} else {
		laserVelocity = laser.body.velocity.x
	}

	if ( laserVelocity > 0 ) {
		player.laser.laserEmitter.x = laser.body.x + (laser.body.width );
		player.laser.laserEmitter.y = laser.body.y;
		player.laser.laserEmitter.maxParticleSpeed.x = -550;
		player.laser.laserEmitter.start(true, 200, null, 5);

	} else if ( laserVelocity < 0 ) {
		player.laser.laserEmitter.x = laser.x;
		player.laser.laserEmitter.y = laser.y;
		player.laser.laserEmitter.maxParticleSpeed.x = 550;
		player.laser.laserEmitter.start(true, 200, null, 5);
	}

	laser.kill();

}

function updateLasers(singleLaser) {

	var laserV = singleLaser.body.velocity.x;

	if ( this.game.physics.arcade.collide(singleLaser, layer) ) {

		console.log('cheesitt');

		player.laser.laserExplode(singleLaser, laserV);

	}

}