import { sign, SignOptions } from "jsonwebtoken";

import {
  ACCESS_EXPIRES_IN_VALUE,
  ACCESS_EXPIRES_IN_UNIT,
  ACCESS_SECRET,
  REFRESH_SECRET,
  REFRESH_EXPIRES_IN_VALUE,
  REFRESH_EXPIRES_IN_UNIT
} from "../../config/env";

import { IUser } from "../../types";
import type { StringValue, UnitAnyCase } from "../../config/types";

const genToken = async (
  user: IUser,
  secret: string,
  expiresInOptions: { value: number; unit: UnitAnyCase }
): Promise<string> => {
  const { value, unit } = expiresInOptions;
  const EXPIRE_IN: StringValue = `${value}${unit}`;

  return await sign({ id: user._id }, secret, {
    expiresIn: EXPIRE_IN
  } as SignOptions);
};

export const genAccessToken = async (user: IUser): Promise<string> => {
  return await genToken(user, ACCESS_SECRET, {
    value: ACCESS_EXPIRES_IN_VALUE,
    unit: ACCESS_EXPIRES_IN_UNIT
  });
};

export const genRefreshToken = async (user: IUser): Promise<string> => {
  return await genToken(user, REFRESH_SECRET, {
    value: REFRESH_EXPIRES_IN_VALUE,
    unit: REFRESH_EXPIRES_IN_UNIT
  });
};
