import React, { useState, useEffect } from "react";

// Import JSON files
import googleDriveData from "../data/google_drive.json";
import twitterData from "../data/twitter.json";
import redditData from "../data/reddit.json";
import chatGPTData from "../data/chatgpt.json";
import googleMapsData from "../data/google_maps.json";
import instagramData from "../data/instagram.json";
import facebookData from "../data/facebook.json";
import tiktokData from "../data/tiktok.json";
import uberData from "../data/uber.json";
import youtubeData from "../data/youtube.json";

const appData = {
  Tiktok: tiktokData,
  uber: uberData,
  youtube: youtubeData,
  Drive: googleDriveData,
  twitter: twitterData,
  reddit: redditData,
  chatgpt: chatGPTData,
  Maps: googleMapsData,
  instagram: instagramData,
  facebook: facebookData,
};

export default function CapacityEstimator() {
  const [selectedApp, setSelectedApp] = useState("youtube");
  const [estimation, setEstimation] = useState(appData[selectedApp]);

  // Update estimation data when app selection changes
  useEffect(() => {
    setEstimation(appData[selectedApp]);
  }, [selectedApp]);

  return (
    <div className="min-h-screen flex bg-gray-50 p-8">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg rounded-2xl p-6 h-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Applications</h2>
        <ul>
          {Object.keys(appData).map((app) => (
            <li key={app} className="mb-3">
              <button
                className={`w-full text-left p-3 rounded-xl text-lg font-medium transition duration-200
                  ${selectedApp === app 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                onClick={() => setSelectedApp(app)}
              >
                {app.charAt(0).toUpperCase() + app.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white shadow-lg rounded-2xl p-8 ml-8">
        <h1 className="text-4xl font-bold mb-10 text-gray-900">{estimation.title}</h1>

        {/* Assumptions Section */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Assumptions</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            {estimation.assumptions.map((assumption, index) => (
              <li key={index} className="mb-2">{assumption}</li>
            ))}
          </ul>
        </div>

        {/* Storage Estimation Section */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm mb-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Storage Estimation</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            {Object.entries(estimation.storage_estimation).map(([key, value]) => (
              <li key={key} className="mb-2">
                <strong className="capitalize">{key.replace(/_/g, " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Queries Per Second Section */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Queries Per Second</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            {Object.entries(estimation.query_per_second).map(([key, value]) => (
              <li key={key} className="mb-2">
                <strong className="capitalize">{key.replace(/_/g, " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}