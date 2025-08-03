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
    is_new = 0,
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
        is_new,
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
  const { productid, productcategoryid, productsubcategoryid, userid } = props;

  try {
    let productsQuery = db("products as p")
      .leftJoin("categories as c", "c.id", "p.productcategoryid")
      .leftJoin("subcategories as s", "s.id", "p.productsubcategoryid")
      .leftJoin("wishlist as w", function () {
        this.on("w.productid", "=", "p.productid").andOn(
          "w.userid",
          "=",
          db.raw("?", [userid || 0])
        );
      })
      .select(
        "p.productid",
        "p.productname",
        "p.thumbnailimage",
        "p.productprice",
        "p.productoffer",
        "p.productgst",
        "p.productcategoryid",
        "p.productdescription",
        "p.is_new",
        "p.created_at",
        "c.productcategoryname",
        "s.subcategoryname",
        db.raw("IF(w.wishlistid IS NOT NULL, 1, 0) AS isWishlist")
      )
      .groupBy("p.productid")
      .orderBy("p.productid", "DESC");

    if (productid) {
      productsQuery.where("p.productid", productid);
    }
    if (productcategoryid) {
      productsQuery.where("p.productcategoryid", productcategoryid);
    }
    if (productsubcategoryid) {
      productsQuery.where("p.productsubcategoryid", productsubcategoryid);
    }

    const products = await productsQuery;

    // Attach product images
    await Promise.all(
      products.map(async (product) => {
        const images = await db("productimages")
          .select("productimageid", "defaultimage")
          .where("productid", product.productid);

        product.productimages = images;
        product.defaultimage =
          images.find((img) => img.defaultimage)?.defaultimage || null;
      })
    );

    return {
      code: 200,
      status: true,
      message: products.length
        ? "Successfully fetched product data"
        : "No product data found",
      response: products,
    };
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

module.exports.getRelatedProducts = async (props) => {
  const { category_id, exclude_product_id, limit } = props;

  try {
    if (!category_id || !exclude_product_id) {
      return {
        success: false,
        message: "category_id and exclude_product_id are required",
        statuscode: 400,
      };
    }

    const relatedProducts = await db("products")
      .select(
        "products.productid",
        "products.productname",
        "products.productprice",
        "productimages.defaultimage"
      )
      .leftJoin(
        "productimages",
        "productimages.productid",
        "products.productid"
      )
      .where("products.productcategoryid", category_id)
      .andWhereNot("products.productid", exclude_product_id)
      .limit(limit);

    return {
      success: true,
      statuscode: 200,
      data: relatedProducts,
      message: "Related products fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching related products:", error);
    return {
      success: false,
      statuscode: 500,
      message: "Internal server error",
    };
  }
};
