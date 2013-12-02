var TilesProvider = require('../providers/tiles.js').Provider;
TilesProvider = new TilesProvider();

exports.index = function(req, res) {
  	var docs = TilesProvider.list(function(tiles) {
  		var bottom 	= tiles.splice(0, 11).reverse();
  		var left 	= tiles.splice(0, 9).reverse();
  		var top 	= tiles.splice(0, 11);
  		var right 	= tiles.splice(0, 9);

		res.render('index', {
			title: 'MonopolyJs',
			bottomTiles: bottom,
			leftTiles: left,
			topTiles: top,
			rightTiles: right
		});
	});
};