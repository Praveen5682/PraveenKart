const db = require("../../../../config/knexfile");

module.exports.addToCart = async (props) => {
  const { userid, productid, quantity, price_at_add_time } = props;

  try {
    if (!userid || !productid || !quantity || !price_at_add_time) {
      return {
        success: false,
        statuscode: 400,
        message: "Please Fill required fields",
      };
    }

    const existingCartitem = await db("cart_items")
      .where({ userid, productid })
      .first();

    if (existingCartitem) {
      return {
        statuscode: 400,
        success: false,
        message: "Cart Item already exist",
      };
    }

    const [insertedCartId] = await db("cart_items").insert({
      userid,
      productid,
      quantity,
      price_at_add_time,
    });

    console.log("Inserted Cart ID:", insertedCartId);

    // Check if the insert operation was successful
    if (insertedCartId) {
      return {
        success: true,
        message: "Item added to cart successfully",
        data: insertedCartId,
      };
    } else {
      return {
        success: false,
        message: "Failed to add to cart",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports.getCarts = async (props) => {
  try {
    const { userid } = props;

    // Check if userid is provided
    if (!userid) {
      return {
        success: false,
        statuscode: 400,
        message: "User ID is required",
      };
    }

    // Query the cart_items table and join with products on productid, and productimages on productid
    const cartItems = await db("cart_items")
      .join("products", "cart_items.productid", "products.productid") // Joining products with cart_items based on productid
      .leftJoin(
        "productimages",
        "productimages.productid",
        "products.productid"
      ) // Left join to include product images
      .where({ "cart_items.userid": userid }) // Filtering by userid
      .select(
        "cart_items.productid",
        "cart_items.quantity",
        "cart_items.price_at_add_time",
        "products.productname",
        "products.productprice",
        "products.productoffer",
        "products.productgst",
        "products.thumbnailimage",
        "products.productspecification",
        "productimages.defaultimage"
      );

    // If no cart items are found, return an appropriate message
    if (cartItems.length === 0) {
      return {
        success: true,
        message: "No items in cart",
        data: [],
      };
    }

    // Group product images by productid and rename 'defaultimage' to 'productimages'
    const groupedItems = cartItems.reduce((acc, item) => {
      const productid = item.productid;
      if (!acc[productid]) {
        acc[productid] = { ...item, productimages: [] };
      }
      if (item.defaultimage) {
        acc[productid].productimages.push(item.defaultimage);
      }
      // Remove the 'defaultimage' key after renaming it to 'productimages'
      delete acc[productid].defaultimage;
      return acc;
    }, {});

    // Convert the grouped items to an array
    const structuredCartItems = Object.values(groupedItems).map((item) => ({
      productid: item.productid,
      quantity: item.quantity,
      price_at_add_time: item.price_at_add_time,
      productname: item.productname,
      productprice: item.productprice,
      productoffer: item.productoffer,
      productgst: item.productgst,
      thumbnailimage: item.thumbnailimage,
      productspecification: item.productspecification,
      productimages: item.productimages, // Renamed key 'defaultimage' to 'productimages'
    }));

    // Return the cart items if they exist
    return {
      success: true,
      message: "Cart items fetched successfully",
      data: structuredCartItems,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports.deleteCarts = async (props) => {
  const { Productid } = props;

  try {
    if (!Productid) {
      return {
        success: false,
        statusCode: 400,
        message: "Productid is required",
      };
    }

    const cart = await db("cart_items").where({ productid: Productid }).first();

    if (!cart) {
      return {
        success: false,
        statusCode: 404,
        message: "Cart item not found",
      };
    }

    await db("cart_items").where({ productid: Productid }).del();

    return {
      success: true,
      statusCode: 200,
      message: "Cart item deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error.message || "An error occurred while deleting the cart item",
    };
  }
};
