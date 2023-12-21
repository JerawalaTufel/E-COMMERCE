const { Product } = require("../models/product");
const { validateProduct } = require("../services/validation");

const listProduct = async (req , res) => {
    try {
        const product = await Product.find().populate('proId');
        return res.status(200).json({ product });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
}

const addProduct = async (req , res) => {
    const reqPeram = req.body;
    validateProduct(reqPeram , res , async (valid) => {
        if(valid){
            const product = await Product.findOne({name : reqPeram.name})
            if(product) {
                return res.status(400).send({
                    'message' : 'sub category already exists'
                })
            }
            const newProduct = await Product.create(reqPeram)
            return res.status(201).send(newProduct) 
        }
    })
}

const editProduct = async (req , res) => {
    const queryParams = req.params;
    const reqPeram = req.body;   
    console.log(queryParams);
    const product = await Product.findOne({ _id : queryParams.id})

    if(!product) return res.status(400).send('sub category is not exits')

    const updateProduct = await Product.findByIdAndUpdate(queryParams.id,reqPeram,{ new: true })
    return res.status(201).send(updateProduct) 
}

const deleteProduct = async (req , res) => {
    const queryParams = req.params;
    const product = await Product.findOne({ _id : queryParams.id})
    if(!product) return res.status(400).send('sub category is not exits')
    const deletedCategory = await Product.findByIdAndDelete(queryParams.id);

    console.log(deletedCategory);
    return res.status(200).json({ message: 'Category deleted successfully' });
}

module.exports = {addProduct , listProduct , editProduct , deleteProduct}