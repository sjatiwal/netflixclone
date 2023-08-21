import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface UserDocument extends Document {
  email: string;
  password: string;
  getJWTToken: () => string; // Define the getJWTToken method
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    // validate: [validator.isEmail, "Please Enter a Valid Email Id"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password must have 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  if (typeof this.password === "string") {
    // Check that password is a valid string
    this.password = crypto
      .createHash("sha256")
      .update(this.password)
      .digest("hex");
  }
});

// Compare Password
userSchema.methods.comparePassword = async function (
  enteredPassword: crypto.BinaryLike
) {
  enteredPassword = crypto
    .createHash("sha256")
    .update(enteredPassword)
    .digest("hex");

  return enteredPassword === this.password;
};

//jwt
userSchema.methods.getJWTToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
