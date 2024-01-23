const { Cart } = require("../models/cart");
const { User } = require("../models/user");
const { validateCart } = require("../services/validation");

const addCart = async (req, res) => {
    const reqPeram = req.body;
    const userId = req.userId;
    validateCart(reqPeram, res, async (valid) => {
        if (valid) {
            const user = await User.findOne({ _id : userId });

            const cart = await Cart.findOne({
                userId: user._id,
                prodId: reqPeram.prodId
            })

            if (cart) {
                try {
                    const updatedCart = await Cart.findOneAndUpdate(
                        { _id: cart._id },
                        { $inc: { quntity: reqPeram.qry } },
                        { new: true } // Return the modified document
                    );

                    if (updatedCart) {
                        return res.status(201).send({
                            'message': 'Cart updated successfully',
                            'cart-data': updatedCart
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
};

const removeCart = async (req, res) => {

    const reqPeram = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id : userId }); 

    const cart = await Cart.findOne({
        userId: user._id,
        prodId: reqPeram.prodId
    })

    if (cart) {
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $inc: { quntity: -reqPeram.qry } },
            { new: true } // Return the modified document
        );
        if (updatedCart) {
            return res.status(201).send({
                'message': 'Cart updated successfully',
                'cart-data': updatedCart
            });
        } else {
            return res.status(500).send({
                'error': 'Failed to update cart: No documents modified'
            });
        }
    } else {
        return res.status(400).send({
            'message': 'Cart created did not found cart',
        });
    }
}

const listCart = async(req , res) => {

    const queryParams = req.params;
    const userId = req.userId;
    const user = await User.findOne({ _id : userId });
    if(user) {
        const listCartProduct = await Cart.find({userId : queryParams.id}).populate('userId').populate('prodId')
        if(listCartProduct.length > 0)
        {
            return res.status(200).send({
                'cart-product': listCartProduct
            });

        } else {
            return res.status(200).send({
                'message': 'cart is empty'
            });                    
        }
    } else {
        return res.status(400).send({
            'error': 'did not find user....'
        });
    }

}

module.exports = { addCart , removeCart , listCart};
