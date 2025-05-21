import React, { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/summarize", formData);
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
      <form onSubmit={handleUpload}>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Summarizing..." : "Summarize PDF"}
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
