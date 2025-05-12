const service = require("../model/index");
const Joi = require("joi");

module.exports.addToCart = async (req, res) => {
  const { userid, productid, quantity, price_at_add_time } = req.body;

  const result = { ...req.body };

  try {
    const schema = Joi.object({
      userid: Joi.number().required().messages({
        "any.required": "User ID is required",
        "number.base": "User ID must be a number",
      }),
      productid: Joi.number().required().messages({
        "any.required": "Product ID is required",
        "number.base": "Product ID must be a number",
      }),
      quantity: Joi.number().min(1).required().messages({
        "any.required": "Quantity is required",
        "number.base": "Quantity must be a number",
        "number.min": "Quantity must be at least 1",
      }),
      price_at_add_time: Joi.number().required().messages({
        "any.required": "Price is required",
        "number.base": "Price must be a number",
      }),
    });

    const { error } = schema.validate(result);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const response = await service.addToCart(result);

    if (!response.success) {
      return res.status(response.statuscode || 500).send({
        success: false,
        message: response.message || "Failed to add to cart",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
};

module.exports.getCarts = async (req, res) => {
  const { userid } = req.body;

  try {
    // Joi schema to validate the request
    const schema = Joi.object({
      userid: Joi.number().required().messages({
        "number.base": "User ID must be a number",
        "any.required": "User ID is required",
      }),
    });

    // Validate the request body
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Call service to get cart data
    const response = await service.getCarts({ userid });

    // If the response is valid
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: "Cart items fetched successfully",
        data: response.data, // assuming response contains data as cart items
      });
    } else {
      // Handle the case where no cart items are found
      return res.status(404).json({
        success: false,
        message: "No items found in cart",
      });
    }
  } catch (error) {
    // Catch unexpected errors
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.deleteCart = async (req, res) => {
  const result = req.body;

  try {
    const schema = Joi.object({
      Productid: Joi.number().required().messages({
        "number.base": "Productid must be a number",
        "any.required": "Productid is required",
      }),
    });

    const { error } = schema.validate(result);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const response = await service.deleteCarts(result);

    if (!response.success) {
      return res.status(response.statusCode || 400).json({
        error: response.message,
      });
    }

    return res.status(200).json({
      message: "Item removed from cart",
      data: response,
    });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
