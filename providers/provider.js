var Config		= require('../config.js');
var Db 			= require('mongodb').Db;
var Server		= require('mongodb').Server;
var ObjectID 	= require('mongodb').ObjectID;

exports.Provider = function() {
	this.db = null;  	
};

exports.Provider.prototype = {
	connect: function(callback) {
		if (this.db == null) {
			(function(that) {
				Db.connect(Config.db.uri, function(err, db) {
					if (err) {
						console.log(err);
					}
					else {
						that.db = db;
						callback(err, db);
					}
				});
			})(this);
		}
		else {
			callback(null, this.db);
		}
	},

	list: function(collectionName, params, sort, callback) {
		this.connect(function(err, db) {
			if (err) {
				console.log(err);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		console.log(err);
			    	}
			    	else {
			    		collection.find(params).sort(sort).toArray(function(err, docs) {
			    			if (err) {
			    				console.log(err);
			    			}
			    			else {
			    				callback(err, docs);
			    			}
			  			});
			    	}
			  	});
			}
		});
	},

	upsert: function(collectionName, where, data, callback) {
		this.connect(function(err, db) {
			if (err) {
				console.log(err);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		console.log(err);
			    	}
			    	else {
			    		var opts = {
			    			upsert: true, 
			    			new: true,
			    			safe: true
			    		};

			    		collection.findAndModify(where, [['_id','asc']], data, opts, function(err, doc) {
			    			if (err) {
			    				console.log(err);
			    			}
			    			else {
			    				callback(err, doc);
			    			}
			    		});
			    	}
			    });
			}
		});
	},

	findById: function(collectionName, id, callback) {
		this.connect(function(err, db) {
			if (err) {
				console.log(err);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		console.log(err);	
			    	}
			    	else {
			    		collection.findOne({_id: new ObjectID(id)}, function(err, doc) {
			    			if (err) {
			    				console.log(err);			    				
			    			}
			    			else {			    						    					
		    					callback(err, doc);
				    		}
			    		});
			    	}
			    });
			}
		});
	},

	find: function(collectionName, data, callback) {
		this.connect(function(err, db) {
			if (err) {
				console.log(err);
			}
			else {
				db.collection(collectionName, function(err, collection) {
			    	if (err) {
			    		console.log(err);
			    	}
			    	else {
			    		collection.find(data, function(err, docs) {
			    			if (err) {
			    				console.log(err);
			    			}
			    			else {
			    				callback(err, docs);
			    			}
			    		});
			    	}
			    });
			}
		});
	}
}