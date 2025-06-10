import React, { useState } from "react";

function Comparator() {
  const [policy1, setPolicy1] = useState("");
  const [policy2, setPolicy2] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!policy1 || !policy2) {
      alert("Please enter both policy names");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://rateguard-analytics-backend.onrender.com/api/compare/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy1, policy2 }),
      });

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setResult("Comparison failed.");
      }
    } catch (err) {
      setResult("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold font-serif text-gray-800 mb-6">
          🔍 Compare Two Insurance Policies
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Policy 1 Name:</label>
          <input
            type="text"
            placeholder="Enter name of Policy 1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans text-gray-800"
            value={policy1}
            onChange={(e) => setPolicy1(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Policy 2 Name:</label>
          <input
            type="text"
            placeholder="Enter name of Policy 2"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans text-gray-800"
            value={policy2}
            onChange={(e) => setPolicy2(e.target.value)}
          />
        </div>

        <button
          onClick={handleCompare}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          {loading ? "Comparing..." : "Compare"}
        </button>

        {result && (
          <div className="mt-8 bg-gray-50 p-6 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-serif">Comparison Table:</h3>
            <div
              className="text-gray-700 font-sans"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Comparator;
