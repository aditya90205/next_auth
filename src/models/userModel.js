import { verify } from "crypto";
import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpire: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
    
const User = mongoose.models.users || mongoose.model("users", userSchema); // if the model is already created, use it. If not, create a new one

export default User;