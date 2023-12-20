const Mongoose = require("mongoose");

const SubCategory = new Mongoose.Schema({
    catId :{
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'Category',
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

exports.SubCategory = Mongoose.model('SubCategory' , SubCategory)