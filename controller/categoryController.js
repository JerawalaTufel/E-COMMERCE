const { Category } = require("../models/category");
const { SubCategory } = require("../models/subCategory");
const { validateCategory } = require("../services/validation");


const listCategory = async (req , res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ categories });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

const addCategory = async (req , res) => {
    
    const reqPeram = req.body;   
    validateCategory(reqPeram , res , async (valid) => {
        if(valid) {
            const category = await Category.findOne({name : reqPeram.name})
            if(category) {
                return res.status(400).send({
                    'message' : 'category already exists'
                })    
            }
            const newCategory = await Category.create(reqPeram)
            return res.status(201).send(newCategory) 
        }
    })
}

const editCategory = async (req , res) => {
    const queryParams = req.params;
    const reqPeram = req.body;   
    console.log(reqPeram);

    const category = await Category.findOne({ _id : queryParams.id})

    if(!category) return res.status(400).send('category is not exits')

    const updateCategory = await Category.findByIdAndUpdate(queryParams.id,reqPeram,{ new: true })
    return res.status(201).send(updateCategory) 

}

const deleteCategory = async (req , res) => {
    const queryParams = req.params;
    const category = await Category.findOne({ _id : queryParams.id})
    if(!category) return res.status(400).send('category is not exits')
    const deletedCategory = await Category.findByIdAndDelete(queryParams.id);
    console.log(deletedCategory);
    return res.status(200).json({ message: 'Category deleted successfully' });
}

const listofSubCategory = async (req , res) => {
    const queryParams = req.params;
    const reqPeram = req.body;

    const subCategory = await SubCategory.find({catId : queryParams.id});
    if(!subCategory) return res.status(400).send('subcategory is not exits')
    
    return res.status(200).json({ 'sub-categories': subCategory });
}

module.exports = {
    editCategory,
    listCategory,
    addCategory,
    deleteCategory,
    listofSubCategory
}