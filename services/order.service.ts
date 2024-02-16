import { NextFunction, Response } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import orderModel from "../models/order.model";

export const newOrder = catchAsyncErrors(async (data: any, res: Response) => {
  const order = await orderModel.create(data);
  res.status(201).json({ success: true, order });
});

export const getOrdersService = async (res: Response) => {
  const users = await orderModel.find().sort({ createdAt: -1 });

  res.status(200).json({ success: true, users });
};
