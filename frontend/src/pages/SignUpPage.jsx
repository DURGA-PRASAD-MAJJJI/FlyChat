import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#fdfdfb]">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-[#2ecc71]/30 bg-white">
        
        {/* LEFT - FORM */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-white text-[#1a1a1a]">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-2">
            <ShipWheelIcon className="size-8 text-[#2ecc71]" />
            <span className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#2ecc71] to-[#4169e1] tracking-wide">
              FlyChat
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">Create an Account</h2>
              <p className="text-sm text-gray-500">Join FlyChat and explore global voices</p>
            </div>

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white text-black"
                placeholder="John Doe"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-white text-black"
                placeholder="john@example.com"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full bg-white text-black"
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Min 6 characters</p>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2 text-xs cursor-pointer mt-2">
              <input type="checkbox" className="checkbox checkbox-sm" required />
              I agree to the <span className="text-[#4169e1] hover:underline">terms</span> & <span className="text-[#4169e1] hover:underline">privacy</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-[#2ecc71] to-[#4169e1] text-white border-none hover:opacity-90"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Already have account */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4169e1] hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-[#4169e1]/10 to-[#2ecc71]/10 items-center justify-center">
          <div className="max-w-md p-10">
            <div className="relative aspect-square max-w-sm mx-auto rounded-xl overflow-hidden shadow-md ring-1 ring-[#2ecc71]/20">
              <img src="/i.avif" alt="Stream global voices" className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-6 space-y-2">
              <h2 className="text-xl font-semibold text-[#1a1a1a]">Global Conversations, One Click Away</h2>
              <p className="text-sm text-gray-600">
                Discover partners from around the world and elevate your communication skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
