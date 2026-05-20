import {PDFParse}  from "pdf-parse";
import InterviewReportModel from "../models/interviewReport.model.js";
import {
  genrateResumePdf,
  genrateInterviewReport,
} from "../services/ai.service.js";

export const genrateInterviewReportController = async (req, res) => {
  const parser = new PDFParse(
   Uint8Array.from(req.file.buffer)
);
  const resumeContent = await parser.getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await genrateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await InterviewReportModel.create({
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
  const {interviewId} = req.params;

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
  const interviewReports = await InterviewReportModel.find({ user: req.user.id })
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
  const {interviewReportId} = req.params;
console.log(interviewReportId);
  const interviewReport = await InterviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "interview report not found",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await genrateResumePdf({
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
