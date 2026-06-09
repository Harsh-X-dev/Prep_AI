import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDash } from "../hooks/useDash";
import {
  ArrowLeft,
  Download,
  Code,
  UserCheck,
  AlertTriangle,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Loading } from "../../../component/loading";

export function ReportDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [reportData, setReportData] = useState(location.state?.report || null);
  const { loading, handleGetReportDetail, handleGenrateResume } = useDash();

  useEffect(() => {
    if (!reportData) {
      handleGetReportDetail(id).then((data) => setReportData(data));
    }
  }, [id, reportData]);

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div
      id="report-detail-body"
      className="bg-[#f8fafc] h-screen flex font-['Inter',_sans-serif] overflow-hidden text-gray-800"
    >
      <main
        id="report-main-content"
        className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-8 relative"
      >
        <div
          id="report-container"
          className="w-full max-w-6xl mx-auto flex flex-col gap-6"
        >
          <div className="mb-2">
            <Link
              to="/reports"
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium w-max"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Link>
          </div>

          <header
            id="report-header"
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div id="header-text-group">
              <h1
                id="report-title"
                className="text-2xl font-bold text-gray-900 tracking-tight"
              >
                {reportData?.title}
              </h1>
              <p id="report-date" className="text-sm text-gray-500 mt-1">
                Generated on{" "}
                {new Date(reportData?.updatedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div id="header-actions-group" className="flex items-center gap-4">
              <button
                id="download-pdf-btn"
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-semibold flex items-center gap-2 shadow-sm"
                onClick={() => handleGenrateResume(reportData?._id)}
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <div
                id="match-score-badge"
                className="flex flex-col items-center justify-center bg-green-50 px-5 py-2 rounded-lg"
              >
                <span
                  id="score-label"
                  className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-0.5"
                >
                  Match Score
                </span>
                <span
                  id="score-value"
                  className="text-xl font-bold text-green-600"
                >
                  {reportData?.matchScore}%
                </span>
              </div>
            </div>
          </header>

          <div
            id="content-grid"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div id="left-column" className="lg:col-span-2 flex flex-col gap-6">
              <section
                id="tech-questions-section"
                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                <h2
                  id="tech-q-heading"
                  className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"
                >
                  <Code className="w-5 h-5 text-gray-500" />
                  Technical Questions
                </h2>

                <div id="tech-q-list" className="space-y-8">
                  {reportData?.technicalQuestions?.map((question, index) => (
                    <div id={`tech-q-${index}`} key={index}>
                      <p className="text-md font-semibold text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                        Intent: {question.intention}
                      </p>
                      <div className="bg-[#f8fafc] border border-gray-100 p-5 rounded-xl">
                        <span className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-2">
                          Suggested Answer
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {question.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="behavioral-questions-section"
                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                <h2
                  id="behavioral-q-heading"
                  className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"
                >
                  <UserCheck className="w-5 h-5 text-gray-500" />
                  Behavioral Questions
                </h2>
                <div id="beh-q-list" className="space-y-8">
                  {reportData?.behavioralQuestions?.map((question, index) => (
                    <div id={`beh-q-${index}`} key={index}>
                      <p className="text-md font-semibold text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                        Intent: {question.intention}
                      </p>
                      <div className="bg-[#f8fafc] border border-gray-100 p-5 rounded-xl">
                        <span className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-2">
                          Suggested Approach
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {question.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div id="right-column" className="flex flex-col gap-6">
              <section
                id="skill-gaps-section"
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <h2
                  id="gaps-heading"
                  className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Identified Skill Gaps
                </h2>

                <div id="gaps-list" className="flex flex-col gap-4">
                  {reportData?.skillGaps?.map((gap, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${gap.severity === "High" ? "bg-red-500" : "bg-orange-400"}`}
                      ></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-0.5">
                          {gap.skill}
                        </p>
                        <span
                          className={`text-[10px] font-bold uppercase ${gap.severity === "High" ? "text-red-500" : "text-orange-500"}`}
                        >
                          {gap.severity} Priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="prep-plan-section"
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex-1"
              >
                <h2
                  id="plan-heading"
                  className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"
                >
                  <Target className="w-5 h-5 text-green-500" />
                  Action Plan
                </h2>

                <div
                  id="timeline-container"
                  className="relative border-l-2 border-gray-100 ml-3 space-y-8"
                >
                  {reportData?.preparationPlan?.map((day, index) => (
                    <div key={index} className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-green-500"></div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">
                        Day {day.day}:{" "}
                        <span className="font-medium text-gray-600">
                          {day.focus}
                        </span>
                      </h3>
                      <ul className="list-disc list-outside ml-4 text-xs text-gray-600 space-y-2 leading-relaxed">
                        {day?.tasks?.map((task, index) => (
                          <li key={index}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
