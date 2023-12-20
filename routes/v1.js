const { addCategory, listCategory, editCategory, deleteCategory, listofSubCategory } = require('../controller/categoryController');
const { addSubCategory , listSubCategory , editSubCategory , deleteSubCategory} = require('../controller/subCategoryController');

const apiRoute = require('express').Router();

//category Routes
    apiRoute.post('/addCategory',addCategory)
    apiRoute.get('/listAllCategory' , listCategory)
    apiRoute.put('/editCategory/:id' , editCategory)
    apiRoute.delete('/deleteCategory/:id' , deleteCategory);
    apiRoute.get('/listofSubCategory/:id',listofSubCategory)

// sub-category Routes
    apiRoute.post('/addSubCategory' , addSubCategory)
    apiRoute.get('/listSubCategory' , listSubCategory)
    apiRoute.put('/editSubCategory/:id' , editSubCategory)
    apiRoute.delete('/deleteSubCategory/:id' , deleteSubCategory);

module.exports = apiRoute