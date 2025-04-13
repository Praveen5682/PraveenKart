const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const db = require("../../../../config/knexfile");

module.exports.registration = async (props) => {
  const { fullName, email, password, confirmPassword } = props;
  // const db = global.dbConnection;

  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const serverDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const year = moment().year();

    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return {
        code: 400,
        status: false,
        message: "Email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [insertedUserId] = await db("users").insert({
      fullName,
      email,
      password: hashedPassword,
      created_at: serverDateTime,
    });

    if (!insertedUserId) {
      throw new Error("Failed to create user");
    }
    return {
      code: 201,
      status: true,
      message: "User registered successfully",
      response: {
        id: insertedUserId,
        fullName,
        email,
      },
    };
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    return {
      code: 500,
      status: false,
      message: "Internal server error: Failed to register user",
    };
  }
};
