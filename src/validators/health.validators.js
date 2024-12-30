import Joi from "joi";

export const mailerValidator = (params) => {
    const mailerValidatorSchema = Joi.object({
        senderEmail: Joi.string().email().allow(null),
        receiverEmail: Joi.string().email().required(),
    })
    return mailerValidatorSchema.validate(params);
};