MonopolyJs.service('GamesService', ['SocketioService', '$http', function($socket, $http) {
	return {
		list: function(callback) {
			return $http.get('/api/games').success(function(games) {				
				callback(games);
			});
		},

		get: function(gameId, userId, callback) {
			$socket.emit('game:get', {gameId: gameId, userId: userId}, function(data) {
      			callback(data);
    		});

    		$socket.on('game:update', function(Game) {
				callback(Game);
			});
		},

		create: function(data, callback) {
			return $http.post('/api/games', data).success(function(game) {
				callback(game);
			});	
		},

		rollDice: function(data, callback) {
			return $http.put('/api/games/' + data._id + '/rollDice', data).success(function(game) {
				callback(game);
			});
		},

		endTurn: function(data, callback) {
			return $http.put('/api/games/' + data._id + '/endTurn', data).success(function(game) {
				callback(game);
			});
		}
	}
}]);