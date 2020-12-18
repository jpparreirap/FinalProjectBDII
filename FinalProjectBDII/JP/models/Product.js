const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const ProductSchema = new mongoose.Schema({
	title: {
        type: String,
        require: true,
        trim: true,
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
        defaut: true,
    },
    images: {
        type: String,
        require: true,
        trim: true,
    },
	createdAt:{
		type: Date,
		default: Date.now
	}
});

mongoose.model('Product', ProductSchema);