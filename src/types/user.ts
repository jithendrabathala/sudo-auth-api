import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  username: string;
  password: string;
  profilePic: string;
  createdAt?: string;
  updatedAt?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

export type TLoginResponse = {
  accessToken: string;
  message: string;
  refreshToken?: string;
};
