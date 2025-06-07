import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

// const Navbar = () => {
//   const { authToken, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/summarizer">Summarizer</Link>
//       <Link to="/comparator">Comparator</Link>
//       <Link to="/chatbot">Chatbot</Link>
//       <Link to="/page1">Page1</Link>
//       <Link to="/review">Review</Link>
//       {!authToken ? (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Signup</Link>
//         </>
//       ) : (
//         <button onClick={handleLogout}>Logout</button>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
// import insurance from "/images/insurance-bg.jpg";  // ✅ correct variable name

const Navbar = () => {
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          {/* <h1 to="/" className="logo">Rateguard</h1> */}
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active head" : "head")}>RATEGUARD ANALYTICS</NavLink>
        </div>
        <div className="navbar-right">
          <div className="list-container">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
            <NavLink to="/" state={{ scrollTo: "services" }} className={({ isActive }) => (isActive ? "" : "")}>
              Services
            </NavLink>
            {!authToken ? (
                    <>
                      <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>
                      <NavLink to="/signup">Signup</NavLink>
                    </>
                  ) : (
                    <NavLink onClick={handleLogout}>Logout</NavLink>
                  )}
          </div>

        </div>
      </nav>


    </div>
  );
};

export default Navbar;
