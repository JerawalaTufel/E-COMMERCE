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
  }
};