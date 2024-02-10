import { Response } from "express";
import CourseModel from "../models/course.model";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { StatusCodes } from "http-status-codes";

//create course
export const createCourse = catchAsyncErrors(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(StatusCodes.CREATED).json({ success: true, course });
  }
);
