import { sign, SignOptions } from "jsonwebtoken";

import {
  ACCESS_EXPIRES_IN_VALUE,
  ACCESS_EXPIRES_IN_UNIT,
  ACCESS_SECRET
} from "../../config/env";

import { IUser } from "../../types";
import type { StringValue } from "../../config/types";

const JWT_EXPIRE_IN: StringValue = `${ACCESS_EXPIRES_IN_VALUE}${ACCESS_EXPIRES_IN_UNIT}`;

export const genAccessToken = async (user: IUser): Promise<string> => {
  return sign({ id: user._id }, ACCESS_SECRET, {
    expiresIn: JWT_EXPIRE_IN
  } as SignOptions);
};
