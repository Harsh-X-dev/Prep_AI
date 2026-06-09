import { useRef, useState } from "react";
import { useDash } from "../hooks/useDash";
import { UploadCloud, Sparkles } from "lucide-react";
import { Loading } from "../../../component/loading";

export const Home = () => {
  const [data, setData] = useState({});
  const { handleGenrateReport, loading } = useDash();
  const [selectedFileName, setSelectedFileName] = useState("");
  const resumeRef = useRef(null);

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div
      id="ai-generator-wrapper"
      // Added items-center here to center the content horizontally
      className="w-full h-full flex flex-col items-center p-8 bg-[#f8fafc] overflow-y-auto"
    >
      {/* Added w-full here to ensure proper alignment within the max-w-4xl constraint */}
      <div className="w-full max-w-4xl mb-8">
        <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-2 block">
          AI Interview Preparation
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Prepare Smarter. <br />
          <span className="text-indigo-600">Interview Better.</span>
        </h1>
        <p className="text-gray-500 max-w-xl text-lg">
          Upload your resume, paste the job description, and let our AI analyze
          your profile to generate a personalized interview report with tailored
          questions and insights.
        </p>
      </div>

      <div
        id="ai-report-generator-component"
        className="w-full max-w-4xl bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm"
      >
        <div
          id="form-grid"
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 mb-8"
        >
          <div id="text-inputs-col" className="flex flex-col gap-6">
            <div id="self-desc-wrapper">
              <label
                id="self-desc-label"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Self-Description
              </label>

              <textarea
                id="self-description"
                rows="4"
                placeholder="Enter your self-description here..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none transition-all"
                value={data.selfDescription || ""}
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    selfDescription: e.target.value,
                  }));
                }}
              ></textarea>
            </div>

            <div id="job-desc-wrapper">
              <label
                id="job-desc-label"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Job Description
              </label>

              <textarea
                id="job-description"
                rows="4"
                placeholder="Paste the job description here..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none transition-all"
                value={data.jobDescription || ""}
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    jobDescription: e.target.value,
                  }));
                }}
              ></textarea>
            </div>
          </div>

          <div id="upload-col" className="flex flex-col h-full mt-7">
            <label
              htmlFor="resume-file-input"
              id="resume-dropzone"
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                setData((prevData) => ({ ...prevData, resume: file }));
                setSelectedFileName(file.name);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              className="flex-1 h-full border-2 border-dashed border-gray-300 bg-gray-50/50 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer group min-h-[250px]"
            >
              {selectedFileName ? (
                <>
                  <span className="text-indigo-600 text-sm font-semibold text-center">
                    {selectedFileName}
                  </span>
                  <span className="text-xs text-gray-500 mt-2">
                    File selected successfully
                  </span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-12 h-12 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
                  <span
                    id="upload-text-main"
                    className="text-sm font-semibold text-gray-700 text-center mb-1"
                  >
                    Click to upload or drag & drop
                  </span>
                  <span id="upload-text-sub" className="text-xs text-gray-500">
                    Only PDF files
                  </span>
                </>
              )}

              <input
                id="resume-file-input"
                type="file"
                accept=".pdf"
                className="hidden"
                ref={resumeRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setData((prevData) => ({ ...prevData, resume: file }));
                  setSelectedFileName(file.name);
                }}
              />
            </label>
          </div>
        </div>

        <button
          id="generate-btn"
          type="button"
          className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
          onClick={(e) => {
            e.preventDefault();
            handleGenrateReport(data);
          }}
        >
          <Sparkles className="w-5 h-5" />
          GENERATE REPORT
        </button>
      </div>
    </div>
  );
};