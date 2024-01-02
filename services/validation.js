const Joi = require('joi');



module.exports = {
  validateRegisterUser: (req, res, callback) => {
    // Validate the user data against the schema

    // Define a schema for validation
    const userRegisterSchema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        user_type: Joi.number().integer().required(),
        dob : Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required(),
        number : Joi.string().required()
    });
    const { error } = userRegisterSchema.validate(req);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    return callback(true);
  },
  
  validateLoginUser : (req , res ,callback) => {
    const userLoginSchema = Joi.object({
      email : Joi.string().email().required(),
      password : Joi.string().required()
    })
    const { error } = userLoginSchema.validate(req)
    if(error) {
      return res.status(400).send(error.details[0].message);
    }
    return callback(true);
  },

  validateCategory : (req,res,cb) => {
    const categoryAddSchema = Joi.object({
      name : Joi.string().required(),
      desc : Joi.string().required(),
      image : Joi.string().required()
    })
    const { error } = categoryAddSchema.validate(req);
    if(error){
      return res.status(400).send(error.details[0].message);
    }
    return cb(true);
  },

  validateSubCategory : (req,res,cb) => {
    const subCategoryAddSchema = Joi.object({
      catId : Joi.string().required(), 
      name : Joi.string().required(),
      desc : Joi.string().required(),
      image : Joi.string().required()
    })
    const { error } = subCategoryAddSchema.validate(req);
    if(error){
      return res.status(400).send(error.details[0].message);
    }
    return cb(true);
  },
  validateProduct : (req,res,cb) => {
    const subCategoryAddSchema = Joi.object({
      subCatId : Joi.string().required(), 
      name : Joi.string().required(),
      desc : Joi.string().required(),
      image : Joi.string().required(),
      price: Joi.number().required()
    })
    const { error } = subCategoryAddSchema.validate(req);
    if(error){
      return res.status(400).send(error.details[0].message);
    }
    return cb(true);
  },

  validateCart : (req ,res ,cb) => {
    const cartSchema = Joi.object({
      prodId : Joi.string().required(), 
      qry : Joi.number().integer().required(),
    })
    const {error} = cartSchema.validate(req);
    if(error) {
      return res.status(400).send(error.details[0].message);
    }
    return cb(true);
  }
};
