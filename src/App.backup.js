import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all your page components
import Home from "./pages/Home";
import Summarizer from "./pages/Summarizer";
import Comparator from "./pages/Comparator";
import Page1 from "./pages/Page1";
import Page4 from "./pages/Page4";
import Chatbot from "./pages/Chatbot";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/comparator" element={<Comparator />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
