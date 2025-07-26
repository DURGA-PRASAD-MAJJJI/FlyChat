import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f9] px-4 sm:px-6 md:px-10 text-[#1f2937] font-sans">
      <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-lg overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row transition-all duration-300">
        
        {/* LEFT FORM */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <ShipWheelIcon className="size-9 text-[#1e3a8a]" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#10b981]">
              FlyChat
            </h1>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md border border-red-300 text-sm">
              {error.response?.data?.message || "Login failed."}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
              <p className="text-sm text-gray-500">Sign in to continue your voice journey</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#10b981] text-white font-semibold hover:shadow-lg hover:scale-[1.01] transition-all"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-sm text-center text-gray-500 mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#1e3a8a] font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex w-1/2 bg-[#eff6ff] items-center justify-center p-6">
          <div className="max-w-sm text-center space-y-6">
            <img
              src="/i.avif"
              alt="FlyChat Illustration"
              className="rounded-xl border border-[#d1d5db] shadow-md"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#1e3a8a]">Connect Across Cultures</h2>
              <p className="text-sm text-gray-600">
                Practice languages, meet people, and grow together — from anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
