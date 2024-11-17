import Joi from 'joi';

export const createJobSchema = Joi.object({
  company: Joi.string().min(2).max(100).required().messages({
    'string.base': `"company" should be a type of 'text'`,
    'string.empty': `"company" cannot be an empty field`,
    'string.min': `"company" should have a minimum length of 2`,
    'any.required': `"company" is a required field`,
  }),
  position: Joi.string().min(2).max(100).required(),
  salaryRange: Joi.string().optional(),
  status: Joi.string()
    .valid('Applied', 'Interview', 'Rejected', 'Accepted')
    .required(),
  notes: Joi.string().optional(),
});

export const updateJobSchema = Joi.object({
  company: Joi.string().min(2).max(100).optional(),
  position: Joi.string().min(2).max(100).optional(),
  salaryRange: Joi.string().optional(),
  status: Joi.string()
    .valid('Applied', 'Interview', 'Rejected', 'Accepted')
    .optional(),
  notes: Joi.string().optional(),
});
