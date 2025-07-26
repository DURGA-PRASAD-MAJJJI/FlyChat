import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-[#fdfcf7] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_10px_25px_rgba(30,58,138,0.15)] border border-[#d1d5db] p-8">
        <h1 className="text-3xl font-bold text-center text-[#1e3a8a] mb-8">
          👑 Complete Your Royal Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="size-32 rounded-full border-4 border-[#047857] overflow-hidden">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <CameraIcon className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-[#047857] to-[#1e3a8a] hover:from-[#065f46] hover:to-[#1e2e6d] text-white flex items-center gap-2"
            >
              <ShuffleIcon className="w-4 h-4" />
              Generate Avatar
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block mb-1 font-semibold text-[#1e293b]">
              Full Name
            </label>
            <input
              type="text"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({ ...formState, fullName: e.target.value })
              }
              placeholder="Your full name"
              className="w-full input input-bordered bg-white border-[#e2e8f0] text-[#1e293b] focus:border-[#047857] focus:ring-[#047857]"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 font-semibold text-[#1e293b]">Bio</label>
            <textarea
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
              placeholder="Tell about yourself"
              className="w-full textarea textarea-bordered h-24 bg-white border-[#e2e8f0] text-[#1e293b] focus:border-[#047857] focus:ring-[#047857]"
            />
          </div>

          {/* Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-[#1e293b]">
                Native Language
              </label>
              <select
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState({ ...formState, nativeLanguage: e.target.value })
                }
                className="select select-bordered w-full bg-white border-[#e2e8f0] text-[#1e293b] focus:border-[#047857] focus:ring-[#047857]"
              >
                <option value="">Select</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold text-[#1e293b]">
                Learning Language
              </label>
              <select
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    learningLanguage: e.target.value,
                  })
                }
                className="select select-bordered w-full bg-white border-[#e2e8f0] text-[#1e293b] focus:border-[#047857] focus:ring-[#047857]"
              >
                <option value="">Select</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold text-[#1e293b]">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute top-3 left-3 w-5 h-5 text-[#047857]" />
              <input
                type="text"
                value={formState.location}
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
                placeholder="City, Country"
                className="w-full input input-bordered pl-10 bg-white border-[#e2e8f0] text-[#1e293b] focus:border-[#047857] focus:ring-[#047857]"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-md bg-gradient-to-r from-[#1e3a8a] to-[#047857] hover:from-[#1e2e6d] hover:to-[#065f46] text-white font-semibold flex justify-center items-center gap-2"
          >
            {!isPending ? (
              <>
                <ShipWheelIcon className="w-5 h-5" />
                Complete Onboarding
              </>
            ) : (
              <>
                <LoaderIcon className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
