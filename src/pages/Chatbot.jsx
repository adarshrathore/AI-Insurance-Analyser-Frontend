import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage(""); // Clear input

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
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
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Insurance Chatbot</h2>

      <div className="bg-gray-100 rounded p-4 h-[60vh] overflow-y-auto mb-4 shadow">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white border text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question..."
          className="flex-grow border p-2 rounded shadow"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
