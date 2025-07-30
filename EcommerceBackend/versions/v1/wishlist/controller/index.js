const Joi = require("joi");
const service = require("../model/index");

module.exports.createWishlist = async (req, res) => {
  const { userid, productid } = req.body;

  try {
    // Joi schema for validation
    const schema = Joi.object({
      userid: Joi.number().required(),
      productid: Joi.number().required(),
    });

    // Validate request body
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    // Call wishlist service
    const result = await service.CreateWishlist({ userid, productid });

    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Error in createWishlist:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getWishlist = async (req, res) => {
  try {
    const { userid } = req.body;

    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await service.GetWishlist({ userid });

    return res.status(result.success ? 200 : 404).json(result);
  } catch (error) {
    console.error("Error in getWishlist controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.deleteWishlist = async (req, res) => {
  try {
    const { userid, productid } = req.body;

    if (!userid || !productid) {
      return res.status(400).json({
        success: false,
        error: "userid and productid are required",
      });
    }

    const result = await service.DeleteWishlist({ userid, productid });
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
