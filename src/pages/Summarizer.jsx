import React, { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [policyText, setPolicyText] = useState("");
  const [language, setLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!policyText.trim()) return alert("Please enter policy text");

    try {
      setLoading(true);
      const res = await axios.post("https://rateguard-analytics-backend.onrender.com/api/summarize", {
        policyText,
        language,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      alert("Summarization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold font-serif text-gray-800 mb-6">
          📄 AI Policy Summarizer
        </h2>

        <form onSubmit={handleSummarize} className="space-y-4">
          <textarea
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-sans"
            placeholder="Paste your policy text here..."
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium font-sans">
              Select Language:
            </label>
            <select
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            {loading ? "Summarizing..." : "Summarize Text"}
          </button>
        </form>

        {summary && (
          <div className="mt-8 bg-gray-50 p-6 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-serif">Summary:</h3>
            <pre className="whitespace-pre-wrap text-gray-700 font-sans">{summary}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summarizer;
