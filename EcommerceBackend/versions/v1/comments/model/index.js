const db = require("../../../../config/knexfile");

module.exports.postComment = async (props) => {
  const { product_id, user_id, comment } = props;
  try {
    if (!product_id || !user_id || !comment) {
      return {
        success: false,
        message: "Missing required fields",
        statuscode: 400,
      };
    }

    const existingComment = await db("comments")
      .where({ product_id, user_id, comment })
      .first();

    if (existingComment) {
      return {
        success: false,
        message: "Comment already exists",
        statuscode: 409,
      };
    }

    const [insertedCommentId] = await db("comments").insert({
      product_id,
      user_id,
      comment,
    });

    return {
      success: true,
      statuscode: 201,
      message: "Comment created successfully",
      data: insertedCommentId,
    };
  } catch (error) {
    return {
      success: false,
      statuscode: 500,
      message: "Something went wrong",
    };
  }
};

module.exports.getComments = async (props) => {
  const { product_id } = props;
  try {
    if (!product_id) {
      return {
        success: false,
        message: "Product ID is required",
        statuscode: 400,
      };
    }

    const fetchComments = await db("comments")
      .leftJoin("users", "comments.user_id", "users.id")
      .where({ product_id })
      .select("comments.*", "users.fullName as username")
      .orderBy("comments.created_at", "desc");

    return {
      success: true,
      statuscode: 200,
      data: fetchComments,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return {
      success: false,
      statuscode: 500,
      message: "Something went wrong",
    };
  }
};
