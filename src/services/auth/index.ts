import { BadRequestException } from "../../exceptions";
import UserModel from "../../models/User.model";

export const createUser = async ({
  username,
  password,
  email,
  profilePic
}: {
  username: string;
  password: string;
  email: string;
  profilePic?: string;
}) => {
  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new BadRequestException("User already exists");
  }

  return await UserModel.create({
    username,
    password,
    email,
    profilePic
  });
};
