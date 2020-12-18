const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const neo4j = require('neo4j-driver');
const driver = new neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '1234567ufrr'));
const session = driver.session();

const Product = mongoose.model('Product');


routes.get('/', function(req, res){
    session  
      .run('MATCH (n:Produtos) RETURN n LIMIT 40')
      .then(function(result){
        var movierArr = [];
        //console.log(result)
        result.records.forEach(function(record) {        
          movierArr.push({
            id: record._fields[0].identity.low,
            title: record._fields[0].properties.title,
            price: record._fields[0].properties.price,
            description: record._fields[0].properties.description,
            tipo: record._fields[0].properties.tipo,
            active: record._fields[0].properties.active,
            imagens: record._fields[0].properties.imagens       
            
          })
  
        }); 
        res.render('pages/home',{
          produtos: movierArr,
          user: req.user
        }) 
      })
      .catch(function(err){
        console.log(err);
    });
  });


routes.get('/moveis-decoracao', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/moveis-decoracao', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/eletrodomesticos', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/eletrodomesticos', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/smartphones', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/smartphones', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/eletroportateis', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/eletroportateis', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/tv', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/tv', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/informatica', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/informatica', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/esporte-lazer', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/esporte-lazer', { 
                user: req.user,
                products: products 
            });
        }
    });
})
routes.get('/cama-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/cama-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/estacao-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/estacao-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})

routes.get('/monitor-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/monitor-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})
routes.get('/geladeira-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/geladeira-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})
routes.get('/cpu-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/cpu-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})
routes.get('/smartphone-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/smartphone-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})
routes.get('/tv-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/tv-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})
routes.get('/cafeteira-detalhes', (req, res) => {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/cafeteira-detalhes', { 
                user: req.user,
                products: products 
            });
        }
    });
})



//CADASTRAR PRODUTO
routes.get('/produto/cadastrar', (req, res) => {
    res.render('pages/cadastrarProduto', { 
        user: req.user
    });
})

//LOGIN
routes.get('/login', (req, res) => {
    res.render('pages/login', { 
        user: req.user
    });
})
routes.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

//LOGOUT
routes.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});

//Cart
routes.get('/cart',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    let cart = req.user.cart;
    let total=0;
    for (let i=0;i<cart.length;i++){
        total = total + (cart[i].price * cart[i].amout);
    }
    //res.json(total);
    res.render('pages/cart', { 
        user: req.user,
       totalCart: total 
    });
});

//REGISTER
//HOME
routes.get('/register', (req, res) => {
    res.render('pages/register', { 
        user: req.user
    });
})

//PROFILE
routes.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('pages/profile', { user: req.user });
});


module.exports = routes;

//route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}