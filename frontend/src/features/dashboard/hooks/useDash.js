import { useContext } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {saveAs} from "file-saver"
import {
  getAllReports,
  genrateReport,
  getReportDetailById,
  genrateResume,
} from "../api/dashApi";
import {DashContext} from "../dashboard.context.jsx";
export function useDash() {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(DashContext);

  const handleGetAllReports = async () => {
    try {
      setLoading(true);
      const data = await getAllReports();
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const handleGenrateReport = async (data) => {
    try {
      setLoading(true);
      if (
        data.selfDescription?.trim() === "" ||
        data.jobDescription?.trim() === "" ||
        !data.resume
      ) {
        setLoading(false);
        return toast.error("Please fill in all fields and upload a resume");
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const res = await genrateReport(formData);
      navigate(`/reports/${res.data.interviewReport._id}`, {
        state: { report: res.data.interviewReport },
      });
    } catch (error) {
      toast.error(error.message || "Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const handleGetReportDetail = async (id) => {
    try {
      setLoading(true);
      const res = await getReportDetailById(id);
      return res;
    } catch (error) {
      toast.error(error.message || "Failed to fetch report details");
    } finally {
      setLoading(false);
    }
  };


  const handleGenrateResume = async (id) => {
    try {
      setLoading(true);
      const res = await genrateResume(id);
      saveAs(res.data, `resume_${id}.pdf`);
    } catch (error) {
      toast.error(error.message || "Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    handleGetAllReports,
    handleGenrateReport,
    handleGetReportDetail,
    handleGenrateResume,
  };
}
