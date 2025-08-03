const Joi = require("joi");
const _ = require("lodash");
const service = require("../model/index"); // Update the path as needed

module.exports.getNewArrivalsProduct = async (req, res) => {
  try {
    const result = { ...req.body };

    // Joi schema for validation

    // Call service function
    const response = await service.getNewArrivalsProduct(result);

    if (!_.isEmpty(response)) {
      return res.status(response.code).json({
        status: response.status,
        message: response.message,
        response: response.response,
      });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch product",
      response: [],
    });
  }
};
