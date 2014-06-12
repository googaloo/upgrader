var Laser,
bullet;

Laser = function(x,y,type) {

	// LASERS
	this._laserGroup = game.add.group();
	this._laserGroup.createMultiple(10, 'laser');
	this._laserGroup.setAll('anchor.y', 0.5);
	this._laserGroup.setAll('outOfBoundsKill', true);

	// LASER EXPLOSION ON COLLIDE
	this._laserEmitter = game.add.emitter(this._laserGroup.x, this._laserGroup.y);
	this._laserEmitter.makeParticles('playerBlasterEmitter');
	this._laserEmitter.gravity = 10;
	this._laserEmitter.bounce = 20;
	this._laserEmitter.bounce.x = 0.3;
	this._laserEmitter.bounce.y = 0.3;

	this._fire = fireLaser;

	function fireLaser() {

		bullet = this._laserGroup.getFirstExists(false);

		if ( bullet ) {

			if ( player._facing == 'right' ) {
				bullet.reset(player._sprite.x + (player._sprite.body.width - 30), player._sprite.y + 60);
				bullet.body.velocity.x = 2000;
			} else if ( player._facing == 'left' ) {
				bullet.reset(player._sprite.x, player._sprite.y + 60);
				bullet.body.velocity.x = -2000;
			}

		}

	}

}

Laser.prototype.update = function() {

	game.physics.collide(this._laserGroup, layer, laserLayerCollideHandler, null, this);
	//game.physics.collide(this._laserGroup, jumperBot, laserJumperBotCollideHandler, null, this);

} // end update

function laserLayerCollideHandler(laser, layer) {

	laserExplode(laser, layer, this);
	laser.kill();
	//console.log(laser);

}

function laserJumperBotCollideHandler(laser, jumper) {

	laserExplode(laser, jumper, this);
	laser.kill();

}

function laserExplode(laser, target, context) {


	if ( laser.body.touching.right ) {
		context._laserEmitter.x = laser.x + (laser.body.width );
		context._laserEmitter.y = laser.y;
		context._laserEmitter.maxParticleSpeed.x = -550;
		context._laserEmitter.start(true, 200, null, 5);

	} else if ( laser.body.touching.left ) {
		context._laserEmitter.x = laser.x;
		context._laserEmitter.y = laser.y;
		context._laserEmitter.maxParticleSpeed.x = 550;
		context._laserEmitter.start(true, 200, null, 5);
	}
	
	// var getIndex = context._laserGroup.getIndex(laser);
	// console.log(getIndex);
	// context._laserGroup.remove(getIndex);

}