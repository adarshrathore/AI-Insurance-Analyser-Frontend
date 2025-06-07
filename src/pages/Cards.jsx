import React from "react";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "AI Policy Summarizer",
      description: "Quickly summarize long insurance policies using AI.",
      route: "/summarizer",
    },
    {
      title: "Policy Comparator",
      description: "Compare features, pricing and coverage side by side.",
      route: "/comparator",
    },
    {
      title: "User Review Insights",
      description: "View aggregated reviews and customer sentiment.",
      route: "/review",
    },
    {
      title: "AI Chatbot",
      description: "Interact with our intelligent assistant for quick help.",
      route: "/chatbot",
    },
  ];

  return (
    <div className="cards-section flex flex-wrap bg-blue-100 px-8 py-12">
      {/* Left Side - Heading */}
      <div className="left-heading w-full lg:w-1/2 mb-8 lg:mb-0 flex items-center">
        <h1 className="text-4xl font-bold text-gray-800 leading-snug font-serif m-9"> 
          Leveraging the power of <br></br> technology, data, and innovation 
        </h1>
      </div>

      {/* Right Side - Cards Grid */}
      <div className="cards w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className=" cursor-pointer bg-white shadow-md rounded-lg p-6 h-72 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <h3 className="text-lg font-semibold text-blue-700">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;