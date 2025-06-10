import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://rateguard-analytics-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include" // optional if you're using cookies
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token in context
        login(data.token);

        // ✅ Optionally store user info
        localStorage.setItem("username", data.result.username);
        localStorage.setItem("email", data.result.email);

        navigate("/review");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container min-h-screen bg-blue-100 flex items-center justify-center px-4">
      
      <form onSubmit={handleLogin} className="w-half max-w-2xl bg-white p-12 rounded-2xl shadow-2xl font-sans">
        <h2 className="text-3xl font-bold font-serif text-gray-800 mb-8 text-center">
        Log In to Your Account
         </h2>
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
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:3001/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         navigate("/review");
//       } else {
//         alert(data.error);
//       }
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
//       <form
//         onSubmit={handleLogin}
//         className="w-half max-w-2xl bg-white p-12 rounded-2xl shadow-2xl font-sans"
//       >
//         <h2 className="text-3xl font-bold font-serif text-gray-800 mb-8 text-center">
//           Log In to Your Account
//         </h2>

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//           className="w-full mb-6 px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           className="w-full mb-8 px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200"
//         >
//           Log In
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;