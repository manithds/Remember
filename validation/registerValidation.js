const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInput = (data) => {
    let errors = {};

    // Check email
    if(isEmpty(data.email)){
        errors.email = "Email cannot be empty.";

    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    // Check Password
    if(isEmpty(data.password)){
        errors.password = "Password cannot be empty.";
    } else if (!Validator.isLength(data.password, {min: 6, max: 150})){
        errors.password = "Password must be between 6 and 150 characters";
    }

    // Check Name
    if(isEmpty(data.name)){
        errors.name = "Name cannot be empty.";
    } else if (!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = "Name must be between 2 and 30 characters";
    }

    // Confirm Password
    if(isEmpty(data.confirmPassword)){
        errors.confirmPassword = "Confirm Password cannot be empty.";

    } else if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Password and Confirm Password must be the same.";
  
  
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
};

module.exports = validateRegisterInput;