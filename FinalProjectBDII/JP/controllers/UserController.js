const mongoose = require('mongoose');

const User = mongoose.model('User');
const Product = mongoose.model('Product');

module.exports = {
	async index(req, res){
		const users = await User.find();
		return res.json(users);
	},

	async show(req, res){
		const user = await User.findById(req.params.id);
		return res.json(user);
	},

	async store(req, res){
		const user = await User.create(req.body);
		user.save(function(err) {
			if (err) {
				return res.redirect('/register');
			} else {
			  return res.redirect('/login');
			}
		});
	},

	async update(req,res){
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.json(user);
	},

	async destroy(req, res){
		await User.findByIdAndRemove(req.params.id);
		return res.json('Deleted');
	},

	async addCart(req, res){
		const user = await User.findById(req.params.id);
		const product = req.params.product;
		const cart = user.cart;
		let count = 1;

		for(var i = 0; i < cart.length;i++){
			if (cart[i].product === product){
				count = cart[i].amout + 1;
			}
		}

		const cartChangeRemove = await User.findByIdAndUpdate(
			req.params.id, 
			{ $pull: { cart: { "product": product } } }, 
			{ new: true }
		);

		const detalhesProduct = await Product.findById(req.params.product);

		const cartChangeAdd = await User.findByIdAndUpdate(
			req.params.id, 
			{ $addToSet: { cart: { 
				"product" : product, 
				"amout" : count,
				"title" : detalhesProduct.title,
				"price" : detalhesProduct.price,
				"images" : detalhesProduct.images,
				"category" : detalhesProduct.category  
			} } }, 
			{ new: true }
		);
		return res.redirect('/cart');

	},

	async remCart(req, res){
		const user = await User.findById(req.params.id);
		const product = req.params.product;
		const cart = user.cart;
		let count;

		for(var i = 0; i < cart.length;i++){
			if (cart[i].product === product){
				count = cart[i].amout - 1;
			}
		}

		const cartChangeRemove = await User.findByIdAndUpdate(
			req.params.id, 
			{ $pull: { cart: { "product": product } } }, 
			{ new: true }
		);

		if (count > 0) {
			const detalhesProduct = await Product.findById(req.params.product);

			const cartChangeAdd = await User.findByIdAndUpdate(
				req.params.id, 
				{ $addToSet: { cart: { 
					"product" : product, 
					"amout" : count,
					"title" : detalhesProduct.title,
					"price" : detalhesProduct.price,
					"images" : detalhesProduct.images,
					"category" : detalhesProduct.category  
				} } }, 
				{ new: true }
			);
		}
		return res.redirect('/cart');
	},

	async remCartAll(req, res){
		const user = await User.findById(req.params.id);
		const product = req.params.product;
		const cart = user.cart;

		const cartChangeRemove = await User.findByIdAndUpdate(
			req.params.id, 
			{ $pull: { cart: { "product": product } } }, 
			{ new: true }
		);

		return res.redirect('/cart');
	},

	async finalizarCompra(req, res){
		const user = await User.findById(req.params.id);
		const cart = user.cart;

		for(var i = 0; i < cart.length;i++){
			
			const cartChangeAdd = await User.findByIdAndUpdate(
					req.params.id, 
					{ $addToSet: { bought: { "product" : cart[i].product } } }, 
					{ new: true }
			);
			const cartChangeRemove = await User.findByIdAndUpdate(
					req.params.id, 
					{ $pull: { cart: { "product": cart[i].product } } }, 
					{ new: true }
			);
			
		}

		return res.redirect('/cart');

	},
};