import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const SkillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false },
);

const PreparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: [true, "Day is required"],
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: [
      {
        type: String,
        required: [true, "Task is required"],
      },
    ],
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [questionSchema],
    behavioralQuestions: [questionSchema],
    skillGaps: [SkillGapSchema],
    preparationPlan: [PreparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
    },
    title: { type: String, required: [true, "Title is required"] },
  },
  {
    timestamps: true,
  },
);

const InterviewReportModel = mongoose.model(
  "interviewReportSchema",
  interviewReportSchema,
);

export default InterviewReportModel;
