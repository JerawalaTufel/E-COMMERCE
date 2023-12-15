const { addCategory, listCategory, editCategory, deleteCategory } = require('../controller/categoryController');

const apiRoute = require('express').Router();

//category Routes
    apiRoute.post('/addCategory',addCategory)
    apiRoute.get('/listAllCategory' , listCategory)
    apiRoute.put('/editCategory/:id' , editCategory)
    apiRoute.delete('/deleteCategory/:id' , deleteCategory);
module.exports = apiRoute