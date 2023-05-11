import * as Joi from 'joi';

const email = Joi.string().email().messages({
  'string.email': '"email" must be a valid email',
});

const password = Joi.string().min(6).messages({
  'string.min': '"password" length must be at least 6 characters long',
});

const loginSchema = Joi.object({
  email, password,
});

export default loginSchema;
