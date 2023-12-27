const { addCart, removeCart, listCart } = require('../controller/cartController');
const { addCategory, listCategory, editCategory, deleteCategory, listofSubCategory } = require('../controller/categoryController');
const { addProduct, listProduct, editProduct, deleteProduct } = require('../controller/productController');
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

// product Routes
    apiRoute.post('/addProduct' ,addProduct)
    apiRoute.get('/listAllProduct',listProduct)
    apiRoute.put('/editProduct/:id',editProduct)
    apiRoute.delete('/deleteProduct/:id',deleteProduct)

//cart routes
    apiRoute.post('/addCart' , addCart)
    apiRoute.post('/removeCart', removeCart)
    apiRoute.get('/cartProduct/:id',listCart)


module.exports = apiRoute