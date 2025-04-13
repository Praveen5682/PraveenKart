const db = require("../../../../config/knexfile");

module.exports.CreateBanner = async (props) => {
  try {
    const { bannerimage } = props;
    console.log(bannerimage);

    //Validation
    if (!bannerimage) {
      throw new Error("Banner Image is Required");
    }

    const [newbannerid] = await db("banners").insert({
      bannerimage,
    });

    return {
      success: true,
      id: newbannerid,
      message: "Banner created successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports.GetBanner = async () => {
  try {
    // Fetch all banners from the 'banners' table
    const banners = await db("banners").select("*");

    // Check if no banners are found
    if (banners.length === 0) {
      return {
        success: false, // Add success field
        message: "No banners found",
      };
    }

    // Return the banners found
    return {
      success: true, // Add success field
      data: banners,
    };
  } catch (error) {
    console.error("Error fetching banners:", error);
    return {
      success: false, // Add success field
      message: "Error fetching banners",
      error: error.message,
    };
  }
};

module.exports.DeleteBanner = async (id) => {
  try {
    if (!id) {
      throw new Error("Banner ID is required");
    }

    const banner = await db("banners").where("id", id).first();

    if (!banner) {
      throw new Error("Banner not found");
    }

    await db("banners").where("id", id).del();

    return {
      success: true,
      message: "Banner deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
