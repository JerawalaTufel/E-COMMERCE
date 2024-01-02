const Mongoose = require("mongoose");


const Cart = new Mongoose.Schema({
    userId : {
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'User',
        require : true
    } , 
    customerId : {
        type : String,
        require : true
    } , 
    cardId : {
        type : String,
        require: true
    },
    prodId : {
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'Product',
        require : true
    } , 
},{
    timestamps: true
})

exports.Cart = Mongoose.model('Cart' , Cart)