import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SparkMD5 from "spark-md5";
import { Upload, X } from "lucide-react";
import { uploadToIPFS } from "../utils/uploadipfs";
import { listAsset } from "../store/etherslice";
import { useThemeStore } from "../store/useThemeStore";
import { updateToast } from "../store/toastslice";

export const ListNFTForm = () => {
  const dispatch = useDispatch();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Redux assets for existing hashes check
  const assets = useSelector((state) => state.marketplace.assets);
  const existingHashes = assets.map((asset) => asset.imageHash).filter(Boolean);

  // Keep track of session-uploaded hashes (to avoid duplicates in session)
  const uploadedHashes = useRef(new Set());

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    file: null,
    category: "DigitalArt", // default category
  });
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);

  // Categories matching Solidity enum
  const categories = [
    "DigitalArt",
    "Illustrations",
    "Photography",
    "Music",
    "Gaming",
    "Collectibles",
  ];

  // Helper: hash file with SparkMD5
  const hashFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binary = event.target.result;
        const hash = SparkMD5.ArrayBuffer.hash(binary);
        resolve(hash);
      };
      reader.onerror = () => reject("Failed to read file.");
      reader.readAsArrayBuffer(file);
    });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fType = file.type.split("/")[0];
    if (!["image"].includes(fType)) {
      alert("Only images is Allowed");
      return;
    }

    try {
      const hash = await hashFile(file);

      // Check duplicates in session
      if (uploadedHashes.current.has(hash)) {
        // alert("You've already uploaded this file in this session.");
        dispatch(updateToast({ message: "You've already uploaded this file in this session. ", type: "error" }));
        return;
      }

      // Check duplicates against existing NFTs
      if (existingHashes.includes(hash)) {
        // alert("This file has already been listed as an NFT.");
        dispatch(updateToast({ message: "This file has already been listed as an NFT.", type: "error" }));
        return;
      }

      // Passed all checks, add hash to session set
      uploadedHashes.current.add(hash);

      setFormData((prev) => ({ ...prev, file }));
      setFileType(fType);
      setPreview(URL.createObjectURL(file));
    } catch (err) {
      console.error("File hash error:", err);
      // alert("Error processing the file. Please try again.");
       dispatch(updateToast({ message: "Error processing the file. Please try again.", type: "error" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
     
      dispatch(updateToast({ message: "Please upload a file before submitting", type: "error" }));
      return;
    }
    if (!formData.name.trim()) {
     
      dispatch(updateToast({ message: "Please enter a name for your NFT", type: "error" }));
      return;
    }
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      // alert("Please enter a valid price.");
      dispatch(updateToast({ message: "Please enter a valid price.", type: "error" }));
      return;
    }

    try {
      const metadata = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
      };

      // Upload file & metadata to IPFS (utility function)
      const metadataURI = await uploadToIPFS(formData.file, metadata);

      // Dispatch NFT listing to Redux + blockchain interaction
      await dispatch(
        listAsset({
          name: metadata.name,
          metadataURI,
          price: formData.price,
          category: formData.category,
        })
      );

      // alert("NFT submitted successfully!");

      // Clear form & preview
      setFormData({
        name: "",
        description: "",
        price: "",
        file: null,
        category: "DigitalArt",
      });
      setPreview(null);
      setFileType(null);
      uploadedHashes.current.clear(); // Optional: clear session hashes on successful submit
    } catch (error) {
      console.error("Error uploading to IPFS or listing NFT:", error);
      // alert("Failed to upload or list NFT. Please try again.");
      dispatch(updateToast({ message: error, type: "error" }));
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    setPreview(null);
    setFileType(null);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
    isDarkMode
      ? "bg-gray-800 border-gray-700 focus:border-sky-500 text-white placeholder-gray-500"
      : "bg-white border-gray-200 focus:border-sky-500 text-gray-900 placeholder-gray-400"
  } focus:outline-none focus:ring-0`;

  return (
    <div
      className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-xl ${
        isDarkMode ? "bg-gray-800/50" : "bg-white"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        List Your NFT
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label
            className={`block mb-2 font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
            htmlFor="nft-name"
          >
            NFT Name
          </label>
          <input
            id="nft-name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className={inputClass}
            placeholder="Enter NFT name"
            required
          />
        </div>

        <div>
          <label
            className={`block mb-2 font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
            htmlFor="nft-description"
          >
            Description
          </label>
          <textarea
            id="nft-description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className={`${inputClass} h-32 resize-none`}
            placeholder="Describe your NFT"
            required
          />
        </div>

        <div>
          <label
            className={`block mb-2 font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
            htmlFor="nft-price"
          >
            Price (ETH)
          </label>
          <input
            id="nft-price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className={inputClass}
            placeholder="Set your price"
            required
            min="0.0001"
          />
        </div>

        {/* Category Select */}
        <div>
          <label
            className={`block mb-2 font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
            htmlFor="nft-category"
          >
            Category
          </label>
          <select
            id="nft-category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className={inputClass}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label
            className={`block mb-2 font-medium ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Upload File
          </label>
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {preview ? (
              <div className="relative">
                {fileType === "image" && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                )}
                {fileType === "video" && (
                  <video
                    controls
                    className="max-h-64 mx-auto rounded-lg"
                    preload="metadata"
                  >
                    <source src={preview} type={formData.file?.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {fileType === "audio" && (
                  <audio controls className="w-full mt-4">
                    <source src={preview} type={formData.file?.type} />
                    Your browser does not support the audio tag.
                  </audio>
                )}

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload
                  className={`w-12 h-12 mx-auto ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="nft-file-input"
                />
                <label
                  htmlFor="nft-file-input"
                  className={`cursor-pointer inline-block px-6 py-3 rounded-xl font-semibold transition ${
                    isDarkMode
                      ? "bg-sky-600 hover:bg-sky-700 text-white"
                      : "bg-sky-400 hover:bg-sky-500 text-white"
                  }`}
                >
                  Choose file
                </label>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Supported formats: images, videos, audio
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isDarkMode
              ? "bg-sky-600 hover:bg-sky-700 text-white"
              : "bg-sky-400 hover:bg-sky-500 text-white"
          }`}
        >
          List NFT
        </button>
      </form>
    </div>
  );
};
