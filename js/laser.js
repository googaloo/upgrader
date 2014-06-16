Laser = function(game, image) {

	Phaser.Group.call(this, game);

	this.createMultiple(10, image);
	this.setAll('anchor.y', 0.5);
	this.setAll('outofBoundsKill', true);

	// LASER EXPLOSION ON COLLIDE
	this.laserEmitter = game.add.emitter(this.x, this.y);
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

		if ( player._facing == 'right' ) {
			singleLaser.reset(player._sprite.x + (player._sprite.body.width - 30), player._sprite.y + 60);
			singleLaser.body.velocity.x = 2000;
		} else if ( player._facing == 'left' ) {
			singleLaser.reset(player._sprite.x, player._sprite.y + 60);
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
		player.laser.laserEmitter.x = laser.x + (laser.body.width );
		player.laser.laserEmitter.y = laser.y;
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

	if ( game.physics.collide(singleLaser, layer) ) {

		player.laser.laserExplode(singleLaser, laserV);

	}

}