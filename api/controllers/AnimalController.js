/**
 * AnimalController.js 
 *
 * @description :: 
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {  
  
	find: function(req, res) {
		Animal.find()
		.populate('owners')
		.exec(function(err, animals) {
			if(err) return res.serverError(err);
			res.json(animals);
		});
	}

};
