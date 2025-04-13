const db = require("../../../../config/knexfile");

module.exports.createProduct = async (props) => {
  const {
    productcategoryid,
    productsubcategoryid,
    productdescription,
    productname,
    thumbnailimage,
    productprice,
    productoffer = 0,
    productgst,
    productimages = [],
    productspecification = [],
    productvideo = null,
  } = props;

  try {
    const upperproductname = productname.toUpperCase();

    // **1️⃣ Check if product already exists**
    const existingProduct = await db("products")
      .whereRaw("UPPER(productname) = ?", [upperproductname])
      .andWhere("productcategoryid", productcategoryid)
      .first();

    if (existingProduct) {
      return {
        status: false,
        message: "Product name already exists",
        code: 200,
      };
    }

    // **2️⃣ Start Transaction**
    const result = await db(async (trx) => {
      // **Insert Product**
      const [insertedProductId] = await trx("products").insert({
        productname: upperproductname,
        thumbnailimage,
        productcategoryid,
        productsubcategoryid,
        productdescription,
        productprice,
        productoffer,
        productgst,
        productvideo,
      });

      console.log("Inserted Product ID:", insertedProductId); // Debugging log

      if (!insertedProductId) {
        throw new Error("Failed to insert product");
      }

      // **3️⃣ Insert product images**
      if (productimages.length > 0) {
        const mappedImages = productimages.map((imgdata) => ({
          defaultimage: imgdata,
          productid: insertedProductId,
        }));

        try {
          await trx("productimages").insert(mappedImages);
          console.log("Product images inserted successfully:", mappedImages);
        } catch (error) {
          console.error("Error inserting images:", error);
        }
      }

      // **4️⃣ Insert product specifications**
      if (productspecification.length > 0) {
        const specData = productspecification.map((spec) => ({
          productid: insertedProductId,
          productspecificationid: spec.productspecificationid,
          productspecificationdescription: spec.productspecificationdescription,
        }));

        try {
          await trx("productspecificationdetails").insert(specData);
          console.log(
            "Product specifications inserted successfully:",
            specData
          );
        } catch (error) {
          console.error("Error inserting specifications:", error);
        }
      }

      // **5️⃣ Fetch full product details**
      const productDetails = await trx("products")
        .where({ productid: insertedProductId })
        .first();

      const productImages = await trx("productimages")
        .where({ productid: insertedProductId })
        .pluck("defaultimage"); // Returns an array of image URLs

      const productSpecifications = await trx("productspecificationdetails")
        .where({ productid: insertedProductId })
        .select("productspecificationid", "productspecificationdescription");

      productDetails.productimages = productImages;
      productDetails.productspecification = productSpecifications;

      return {
        code: 201,
        status: true,
        message: "Product created successfully!",
        product: productDetails,
      };
    });

    return result;
  } catch (err) {
    console.error("Error creating product:", err.message || err);
    return {
      code: 500,
      status: false,
      message: "An error occurred while creating the product",
    };
  }
};

module.exports.getProduct = async (props) => {
  const { productid, productcategoryid, productsubcategoryid } = props;

  try {
    let productsQuery = db("products")
      .leftJoin("categories", "categories.id", "products.productcategoryid")
      .leftJoin(
        "subcategories",
        "subcategories.id",
        "products.productsubcategoryid"
      )
      .select(
        "products.productid",
        "products.productname",
        "products.thumbnailimage",
        "products.productprice",
        "products.productvideo",
        "products.productoffer",
        "products.productgst",
        "products.productcategoryid",
        "products.productdescription",
        "categories.id as productcategoryid",
        "categories.productcategoryname",
        "categories.productcategoryimage",
        "subcategories.id as productsubcategoryid",
        "subcategories.subcategoryname", // Fixed column name
        "subcategories.subcategoryimage" // Fixed column name
      )
      .orderBy("products.productid", "DESC");

    // Apply dynamic filtering based on provided parameters
    if (productid)
      productsQuery = productsQuery.where("products.productid", productid);
    if (productcategoryid)
      productsQuery = productsQuery.where(
        "products.productcategoryid",
        productcategoryid
      );
    if (productsubcategoryid)
      productsQuery = productsQuery.where(
        "products.productsubcategoryid",
        productsubcategoryid
      );

    const response = await productsQuery;

    // Fetch related data (images, specifications)
    await Promise.all(
      response.map(async (product) => {
        try {
          // Fetch product images
          const productimages = await db("productimages")
            .select("productimageid", "defaultimage")
            .where("productid", product.productid);
          product.productimages = productimages || [];

          // Fetch product specifications
          const productspecification = await db("productspecificationdetails")
            .leftJoin(
              "productspecification",
              "productspecification.productspecificationid",
              "productspecificationdetails.productspecificationid"
            )
            .select(
              "productspecificationdetails.productspecificationdescription",
              "productspecification.productspecificationname"
            )
            .where("productid", product.productid);
          product.productspecification = productspecification || [];
        } catch (err) {
          console.error(
            `Error fetching related data for product ${product.productid}:`,
            err.message
          );
          product.productimages = [];
          product.productspecification = [];
        }
      })
    );

    if (response.length > 0) {
      return {
        code: 200,
        status: true,
        message: "Successfully fetched product data",
        response,
      };
    } else {
      return {
        code: 200,
        status: true,
        message: "No product data found",
        response: [],
      };
    }
  } catch (err) {
    console.error("Error fetching product data:", err.message);
    return {
      code: 500, // Internal Server Error
      status: false,
      message: "Failed to fetch product data",
      response: [],
    };
  }
};
