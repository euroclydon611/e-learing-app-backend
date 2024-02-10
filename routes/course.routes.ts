import express from "express";
import {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getAllCourses,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

router.put(
  "/edit-course",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

//get single course --without purchasing
router.get("/get-course/:id", getSingleCourse);

//get all courses --without purchasing
router.get("/get-courses", getAllCourses);

//get a course --only for valid user
router.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

//add question to course
router.put("/add-question", isAuthenticated, addQuestion);

//add answer to question for a course
router.put("/add-answer", isAuthenticated, addAnswer);

//add review on a course
router.put("/add-review/:id", isAuthenticated, addReview);

//add reply to a review on a course
router.put(
  "/add-reply-to-review",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

export default router;
