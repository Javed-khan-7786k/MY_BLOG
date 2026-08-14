export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorDetails,
      });
    }

    req[property] = value;
    next();
  };
};
