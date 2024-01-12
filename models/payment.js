const Mongoose = require("mongoose");


const Payment = new Mongoose.Schema({
    userId : {
        type : Mongoose.SchemaTypes.ObjectId,
        ref : 'User',
        require : true
    } , 
    customerId : {
        type : String,
        require : true        
    },
    paymentId : {
        type: [String],
    }
},{
    timestamps: true
})

exports.Payment = Mongoose.model('Payment' , Payment)