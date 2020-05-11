import Joi from '@hapi/joi'


export const validateRhino = (rhino) => {

    // The body should contain no additional keys.
    const schema = Joi.object({
        //- The body of the request must contain a `name` key with a string value between 1 and 20 characters in length.
        name: Joi.string()
            .alphanum()
            .min(1)
            .max(20)
            .required(),

        // //The body of the request must contain a `species` key with a string value representing the 
        // //species of the Rhino to be added. This value must be one of the 
        // //following: `white_rhinoceros`, `black_rhinoceros`, `indian_rhinoceros`, `javan_rhinoceros`, `sumatran_rhinoceros`
        species: Joi.string()
            .alphanum()
            .valid(`white_rhinoceros`, `black_rhinoceros`, `indian_rhinoceros`, `javan_rhinoceros`, `sumatran_rhinoceros`)
            .required()
    })

    const { error } = schema.validate(rhino, { abortEarly: false });
    if (error) {
        return error.details.map(e => e.message)
    }

    return null;
}

