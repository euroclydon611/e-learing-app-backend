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

export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  res.status(200).json({ success: true, courses });
};
