import React, { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt) return alert("Please enter a question");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.result || "No response from AI");
    } catch (err) {
      setResponse("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Insurance Expert AI Chatbot</h2>
      <textarea
        placeholder="Ask me anything about insurance..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </button>
      <div className="chatbot-response">
        <h4>Response:</h4>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Chatbot;
