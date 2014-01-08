/**
 * UserController.js 
 *
 * @description :: 
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {  
  
	find: function(req, res) {
		User.find()
		.populate('animals')
		.exec(function(err, users) {
			if(err) return res.serverError(err);

			res.view('animals', { user: users[0] });
		});
	},

	create: function(req, res) {
		var animal = parseInt(req.param('animal'), 10);

		var user = {
			name: req.param('name') || ''
		};

		User.create(user)
		.exec(function(err, user) {
			if(err) return res.serverError(err);
			if(!animal) return res.json(user);

			user.animals.add(animal);

			user.save(function(err) {
				if(err) return res.serverError(err);

				User.findOne(user.id)
				.populate('animals')
				.exec(function(err, user) {
					if(err) return res.serverError(err);
					res.json(user);
				});

			});

		}); 


	},


	update: function(req, res) {
		var animal = parseInt(req.param('animal'), 10);
		User.findOne(req.param('id'))
		.exec(function(err, user) {
			if(err) return res.serverError(err);

			// Link the user to the animal
			user.animals.add(animal);

			user.save(function(err) {
				if(err) return res.serverError(err);

				User.findOne(req.param('id'))
				.populate('animals')
				.exec(function(err, user) {
					if(err) return res.serverError(err);
					res.json(user);
				});

			});

		});
	}

};
