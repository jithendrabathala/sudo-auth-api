import {
  BadRequestException,
  EntryAlreadyExistsException
} from "../../exceptions";
import NotFoundException from "../../exceptions/not-found";
import UserModel from "../../models/User.model";
import { IUser } from "../../types";

type TUser = {
  username: string;
  password: string;
  email: string;
  profilePic?: string;
};

type TLoginCredentials = {
  usernameOrEmail: string;
  password: string;
};

export const createUser = async ({
  username,
  password,
  email,
  profilePic
}: TUser): Promise<IUser> => {
  const existingUser: IUser | null = await UserModel.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new EntryAlreadyExistsException("User already exists");
  }

  return await UserModel.create({
    username,
    password,
    email,
    profilePic
  });
};

export const loginUser = async ({
  usernameOrEmail,
  password
}: TLoginCredentials): Promise<any> => {
  const user = await UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  });

  if (!user) {
    throw new NotFoundException("Invalid credentials");
  }

  if (!(await user.comparePassword(password))) {
    throw new BadRequestException("Invalid Password");
  }

  return {
    token: await user.generateAccessToken(),
    message: "Login successful"
  };
};
