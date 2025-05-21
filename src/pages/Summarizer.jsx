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
      const res = await axios.post("http://localhost:3000/api/summarize", {
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
    <div className="container">
      <h2>📄 AI Policy Summarizer</h2>
      <form onSubmit={handleSummarize}>
        <textarea
          rows={10}
          placeholder="Paste your policy text here..."
          value={policyText}
          onChange={(e) => setPolicyText(e.target.value)}
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Summarizing..." : "Summarize Text"}
        </button>
      </form>

      {summary && (
        <div className="summary-box">
          <h3>Summary:</h3>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
