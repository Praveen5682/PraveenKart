const Joi = require("joi");
const _ = require("lodash");
const service = require("../model/index"); // Update the path as needed

module.exports.createProduct = [
  async (req, res) => {
    try {
      // Extract and process incoming form data
      const { body, files: { thumbnailimage = [], productimages = [] } = {} } =
        req;

      const result = {
        ...body,
        thumbnailimage: thumbnailimage[0]?.path || null,
        productimages: productimages.map((file) => file.path),
        productspecification:
          typeof body.productspecification === "string"
            ? JSON.parse(body.productspecification)
            : body.productspecification || [],
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Joi schema validation
      const schema = Joi.object({
        productcategoryid: Joi.number().required(),
        productsubcategoryid: Joi.number().required(),
        productname: Joi.string().required(),
        productdescription: Joi.string().required(),
        thumbnailimage: Joi.string().allow(null).optional(),
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
        created_at: Joi.date().optional(),
        updated_at: Joi.date().optional(),
      });

      const { error } = schema.validate(result);
      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details[0]?.message || "Validation error",
        });
      }

      // Create product via service layer
      const response = await service.createProduct(result);

      if (!_.isEmpty(response)) {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
        });
      }

      // Fallback error if response is empty
      return res.status(500).json({
        status: false,
        message: "Failed to create product",
      });
    } catch (err) {
      console.error("Error while creating product:", err);
      return res.status(500).json({
        status: false,
        message: "An error occurred while creating the product",
      });
    }
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

module.exports.getRelatedProducts = async (req, res) => {
  const { category_id, exclude_product_id, limit = 4 } = req.body;

  try {
    if (!category_id || !exclude_product_id) {
      return res.status(400).json({
        status: false,
        message: "category_id and exclude_product_id are required",
      });
    }

    const result = await service.getRelatedProducts({
      category_id,
      exclude_product_id,
      limit,
    });

    return res.status(result.statuscode).json({
      status: result.success,
      message: result.message,
      data: result.data || [],
    });
  } catch (error) {
    console.error("Controller error fetching related products:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch related products",
    });
  }
};
