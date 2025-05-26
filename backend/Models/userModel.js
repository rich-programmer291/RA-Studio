import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
});

// Pre-save hook to hash the password and security answer
userSchema.pre('save', async function (next) {
  // Hash password if modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Hash security answer if modified
  if (this.isModified('securityAnswer')) {
    this.securityAnswer = await bcrypt.hash(this.securityAnswer, 10);
  }

  next();
});

// Method to check password during login
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to check security answer
userSchema.methods.matchSecurityAnswer = async function (answer) {
  return await bcrypt.compare(answer, this.securityAnswer);
};

const User = mongoose.model('User', userSchema);

export default User;
