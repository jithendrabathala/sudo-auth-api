import {
  BadRequestException,
  EntryAlreadyExistsException
} from "../../exceptions";
import NotFoundException from "../../exceptions/not-found";
import UserModel from "../../models/User.model";
import { IUser, TLoginResponse } from "../../types";

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
}: TLoginCredentials): Promise<TLoginResponse> => {
  const user: IUser | null = await UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  });

  if (!user) {
    throw new NotFoundException("Invalid credentials");
  }

  if (!(await user.comparePassword(password))) {
    throw new BadRequestException("Invalid Password");
  }

  return {
    accessToken: await user.generateAccessToken(),
    refreshToken: await user.generateRefreshToken(),
    message: "Login successful"
  };
};

export const refreshTokenService = async (
  userId: string
): Promise<TLoginResponse> => {
  const user: IUser | null = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundException("User not found");
  }

  return {
    accessToken: await user.generateAccessToken(),
    message: "Token refreshed successfully"
  };
};
