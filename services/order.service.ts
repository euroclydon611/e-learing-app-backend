import { NextFunction, Response } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import orderModel from "../models/order.model";

export const newOrder = catchAsyncErrors(async (data: any, res: Response) => {
  const order = await orderModel.create(data);
  res.status(201).json({ success: true, order });
});
