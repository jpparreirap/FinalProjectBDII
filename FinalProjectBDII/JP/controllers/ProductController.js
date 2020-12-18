const mongoose = require('mongoose');

const Product = mongoose.model('Product');

const neo4j = require('neo4j-driver');
const driver = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '1234567ufrr'));
const session = driver.session();

module.exports = {
	async index(req, res){
		const productd = await Product.find();
		return res.json(productd);
	},

	async show(req, res){
		const product = await Product.findById(req.params.id);
		return res.json(product);
	},

	async store(req, res){
		const product = await Product.create(req.body);
		
		console.log(req.body)
			
		// CREATE(n:Produtos{
		// 	description: 'uma maquina de lavar muito boa',
		// 	active: 'true',
		// 	tipo: 'recomendacao',
		// 	title: 'maquina de lavar',
		// 	imagens: '788209_pendrive_multilaser_PD588_0_z.jpg',
		// 	price: '549'
		//   })

			session
				.run(`CREATE (n:Produtos {title: '${req.body.title}', tipo: '${req.body.category}', description: '${req.body.description}', price: '${req.body.price}', active: True, imagens: '${req.body.images}'})`)
				.then(function(result){
					res.redirect('/');

					session.close();
				})
				.catch(function(err){
					console.log(err);
				})
			
			
			  //   .then(function(result){
			// 	var movierArr = [];
			// 	//console.log(result)
			// 	result.records.forEach(function(record) {        
			// 	  //console.log(records._fields[0].properties);
			// 	  movierArr.push({
			// 		id: record._fields[0].identity.low,
			// 		title: record._fields[0].properties.title,
			// 		price: record._fields[0].properties.price,
			// 		description: record._fields[0].properties.description,
			// 		tipo: record._fields[0].properties.tipo,
			// 		active: record._fields[0].properties.active,
			// 		imagens: record._fields[0].properties.imagens       
					
			// 	  })
		  
			// 	}); 
			// 	res.render('pages/home',{
			// 	  produtos: movierArr,
			// 	  user: req.user
			// 	  //products: products 
			// 	}) 
			//   })
			//   .catch(function(err){
			// 	console.log(err);
			// });
		
		//return res.json(product);
		res.redirect('/');
	},

	async update(req,res){
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		return res.json(product);
	},

	async destroy(req, res){
		await Product.findByIdAndRemove(req.params.id);
		return res.json('Deleted');
	}
};