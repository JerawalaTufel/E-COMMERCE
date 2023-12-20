const { SubCategory } = require("../models/subCategory");
const { validateSubCategory } = require("../services/validation");

const listSubCategory = async (req , res) => {
    try {
        const subCategories = await SubCategory.find().populate('catId');
        return res.status(200).json({ subCategories });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
}

const addSubCategory = async (req , res) => {
    const reqPeram = req.body;
    validateSubCategory(reqPeram , res , async (valid) => {
        if(valid){
            const subCategory = await SubCategory.findOne({name : reqPeram.name})
            if(subCategory) {
                return res.status(400).send({
                    'message' : 'sub category already exists'
                })
            }
            const newSubCategory = await SubCategory.create(reqPeram)
            return res.status(201).send(newSubCategory) 
        }
    })
}

const editSubCategory = async (req , res) => {
    const queryParams = req.params;
    const reqPeram = req.body;   
    console.log(queryParams);
    const subCategory = await SubCategory.findOne({ _id : queryParams.id})

    if(!subCategory) return res.status(400).send('sub category is not exits')

    const updateSubCategory = await SubCategory.findByIdAndUpdate(queryParams.id,reqPeram,{ new: true })
    return res.status(201).send(updateSubCategory) 
}

const deleteSubCategory = async (req , res) => {
    const queryParams = req.params;
    const subCategory = await SubCategory.findOne({ _id : queryParams.id})
    if(!subCategory) return res.status(400).send('sub category is not exits')
    const deletedCategory = await SubCategory.findByIdAndDelete(queryParams.id);

    console.log(deletedCategory);
    return res.status(200).json({ message: 'Category deleted successfully' });
}

module.exports = {addSubCategory , listSubCategory , editSubCategory , deleteSubCategory}