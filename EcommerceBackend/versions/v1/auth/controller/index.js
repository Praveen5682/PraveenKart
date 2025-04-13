const service = require("../model/index");
const Joi = require("joi");

module.exports.registration = async (req, res) => {
  try {
    const result = { ...req.body };

    // ✅ Input validation including roleId and configId
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
      roleId: Joi.number().integer().optional().messages({
        "number.base": "roleId must be a number",
      }),
      configId: Joi.number().integer().optional().messages({
        "number.base": "configId must be a number",
      }),
    });

    // Validate input
    const { error } = schema.validate(result);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details.map((err) => err.message),
      });
    }

    // ✅ Call the service function
    const response = await service.registration(result);

    // ✅ Check service response format
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
      data: response.response || null,
    });
  } catch (error) {
    console.error("❌ Error in user registration:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error: Failed to register user",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const result = { ...req.body };

    // Input validation using Joi
    const schema = Joi.object({
      email: Joi.string().trim().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
      password: Joi.string().min(6).required().messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters long",
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

    // Proceed with login logic
    const response = await service.login(result);

    // Check if the login response is valid
    if (
      !response ||
      typeof response.code !== "number" ||
      typeof response.status !== "boolean"
    ) {
      return res.status(500).json({
        status: false,
        message: "Unexpected error occurred while logging in",
      });
    }

    return res.status(response.code).json({
      status: response.status,
      message: response.message,
      data: response.response || null, // Return token in response
    });
  } catch (error) {
    console.error("❌ Error in login:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error: Failed to login",
    });
  }
};
