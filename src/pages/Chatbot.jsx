import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const res = await axios.post("https://rateguard-analytics-backend.onrender.com/api/chat", {
        message,
      });

      const botReply = { role: "bot", text: res.data.reply };
      setChatHistory((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply = { role: "bot", text: "Sorry, something went wrong." };
      setChatHistory((prev) => [...prev, errorReply]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          💬 Insurance Chatbot
        </h2>

        <div
          className={`transition-all duration-300 rounded-xl p-4 h-[60vh] overflow-y-auto shadow-md border bg-white ${
            chatHistory.length > 0 ? "border-blue-400 ring-1 ring-blue-200" : "border-gray-200"
          }`}
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-sm whitespace-pre-line text-sm shadow-md ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-gray-800 border border-blue-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
