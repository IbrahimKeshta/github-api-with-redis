import { bodyValidation } from '../lib/github.lib';

/**
 *  This is middleware to validate request body
 * @param {request} req 
 * @param {response} res 
 * @param {callback} next 
 */
export default function validate(req, res, next) {
    const validatedData = bodyValidation.validate(req.body);
    if (validatedData.error) {
        return res.status(400).json({ message: validatedData.error.message, error: validatedData.error });
    }
    req.body = validatedData.value;
    next();
}
