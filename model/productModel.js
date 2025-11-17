const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    sort_description: {
        type: String,
        required: true,
    },

    discount: {
        type: Number,
        default: 0,
    },

    product_image: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        }
    },

    color: {
        type: [String],
        default: [],
    },

    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 5
    }

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
