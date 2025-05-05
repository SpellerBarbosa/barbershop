import mongoose, {Types, Document, Schema } from "mongoose";

export enum UseRole{
  USER = 'user',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  _id: Types.ObjectId
  name: string;
  email: string;
  user: string;
  password: string;
  createdAt?: Date;
  updated?:Date;
  role: UseRole;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      enum: Object.values(UseRole),
      default:UseRole.USER
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
