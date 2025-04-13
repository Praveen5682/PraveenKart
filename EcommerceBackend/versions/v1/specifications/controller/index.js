const service = require("../model/index");
const joi = require("joi");

module.exports.createSpecification = async (req, res) => {
  try {
    const { specificationName } = req.body;

    // Validation

    const schema = joi.object({
      specificationName: joi.string().required().messages({
        "any.required": "specificationName is required",
        "string.empty": "specificationName cannot be empty",
      }),
    });

    const { error } = schema.validate({ specificationName });

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    // Call the service function
    const result = await service.createSpecification({ specificationName });

    // Send response
    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getSpecification = async (req, res) => {
  try {
    const result = await service.getSpecification(); // Call correct function

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.error });
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.editSpecification = async (req, res) => {
  try {
    const { specificationid, specificationName } = req.body;

    if (!specificationid || !specificationName) {
      return res.status(400).json({
        success: false,
        message: "specificationid and specificationName are required",
      });
    }

    // Call the correct service function
    const result = await service.editSpecification({
      specificationid,
      specificationName,
    });

    if (!result.success) {
      return res
        .status(result.statusCode)
        .json({ success: false, message: result.message });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.deleteSpecification = async (req, res) => {
  try {
    const { specificationid } = req.body;
    console.log("specificationid", specificationid);

    if (!specificationid) {
      return res.status(400).json({
        success: false,
        message: "specificationid is required",
      });
    }

    // Call the correct service function
    const result = await service.deleteSpecification({
      specificationid,
    });

    if (!result.success) {
      return res
        .status(result.statusCode)
        .json({ success: false, message: result.message });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
