import { pdfParse } from "pdf-parse";
import InterviewReportModel from "../models/interviewReport.model.js";
import {genrateResumePdf,genrateInterviewReport} from "../services/ai.services.js"


export const genrateInterviewReportController = async (req, res) => {
  const resumeContent = await pdfParse(req.file.buffer);
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await genrateInterviewReportController({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = InterviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: "interview Report genrated successfully",
    interviewReport,
  });
};
export const getInterviewReportByIdController = async (req, res) => {
  const interviewId = req.params;

  const interviewReport = await InterviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "interview report not found",
    });
  }

  res.status(200).json({
    message: "interview report fetched successfully",
    interviewReport,
  });
};
export const getAllinterviewReportController = async (req, res) => {
  const interviewReports = find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
};
export const genrateResumePdfController = async (req, res) => {
  const interviewReportId = req.params;

  const interviewReport = InterviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "interview report not found",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = genrateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(pdfBuffer);
};
