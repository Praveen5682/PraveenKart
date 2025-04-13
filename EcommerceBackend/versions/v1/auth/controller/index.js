const service = require("../model/index");
const Joi = require("Joi");

module.exports.registration = async (req, res) => {
  try {
    const result = { ...req.body };

    // Input validation using Joi
    const schema = Joi.object({
      fullName: Joi.string().trim().required().messages({
        "any.required": "fullName is required",
        "string.empty": "fullName cannot be empty",
      }),
      email: Joi.string().trim().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
      password: Joi.string().min(6).required().messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters long",
      }),
      confirmpassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Confirm password does not match password",
          "any.required": "Confirm password is required",
        }),
    });

    // Validate the input
    const { error } = schema.validate(result);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details.map((err) => err.message),
      });
    }

    // Proceed with registration logic
    const response = await service.registration(result);

    // Check if the registration response is valid
    if (
      !response ||
      typeof response.code !== "number" ||
      typeof response.status !== "boolean"
    ) {
      return res.status(500).json({
        status: false,
        message: "Unexpected error occurred while registering user",
      });
    }

    return res.status(response.code).json({
      status: response.status,
      message: response.message,
      data: response.response || null, // Ensure `data` is always returned
    });
  } catch (error) {
    console.error("❌ Error in user registration:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error: Failed to register user",
    });
  }
};
