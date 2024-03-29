import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import notificationModel from "../models/notification.model";
import cron from "node-cron";

//get all notifications --only for admin
export const getNotifications = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(200).json({ success: true, notifications });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update notification status -- only admin
export const updateNotification = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: notificationId } = req.params;
      const notification = await notificationModel.findById(notificationId);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 400));
      } else {
        notification.status = "read";
      }

      await notification?.save();

      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(200).json({ success: true, notifications });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//delete notification --only admin
cron.schedule("0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await notificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Read notifications deleted");
});
