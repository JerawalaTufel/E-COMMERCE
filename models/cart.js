const Mongoose = require("mongoose");


const Cart = new Mongoose.Schema({
    userId : {
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'User',
        require : true
    } , 
    prodId : {
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'Product',
        require : true
    } , 
    quntity : {
        type : Number,
        require: true
    }
},{
    timestamps: true
})

exports.Cart = Mongoose.model('Cart' , Cart)