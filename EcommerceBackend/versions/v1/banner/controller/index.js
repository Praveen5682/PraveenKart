const Joi = require("joi");
const service = require("../model/index");

module.exports.createBanner = async (req, res) => {
  try {
    // Joi Schema for validation
    const schema = Joi.object({
      bannerimage: Joi.string().required(),
    });

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Banner image is required",
      });
    }

    const bannerimage = req.file.filename; // Get filename

    // Validate using Joi
    const { error } = schema.validate({ bannerimage });
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    // Call the service function with an object
    const result = await service.CreateBanner({ bannerimage });

    // Send response
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getBanner = async (req, res) => {
  try {
    // Call the service to get the banners
    const result = await service.GetBanner();

    // If no banners are found
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    // Return the banners if found
    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Error in controller fetching banners:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.body; // Fix: Get ID from URL params, not body
    console.log("Banner ID:", id);

    // Check if the ID is provided in the request
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Banner ID is required",
      });
    }

    // Call the DeleteBanner service function
    const result = await service.DeleteBanner(id);

    // If the deletion is not successful, send an error message
    if (!result.success) {
      return res.status(400).json(result); // Fix: Directly return `result`
    }

    // If the deletion was successful, send a success message
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting banner:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
