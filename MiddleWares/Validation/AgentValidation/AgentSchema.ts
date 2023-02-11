import Joi from "joi";

// VALIDATION SCHEMA OBJECT

export const AgentSchemaValidation = ({
    Register: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }),
    Login: Joi.object({
        email: Joi.string().email().required(),
    })
})