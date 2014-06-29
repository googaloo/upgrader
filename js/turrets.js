var Turret,
turret1Base,
turretJoint,
turretCanon,
turretDirection = 'right';

Turret = function(x,y) {

	game.physics.enable(this, Phaser.Physics.ARCADE);

	this._turret1Base = game.add.sprite(x, y, 'turret1Base');

	this._turretCannon = game.add.sprite(0, 0, 'turretCannon');
	this._turretCannon.anchor.x = 0.5;
	this._turretCannon.anchor.y = 1;

	this._turretJoint = game.add.sprite(0, 0, 'turretJoint');
	this._turretJoint.x = (this._turret1Base.x + (this._turret1Base.width / 2)) - (this._turretJoint.width / 2);
	this._turretJoint.y = this._turret1Base.y + 10;

	this._turretCannon.x = this._turretJoint.x + (this._turretJoint.width / 2);
	this._turretCannon.y = this._turretJoint.y + (this._turretJoint.height / 2);
	this._turret1Base.body.gravity.y = 10;

}

Turret.prototype.update = function() {

	game.physics.collide(this._turret1Base, layer);

	this._turretJoint.x = (this._turret1Base.x + (this._turret1Base.width / 2)) - (this._turretJoint.width / 2);
	this._turretJoint.y = this._turret1Base.y + 10;
	this._turretCannon.x = this._turretJoint.x + (this._turretJoint.width / 2);
	this._turretCannon.y = this._turretJoint.y + (this._turretJoint.height / 2);

	if ( this._turretCannon.angle >= 65 ) {
		turretDirection = 'left';
	}

	if ( this._turretCannon.angle <= -65 ) {
		turretDirection = 'right';
	}

	if ( turretDirection == 'right' ) {
		this._turretCannon.angle = this._turretCannon.angle + 2;
	}

	if ( turretDirection == 'left' ) {
		this._turretCannon.angle = this._turretCannon.angle - 2;
	}

} // end update