import React, { useState } from "react";
import { X, Wallet, ArrowRight } from "lucide-react";
import metamasklogo from "../assets/metamask.png";
import { useThemeStore } from "../store/useThemeStore";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { linkWallet } from "../store/authslice";
import { ethers, Log } from "ethers";
import { linkWallet } from "../store/authslice";

export const LinkWalletModal = ({ isOpen, onClose }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const{user,iswallet}=useSelector(state=>state.auth)
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleLinkWallet = async () => {
    try {
       dispatch(linkWallet())
    } catch (error) {
      console.error("Wallet link failed:", error);
      
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-full z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50" onClick={onClose} />
      <div
        className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl transition-all ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${
            isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mt-8 mb-8 text-center">
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Link Your Wallet
          </h2>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Securely connect your MetaMask wallet to your account
          </p>
        </div>

        {/* MetaMask button */}
        <div className="space-y-4 mb-6">
          <button
            onClick={handleLinkWallet}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-200 ${
              isDarkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <img src={metamasklogo} alt="MetaMask" className="w-5 h-5" />
            <span>{user?.walletAddress ? "Wallet Linked!" : "Link with MetaMask"}</span>
          </button>
        </div>

        {/* Linked wallet info */}
        {user?.walletAddress && (
          <div className="mt-4 text-center">
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              ✅ Wallet Address: <span className="font-semibold text-sky-500">{user?.walletAddress}</span>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-6 text-center">
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Want to use a different wallet?{" "}
            <button onClick={handleLinkWallet} className="text-sky-500">
              Retry Link
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
