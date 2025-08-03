const db = require("../../../../config/knexfile");

module.exports.getNewArrivalsProduct = async () => {
  try {
    // Fetch new arrival products
    const products = await db("products as p")
      .leftJoin("categories as c", "c.id", "p.productcategoryid")
      .leftJoin("subcategories as s", "s.id", "p.productsubcategoryid")
      .select(
        "p.productid",
        "p.productname",
        "p.thumbnailimage",
        "p.productprice",
        "p.productoffer",
        "p.productgst",
        "p.productcategoryid",
        "p.productdescription",
        "p.created_at",
        "c.productcategoryname",
        "s.subcategoryname"
      )
      .where("p.is_new", 1) // Only new products
      .orderBy("p.created_at", "DESC");

    if (!products.length) {
      return {
        code: 200,
        status: true,
        message: "No new arrivals found",
        response: [],
      };
    }

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
      message: "Successfully fetched new arrivals",
      response: products,
    };
  } catch (error) {
    console.error("Error fetching new arrivals:", error.message);
    return {
      code: 500,
      status: false,
      message: "Failed to fetch new arrivals",
      response: [],
    };
  }
};
