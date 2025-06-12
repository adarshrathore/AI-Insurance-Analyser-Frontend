import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cards from "./Cards";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === "services" && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handlePredictionClick = () => {
    navigate("/predict"); // Make sure /predict route exists
  };

  return (
    <div className="home-wrapper pt-[80px]">
      <section className="hero-section">
        <div className="hero-overlay flex">
          <div className="hero-content">
            <div className="heroimg flex justify-between items-center px-6 py-8">
              {/* Left Text Section */}
              <div className="w-1/2 text-left pr-6">
                <h2 className="text-4xl font-bold font-serif mb-4 text-gray-800">
                  Smarter Insurance Decisions with AI
                </h2>
                <p className="text-lg font-medium font-sans text-gray-700 leading-relaxed mb-6">
                  Empower your insurance journey with our intelligent tools for
                  summarizing, comparing, and understanding policies.
                </p>

                {/* 👇 Price Prediction Button */}
                {/* <button
  onClick={() => {
    window.location.href = "https://1b7b-2409-40c4-5d-e9d5-5518-807-3828-4044.ngrok-free.app";
  }}
  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
>
  Price Prediction
</button> */}
              </div>

              {/* Right Image Section */}
              <div className="w-1/2 flex justify-end">
                <img
                  src="/images/fintech.jpg"
                  alt="Insurance"
                  className="img1"
                />
              </div>
            </div>

            {/* 👇 Ref for scroll-to-services */}
            <div ref={cardRef}>
              <Cards />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
