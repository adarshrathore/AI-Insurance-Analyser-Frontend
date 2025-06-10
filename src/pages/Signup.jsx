import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://rateguard-analytics-backend.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token to context
        login(data.token);

        // ✅ Optionally store username for display
        localStorage.setItem("username", data.result.username);
        localStorage.setItem("email", data.result.email);

        navigate("/review");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-container min-h-screen bg-blue-100 flex items-center justify-center px-4">
      
      <form onSubmit={handleSignup} className="w-half max-w-2xl bg-white p-12 rounded-2xl shadow-2xl font-sans">
        <h2 className="text-3xl font-bold font-serif text-gray-800 mb-8 text-center">
        Sign Up
         </h2>
         
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-6 px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-6 px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-8 px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>

  );
}

export default Signup;
