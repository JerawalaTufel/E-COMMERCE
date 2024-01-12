require('dotenv').config();
const { Payment } = require('../models/payment');
const { User } = require('../models/user');
const { validPayment } = require("../services/validation");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { getToken } = require("../services/tokenExraction");

const finalPayment = (req , res) => {
    const reqPeram = req.body;
    getToken(req, res, async (token) => {
        if (token) {
            validPayment(reqPeram , res , async (valid) => {
                if(valid) {
                    try {
                        const user = await User.findOne({ token });
                        //create customer
                        const payment = await Payment.findOne({userId : user._id})
                        let customerId = '';
                        if(payment){    
                            customerId = payment.customerId;
                        } else {
                            const customer = await stripe.customers.create({
                                name: reqPeram.name,
                                email: reqPeram.email
                            })
                            customerId = customer.id
                        }
                        const paymentIntent = await stripe.paymentIntents.create({
                            amount: reqPeram.amount,
                            currency: 'usd',
                            customer : customerId,
                            automatic_payment_methods: {
                              enabled: true,
                            },
                          });
                          if(payment){
                          const updatedPayment =  await Payment.updateOne({
                            customerId : customerId
                            }, {
                                $push: { paymentId: paymentIntent.id }
                            })
                            res.status(201).send(updatedPayment)

                          } else {
                            let paymentObj = {
                                userId : user._id,
                                customerId : customerId,
                                paymentId : [paymentIntent.id]
                            }
                            const newPyment = await Payment.create(paymentObj)
                            res.status(201).send(newPyment)

                          }
                    } catch (error) {
                        res.status(400).send({success:false,msg:error.message});
                    }
                }
            })
        }
    })
}

module.exports = {finalPayment}