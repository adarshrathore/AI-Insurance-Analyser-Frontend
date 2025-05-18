import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Create this file for styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Rateguard Analytics</h1>
        <p>Your AI-powered insurance assistant</p>
      </header>

      <section className="home-section">
        <h2>Explore Our Tools</h2>
        <div className="button-group">
          <button onClick={() => navigate("/page1")}>Page 1 (Coming Soon)</button>
          <button onClick={() => navigate("/summarizer")}>AI Policy Summarizer</button>
          <button onClick={() => navigate("/comparator")}>Policy Comparator</button>
          <button onClick={() => navigate("/Review")}>Review Page</button>
          <button onClick={() => navigate("/chatbot")}>AI Chatbot</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
