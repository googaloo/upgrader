window.onload = function() {

	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

	game.state.add('menu', new Menu() );
	game.state.add('level1', new Level1(game) );

	game.state.start('level1');

};