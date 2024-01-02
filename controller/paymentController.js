const { validPayment } = require("../services/validation");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const finalPayment = (req , res) => {
    const reqPeram = req.body;
    validPayment(reqPeram , res , async (valid) => {
        if(valid) {
            try {
                //create customer
                const customer = await stripe.customers.create({
                    name: reqPeram.name,
                    email: reqPeram.email
                })
                console.log(customer);
            } catch (error) {
                res.status(400).send({success:false,msg:error.message});
            }
        }
    })
}

module.exports = {finalPayment}