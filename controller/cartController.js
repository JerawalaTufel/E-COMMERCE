const { Cart } = require("../models/cart");
const { User } = require("../models/user");
const { getToken } = require("../services/tokenExraction");
const { validateCart } = require("../services/validation");

const addCart = async (req, res) => {
    getToken(req, res, async (token) => {
        if (token) {
            const reqPeram = req.body;
            validateCart(reqPeram, res, async (valid) => {
                if (valid) {
                    const user = await User.findOne({ token });

                    const cart = await Cart.findOne({
                        userId: user._id,
                        prodId: reqPeram.prodId
                    })

                    if (cart) {
                        try {
                            const updateResult = await Cart.updateOne(
                                { _id: cart._id },
                                { $inc: { quntity: reqPeram.qry } },{ new: true } 
                            );

                            if (updateResult && updateResult.modifiedCount > 0) {
                                return res.status(201).send({
                                    'message': 'Cart updated successfully',
                                    'cart-data': updateResult
                                });
                            } else {
                                return res.status(500).send({
                                    'error': 'Failed to update cart: No documents modified'
                                });
                            }
                        } catch (error) {
                            console.error(error);
                            return res.status(500).send({
                                'error': 'Failed to update cart: An internal server error occurred'
                            });
                        }
                    } else {
                        const cartObj = {
                            userId: user._id,
                            prodId: reqPeram.prodId,
                            quntity: reqPeram.qry  
                        }

                        const newCart = await Cart.create(cartObj);
                        return res.status(201).send({
                            'message': 'Cart created successfully',
                            'cart-data': newCart
                        });
                    }
                }
            });
        }
    });
};

module.exports = { addCart };
