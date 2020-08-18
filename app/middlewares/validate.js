import { bodyValidation } from '../lib/github';

export default function validate(req, res, next) {
    const validatedData = bodyValidation.validate(req.body);
    if (validatedData.error) {
        return res.status(400).json({ message: validatedData.error.message, error: validatedData.error });
    }
    req.body = validatedData.value;
    next();
}
