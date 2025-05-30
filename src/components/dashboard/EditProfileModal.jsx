import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThemeStore } from "../../store/useThemeStore";
// import { updateUserProfile } from "../../redux/authSlice"; // ✅ Update path as needed
import { X, Save, Twitter, Globe, Github } from "lucide-react";
import { updateprofile } from "../../store/authslice";

export const EditProfileModal = ({ isOpen, onClose }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    username: userProfile?.username || "",
    email: userProfile?.email || "",
    walletAddress: userProfile?.walletAddress || "",
    twitterurl: userProfile?.twitterurl || "",
    website: userProfile?.website || "",
    github: userProfile?.github || "",
    keyword: userProfile?.keyword || [],
    profile: userProfile?.profile || "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateprofile(formData)).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
      // You can integrate a toast here (e.g. react-toastify) to notify the user.
    }
  };

  const handleKeywordChange = (e) => {
    const keywords = e.target.value.split(",").map((kw) => kw.trim());
    setFormData({ ...formData, keyword: keywords });
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
    isDarkMode
      ? "bg-gray-800 border-gray-700 focus:border-sky-500 text-white disabled:bg-gray-700"
      : "bg-white border-gray-200 focus:border-sky-500 text-gray-900 disabled:bg-gray-100"
  } focus:outline-none focus:ring-0`;

  const labelClass = `block mb-2 text-sm font-medium ${
    isDarkMode ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-lg p-6 rounded-2xl shadow-2xl ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${
            isDarkMode
              ? "hover:bg-gray-800 text-gray-400"
              : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[30rem] overflow-x-auto"
        >
          {[
            { key: "username", label: "Username" },
            { key: "email", label: "Email", type: "email" },
            { key: "walletAddress", label: "Wallet Address", disable: true },
            { key: "profile", label: "Bio", isTextarea: true },
          ].map(({ key, label, type = "text", isTextarea = false, disable = false }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              {isTextarea ? (
                <textarea
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  disabled={disable}
                  className={`${inputClass} h-32 resize-none`}
                />
              ) : (
                <input
                  type={type}
                  value={formData[key]}
                  disabled={disable}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className={inputClass}
                />
              )}
            </div>
          ))}

          <div>
            <label className={labelClass}>Social Links</label>
            <div className="space-y-3">
              {[
                { key: "twitterurl", icon: Twitter, label: "Twitter" },
                { key: "website", icon: Globe, label: "Website" },
                { key: "github", icon: Github, label: "GitHub" },
              ].map(({ key, icon: Icon, label }) => (
                <div key={key} className="relative">
                  <Icon
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="url"
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    placeholder={`${label} URL`}
                    className={`pl-12 ${inputClass}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Keywords (comma-separated)</label>
            <input
              type="text"
              value={formData.keyword.join(", ")}
              onChange={handleKeywordChange}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};
