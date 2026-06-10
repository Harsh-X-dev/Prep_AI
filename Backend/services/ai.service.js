import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import puppeteer from "puppeteer";

const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidate's profile matches the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("the technincal question can be asked in interview"),
        intention: z
          .string()
          .describe("the intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "how to answer this question, what points cover, what aproach to take etc.",
          ),
      }),
    )
    .describe(
      "technical question that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("the behavioral question can be asked in interview"),
        intention: z
          .string()
          .describe("the intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "how to answer this question, what points cover, what aproach to take etc.",
          ),
      }),
    )
    .describe(
      "behavioral question that can be asked in the interview along with their intention and how to answer them",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("the skill that candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "list of skill gaps in the candidate's profile along with their sevrity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string().describe("a specific task to be done on this day"))
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

export const genrateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema)
    },
  });

  const report = interviewReportSchema.parse(JSON.parse(response.text));
  return report;
};

const genratePdfFromHtml = async (htmlContent) => {
const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });
  await browser.close();

  return pdfBuffer;
};

export const genrateResumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "the html content of resume which can be converted to pdf using any library like puppteer",
      ),
  });

  const prompt = `Genrate resume for a candidate with the following details:
                        Rseume: ${resume}
                        self Description: ${selfDescription}
                        job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.

  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await genratePdfFromHtml(jsonContent.html);

  return pdfBuffer;
};
