const Mongoose = require("mongoose");

const Product = new Mongoose.Schema({
    proId :{
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'SubCategory',
        require : true
    } , 
    name : {
        type: String,
        require: true
    } ,
    desc : {
        type: String,
    },
    image: {
        type: String,
        require: true
    }
},{
    timestamps : true
})

exports.Product = Mongoose.model('Product' , Product)