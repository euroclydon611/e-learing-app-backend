import cloudinary from "cloudinary";
import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";

// create layout --only admin
export const createLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.create({ type, faq: faqItems });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({ type, categories: categoriesItems });
      }

      res
        .status(200)
        .json({ success: true, message: "Layout created successfully" });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// edit layout --only admin
export const editLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type });
        const { image, title, subTitle } = req.body;
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData?.image?.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.url,
          },
          title,
          subTitle,
        };
        await LayoutModel.findByIdAndUpdate(
          bannerData._id,
          { type, banner },
          { new: true }
        );
      }

      if (type === "FAQ") {
        const faqData: any = await LayoutModel.findOne({ type });
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(
          faqData._id,
          { type, faq: faqItems },
          { new: true }
        );
      }

      if (type === "Categories") {
        const categoriesData: any = await LayoutModel.findOne({ type });
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesData._id, {
          type,
          categories: categoriesItems,
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Layout updated successfully" });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get layout by type
export const getLayoutByType = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type: layoutType } = req.params;
      const layout = await LayoutModel.findOne({ type: layoutType });

      res.status(200).json({ success: true, layout });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
