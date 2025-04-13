const db = require("../../../../config/knexfile");

module.exports.createSpecification = async (props) => {
  try {
    const { specificationName } = props;

    // Validation
    if (!specificationName) {
      throw new Error("specificationName is required");
    }

    // Check if the specification already exists
    const existingSpecification = await db("specifications")
      .where({ specificationName })
      .first();

    if (existingSpecification) {
      throw new Error("Specification already exists");
    }

    // Insert new specification and return the inserted ID
    const [newSpecificationId] = await db("specifications")
      .insert({ specificationName })
      .returning("id"); // Ensure the database supports `returning()`

    return {
      success: true,
      statusCode: 201,
      message: "Specification created successfully",
      data: {
        id: newSpecificationId.id || newSpecificationId,
        specificationName,
      },
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 400,
      message: error.message,
    };
  }
};

module.exports.getSpecification = async () => {
  try {
    const specificatios = await db("specifications").select("*");

    return {
      success: true,
      statusCode: 200,
      data: specificatios,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 400,
      message: error.message,
    };
  }
};

module.exports.editSpecification = async (props) => {
  try {
    const { specificationid, specificationName } = props;

    if (!specificationid || !specificationName) {
      throw new Error("specificationid and specificationName are required");
    }

    const existingSpecification = await db("specifications")
      .where({ specificationid })
      .first();

    if (!existingSpecification) {
      throw new Error("Specification not found");
    }

    // Update the specification in the database

    await db("specifications")
      .where({ specificationid })
      .update({ specificationName });

    return {
      success: true,
      statusCode: 200,
      message: "Specification updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 400,
      message: error.message,
    };
  }
};

module.exports.deleteSpecification = async (props) => {
  try {
    const { specificationid } = props;

    if (!specificationid) {
      throw new Error("specificationid is required");
    }

    const existingSpecification = await db("specifications")
      .where({ specificationid })
      .first();

    if (!existingSpecification) {
      throw new Error("Specification not found");
    }

    // Delete the specification from the database
    await db("specifications").where({ specificationid }).del();

    return {
      success: true,
      statusCode: 200,
      message: "Specification deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 400,
      message: error.message,
    };
  }
};
