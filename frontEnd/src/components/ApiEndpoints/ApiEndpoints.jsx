import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ApiEndpoints() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState(""); // For storing new key name
  const [isGenerating, setIsGenerating] = useState(false); // To show loading state when generating API key

  useEffect(() => {
    // Fetch the existing API keys when the component mounts
    const fetchApiKeys = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/getApiKeys", {
          withCredentials: true // Ensure credentials are sent (cookies if you're using JWTs)
        });
        setApiKeys(response.data.apiKeys); // Assuming response.data.apiKeys is an array of API keys
      } catch (error) {
        console.error("Error fetching API keys:", error);
        toast.error("Failed to fetch API keys.");
      }
    };

    fetchApiKeys();
  }, []);

  const handleCopy = (apiKey) => {
    navigator.clipboard.writeText(apiKey)
      .then(() => {
        toast.success("API key copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        toast.error("Failed to copy API key.");
      });
  };

  const handleGenerateApiKey = async () => {
    if (!newKeyName) {
      toast.error("Please provide a key name!");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/generateNewApiKey",
        { keyName: newKeyName },
        { withCredentials: true } // Ensure credentials are sent
      ); 
      const newKey = response.data.apiKey;
      setApiKeys((prevKeys) => [...prevKeys, newKey]); // Append the new key to the existing list
      setNewKeyName(""); // Clear the input field after generating the key
      toast.success("New API key generated successfully!");
    } catch (error) {
      console.error("Error generating API key:", error);
      toast.error("Failed to generate new API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container m-10 mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">API Key Manager</h1>

      {/* New API Key Generation Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter key name"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          className="p-2 border border-gray-600 rounded w-full mb-3"
        />
        <button
          onClick={handleGenerateApiKey}
          disabled={isGenerating}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-500"
        >
          {isGenerating ? "Generating..." : "Generate New API Key"}
        </button>
      </div>

      {/* List of API Keys */}
      <div className="space-y-4">
        {apiKeys.length > 0 ? (
          apiKeys.map((apiKey) => (
            <div key={apiKey._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
              <div className="flex flex-col">
                <span className="font-semibold">{apiKey.keyName}</span>
                <span className="text-sm text-gray-400">{apiKey.apiKey}</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleCopy(apiKey.apiKey)}
                  className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                  <i className="fa fa-copy"></i> Copy
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No API keys found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default ApiEndpoints;
