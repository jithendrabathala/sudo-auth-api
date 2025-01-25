import { Model, Schema, model } from "mongoose";
import { IUser } from "../types";
import { hashPassword } from "../utils/auth";

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: "https://via.placeholder.com/150"
    }
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

export default model("users", UserSchema) as Model<IUser>;
