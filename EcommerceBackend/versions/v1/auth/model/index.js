const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const db = require("../../../../config/knexfile");

module.exports.registration = async (props) => {
  const { fullName, email, password, roleId, configId } = props;

  try {
    if (!db) {
      throw new Error("Database not connected");
    }

    const serverDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // ✅ Check if email already exists
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return {
        code: 400,
        status: false,
        message: "Email already exists",
      };
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert new user
    const [insertedUserId] = await db("users").insert({
      fullName,
      email,
      password: hashedPassword,
      roleId: roleId || 2, // default to 2 (normal user) if not provided
      configId: configId || null,
      created_at: serverDateTime,
    });

    if (!insertedUserId) {
      throw new Error("Failed to create user");
    }

    // ✅ Return success response
    return {
      code: 201,
      status: true,
      message: "User registered successfully",
      response: {
        id: insertedUserId,
        fullName,
        email,
        roleId,
        configId,
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

module.exports.login = async (props) => {
  const { email, password } = props;

  try {
    const user = await db("users").where({ email }).first();

    if (!user) {
      return {
        code: 400,
        status: false,
        message: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        code: 400,
        status: false,
        message: "Invalid password",
      };
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        roleId: user.roleId,
        configId: user.configId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      code: 200,
      status: true,
      message: "Login successful",
      response: {
        token,
      },
    };
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
    return {
      code: 500,
      status: false,
      message: "Internal server error: Failed to log in",
    };
  }
};
