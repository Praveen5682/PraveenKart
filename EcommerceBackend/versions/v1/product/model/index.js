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
  } = props;

  try {
    const upperproductname = productname.toUpperCase();

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
    const result = await db.transaction(async (trx) => {
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
      });

      console.log("Inserted Product ID:", insertedProductId); // Debugging log

      if (!insertedProductId) {
        throw new Error("Failed to insert product");
      }

      // **3️⃣ Insert product images**
      if (productimages.length > 0) {
        const mappedImages = productimages.map((imgdata) => ({
          defaultimage: imgdata
            .replace(/^uploads[\\\/]/, "") // Remove 'uploads/' or 'uploads\' prefix
            .split(/[\\\/]/)
            .pop(), // Get only the file name
          productid: insertedProductId,
        }));

        try {
          await trx("productimages").insert(mappedImages);
          console.log("Product images inserted successfully:", mappedImages);
        } catch (error) {
          console.error("Error inserting images:", error);
          throw error; // This is important to trigger rollback!
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
        data: productDetails,
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
      .leftJoin(
        "productspecificationdetails",
        "productspecificationdetails.productid",
        "products.productid"
      )
      .leftJoin(
        "specifications",
        "specifications.specificationid",
        "productspecificationdetails.productspecificationid"
      )
      .select(
        "products.productid",
        "products.productname",
        "products.thumbnailimage",
        "products.productprice",
        "products.productoffer",
        "products.productgst",
        "products.productcategoryid",
        "products.productdescription",
        "categories.id as productcategoryid",
        "categories.productcategoryname",
        "categories.productcategoryimage",
        "subcategories.id as productsubcategoryid",
        "subcategories.subcategoryname",
        "subcategories.subcategoryimage",
        db.raw(
          "GROUP_CONCAT(specifications.specificationName SEPARATOR ', ') as specificationNames"
        ),
        db.raw(
          "GROUP_CONCAT(productspecificationdetails.productspecificationdescription SEPARATOR ' | ') as specificationDescriptions"
        )
      )
      .groupBy("products.productid")
      .orderBy("products.productid", "DESC");

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

    const products = await productsQuery;

    // Attach product images
    await Promise.all(
      products.map(async (product) => {
        const images = await db("productimages")
          .select("productimageid", "defaultimage")
          .where("productid", product.productid);

        product.productimages = images;

        const defaultImg = images.find((img) => img.defaultimage);
        product.defaultimage = defaultImg ? defaultImg.defaultimage : null;
      })
    );

    if (products.length > 0) {
      return {
        code: 200,
        status: true,
        message: "Successfully fetched product data",
        response: products,
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
      code: 500,
      status: false,
      message: "Failed to fetch product data",
      response: [],
    };
  }
};
