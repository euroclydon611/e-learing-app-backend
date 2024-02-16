import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { redis } from "../database/redis";
import UserModel from "../models/user.model";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(StatusCodes.OK).json({ success: true, user });
  }
};

export const getAllUsersService = async (res: Response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });

  res.status(200).json({ success: true, users });
};
