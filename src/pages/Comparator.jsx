import React, { useState } from "react";
import "./Comparator.css";

function Comparator() {
  const [policy1, setPolicy1] = useState("");
  const [policy2, setPolicy2] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!policy1 || !policy2) {
      alert("Please enter both policies");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/compare", {
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
    <div className="comparator-container">
      <h2>Compare Two Insurance Policies</h2>
      <textarea
        placeholder="Enter Policy 1"
        value={policy1}
        onChange={(e) => setPolicy1(e.target.value)}
      />
      <textarea
        placeholder="Enter Policy 2"
        value={policy2}
        onChange={(e) => setPolicy2(e.target.value)}
      />
      <button onClick={handleCompare} disabled={loading}>
        {loading ? "Comparing..." : "Compare"}
      </button>

      <div className="comparison-result">
        <h3>Comparison Table</h3>
        <div dangerouslySetInnerHTML={{ __html: result }} />
      </div>
    </div>
  );
}

export default Comparator;
