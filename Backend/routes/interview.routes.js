import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import * as interviewController from "../controller/interview.controller.js";
import  { upload }  from "../middlewares/file.middelware.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  interviewController.genrateInterviewReportController,
);
interviewRouter.get(
  "/report/:interviewId",
  authUser,
  interviewController.getInterviewReportByIdController,
);
interviewRouter.get(
  "/",
  authUser,
  interviewController.getAllinterviewReportController,
);
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser,
  interviewController.genrateResumePdfController,
);
export default interviewRouter;