const Joi = require("joi");
const _ = require("lodash");
const upload = require("../../../../config/multer"); // Ensure the correct path
const service = require("../model/index"); // Update the path as needed

module.exports.createProduct = [
  upload.fields([
    { name: "thumbnailimage", maxCount: 1 },
    { name: "productimages", maxCount: 12 },
    { name: "productvideo", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Process form data and files
      const result = {
        ...req.body,
        thumbnailimage: req.files?.thumbnailimage?.[0]?.path || null,
        productimages: req.files?.productimages?.map((file) => file.path) || [],
        productvideo: req.files?.productvideo?.[0]?.path || null,
        productspecification:
          typeof req.body.productspecification === "string"
            ? JSON.parse(req.body.productspecification) // ✅ Parse only if it's a string
            : req.body.productspecification || [], // ✅ Use as-is if it's already an object
        created_at: new Date(),
        updated_at: new Date(),
      };

      console.log("Processed result:", result);

      // **Joi Schema Validation**
      const schema = Joi.object({
        productcategoryid: Joi.number().required(),
        productsubcategoryid: Joi.number().required(),
        productname: Joi.string().required(),
        productdescription: Joi.string().required(),
        thumbnailimage: Joi.alternatives()
          .try(Joi.string(), Joi.allow(null))
          .optional(),
        productprice: Joi.number().required(),
        productoffer: Joi.number().required(),
        productgst: Joi.number().min(0).max(100).optional(),
        productimages: Joi.array().items(Joi.string()).optional(),
        productspecification: Joi.array()
          .items(
            Joi.object({
              productspecificationid: Joi.number().required(),
              productspecificationdescription: Joi.string().required(),
            })
          )
          .optional(),
        productvideo: Joi.alternatives()
          .try(Joi.string(), Joi.allow(null))
          .optional(),
        created_at: Joi.date().optional(),
        updated_at: Joi.date().optional(),
      }).required();

      const { error } = schema.validate(result);
      if (error) {
        return res.status(400).send({
          status: false,
          message: error.details[0]?.message || "Validation error",
        });
      }

      // **Call Service to Save Product**
      const response = await service.createProduct(result);

      if (!_.isEmpty(response)) {
        return res.status(response.code).send({
          status: response.status,
          message: response.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).send({
        status: false,
        message: "An error occurred while creating the product",
      });
    }

    return res.send({ status: false, message: "Failed to create product" });
  },
];

module.exports.getProduct = async (req, res) => {
  try {
    const userid = req.headers["userid"];
    const result = { ...req.body, userid };

    // Joi schema for validation
    const schema = Joi.object({
      productid: Joi.alternatives(
        Joi.number().allow(""),
        Joi.number()
      ).messages({
        "number.base": "Product ID must be a number or empty",
      }),
      productcategoryid: Joi.alternatives(
        Joi.number().allow(""),
        Joi.number()
      ).messages({
        "number.base": "Category ID must be a number or empty",
      }),
      productsubcategoryid: Joi.alternatives(
        Joi.number().allow(""),
        Joi.number()
      ).messages({
        "number.base": "SubCategory ID must be a number or empty",
      }),
      userid: Joi.number().optional().messages({
        "number.base": "User ID must be a number",
      }),
    }).required();

    // Validate request data
    const { error } = schema.validate(result);
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0]?.message || "Validation error",
      });
    }

    // Call service function
    const response = await service.getProduct(result);

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
