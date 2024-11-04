import mongoose from "mongoose";
import { hash, compare, genSalt } from "bcrypt";
const modelSchema = new mongoose.Schema({
  // userId: {
  //     type: String,
  //     required: true
  // },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  created_at: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

modelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

modelSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

const UserModel = mongoose.model("app_user", modelSchema);

export default UserModel;
