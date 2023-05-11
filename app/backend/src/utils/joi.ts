import * as Joi from 'joi';

const email = Joi.string().email().required();

const password = Joi.string().min(6).required();

const loginSchema = Joi.object({
  email, password,
}).messages({
  'string.email': 'Invalid email or password',
  'string.empty': 'All fields must be filled',
  'string.min': 'Invalid email or password',
  'any.required': 'All fields must be filled',
});

export default loginSchema;
