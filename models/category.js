const Mongoose  = require("mongoose");

const Category = new Mongoose.Schema({
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

exports.Category = Mongoose.model('Category' , Category)