import joi from 'joi';

/**
 * validation schema to be used to validate request body
 */
export const bodyValidation = joi.object({
    type: joi.string().trim().lowercase().valid("users", "repos", "issues").required(),
    text: joi.string().trim().min(3).lowercase().required(),
});

