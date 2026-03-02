const joi = require('joi');

const patchValidator = (req, res, next) => {
    const schema = joi.object({
        task: joi.string().min(3).max(100),
        completed: joi.boolean()
    }).min(1); // At least one field must be present

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = patchValidator;