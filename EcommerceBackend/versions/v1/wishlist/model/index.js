const db = require("../../../../config/knexfile");

module.exports.CreateWishlist = async (props) => {
  const { userid, productid } = props;
  try {
    const existingItem = await db("wishlist")
      .where({ userid, productid })
      .first();

    if (existingItem) {
      return { success: false, message: "Product is already in your wishlist" };
    }
    // Insert into wishlist
    await db("wishlist").insert({
      userid,
      productid,
      created_at: new Date(),
    });

    return { success: true, message: "Product added to wishlist successfully" };
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return { success: false, message: "Failed to add product to wishlist" };
  }
};

module.exports.GetWishlist = async (props) => {
  const { userid } = props;
  try {
    const wishlistItems = await db("wishlist")
      .join("products", "wishlist.productid", "=", "products.productid")
      .join(
        "productimages",
        "wishlist.productid",
        "=",
        "productimages.productid"
      )
      .where("wishlist.userid", userid)
      .select(
        "wishlist.wishlistid",
        "wishlist.created_at",
        "products.productid",
        "products.productname",
        "products.productdescription",
        "products.thumbnailimage",
        "products.productprice",
        "products.productoffer",
        "products.productgst",
        "productimages.defaultimage"
      );

    if (wishlistItems.length === 0) {
      return { success: false, message: "Wishlist is empty" };
    }

    return { success: true, data: wishlistItems };
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return { success: false, message: error.message };
  }
};

module.exports.DeleteWishlist = async (props) => {
  const { userid, productid } = props;
  try {
    const deleted = await db("wishlist").where({ userid, productid }).del();

    if (!deleted) {
      return { success: false, message: "Item not found in wishlist" };
    }

    return { success: true, message: "Product removed from wishlist" };
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return { success: false, message: "Failed to delete wishlist item" };
  }
};
