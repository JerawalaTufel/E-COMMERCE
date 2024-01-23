const Mongoose = require("mongoose");


const Order = new Mongoose.Schema({
    userId : {
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'User',
        require : true
    },
    products: [
        {
          product: {
            type: Mongoose.SchemaTypes.ObjectId,
            ref: 'Product', // Reference to the Product model
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            min: 1
          }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
},{
    timestamps: true
})

// Set the _id option to false for the products subdocuments
Order.set('toObject', { virtuals: true, versionKey: false });
Order.set('toJSON', { virtuals: true, versionKey: false });

exports.Order = Mongoose.model('Order' , Order)