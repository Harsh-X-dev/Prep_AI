import { useState } from "react";
import { Navigate,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Loading } from "../../../component/loading.jsx";
const Register = () => {
  const { handleRegisterUser, loading, user } = useAuth();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-8 font-['Inter',_sans-serif]">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[750px]">
        <div
          id="left-panel-branding"
          className="hidden md:flex md:w-[45%] bg-[linear-gradient(135deg,#050505_0%,#1a0b2e_50%,#001233_100%)] text-white p-12 flex-col justify-between relative rounded-l-3xl overflow-hidden"
        >
          <div
            id="left-panel-fluid-blur"
            className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_30%_30%,rgba(220,20,140,0.4),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(0,120,255,0.4),transparent_50%)] blur-[60px] z-0"
          ></div>

          <div id="left-panel-top-content" className="relative z-10 mt-4">
            <span
              id="left-panel-badge"
              className="text-xs font-semibold tracking-[0.2em] uppercase border-b border-white/20 pb-2"
            >
              Career Intelligence
            </span>
          </div>

          <div id="left-panel-bottom-content" className="relative z-10 mb-8">
            <h1
              id="left-panel-heading"
              className="text-5xl font-['Playfair_Display',_serif] mb-6 leading-[1.1]"
            >
              Analyze.
              <br id="br-1" />
              Prepare.
              <br id="br-2" />
              Succeed.
            </h1>
            <p
              id="left-panel-description"
              className="text-gray-300 text-sm leading-relaxed max-w-sm"
            >
              Upload your resume. Let our AI analyze your profile, generate
              tailored technical questions, and guide your interview preparation
              process step-by-step.
            </p>
          </div>
        </div>

        <div
          id="right-panel-forms"
          className="w-full md:w-[55%] md:m-0 p-8 sm:p-14 lg:p-20 flex flex-col justify-center bg-white relative overflow-y-auto"
        >
          <div
            id="logo-container"
            className="flex items-center gap-2 font-bold text-xl mb-12 text-black absolute top-10 right-10 md:right-auto md:top-12 md:relative md:mb-8"
          >
            <svg
              id="logo-svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                id="logo-path"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
            <span id="logo-text">PrepAI</span>
          </div>

          <div id="register-view" className="transition-all duration-300">
            <h2
              id="register-heading"
              className="text-4xl font-['Playfair_Display',_serif] my-4 mb-2 text-gray-900"
            >
              Create Account
            </h2>
            <p id="register-subheading" className="text-gray-500 text-sm mb-10">
              Start your AI-powered interview preparation today.
            </p>

            <form
              id="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegisterUser(data);
              }}
              className="space-y-5"
            >
              <div id="register-name-group">
                <label
                  id="register-firstname-label"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Name
                </label>
                <input
                  id="register-firstname-input"
                  type="text"
                  value={data.username}
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, username: e.target.value }));
                  }}
                  placeholder="User Name"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  required
                />
              </div>

              <div id="register-email-group">
                <label
                  id="register-email-label"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="register-email-input"
                  type="email"
                  value={data.email}
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  required
                />
              </div>

              <div id="register-password-group">
                <label
                  id="register-password-label"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div id="register-password-wrapper" className="relative">
                  <input
                    id="register-password-input"
                    type="password"
                    value={data.password}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    placeholder="Create a password"
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <button
                id="register-submit-button"
                type="submit"
                className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-colors mt-8 shadow-lg shadow-black/10"
              >
                Create Account
              </button>
            </form>

            <p
              id="register-toggle-text"
              className="mt-8 text-center text-sm text-gray-500"
            >
              <span id="register-has-account-span">
                Already have an account?
              </span>
              <Link
                id="register-to-login-btn"
                to="/login"
                className="text-black font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
