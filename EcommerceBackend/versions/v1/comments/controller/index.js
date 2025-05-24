const service = require("../model/index");
const Joi = require("joi");

module.exports.postComment = async (req, res) => {
  const schema = Joi.object({
    product_id: Joi.number().required().messages({
      "number.base": "Product ID should be a Number",
    }),
    user_id: Joi.string().required().messages({
      "string.base": "User ID should be a string",
    }),
    comment: Joi.string().required().messages({
      "string.base": "Comment should be a string",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  try {
    const response = await service.postComment(req.body);

    return res.status(response.statuscode).json({
      success: response.success,
      message: response.message,
      data: response.data || null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getComments = async (req, res) => {
  const { product_id } = req.body;

  try {
    const schema = Joi.object({
      product_id: Joi.number().required().messages({
        "number.base": "Product ID should be a number",
      }),
    });

    const { error } = schema.validate({ product_id });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const response = await service.getComments({ product_id });

    return res.status(response.statuscode).json({
      success: response.success,
      message: response.message || "Comments fetched successfully",
      data: response.data || [],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
