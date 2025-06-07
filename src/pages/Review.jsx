import React, { useState, useEffect } from "react";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/api/reviews", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in.");
        }
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to load reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to submit a review.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ policyName, comment, rating }),
      });

      const data = await res.json();

      if (res.ok) {
        setReviews((prev) => [...prev, data]);
        setPolicyName("");
        setComment("");
        setRating("");
      } else {
        alert(data.error || "Submission failed.");
      }
    } catch (err) {
      alert("An error occurred while submitting the review.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">📝 Policy Reviews</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 mb-10 border border-gray-200"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Policy Name"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Rate out of 5</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-600 font-medium">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-600 font-medium">No reviews yet.</p>
        ) : (
          reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 border border-blue-300 rounded-xl p-5 shadow-md"
            >
              <h4 className="text-lg font-bold text-gray-800 mb-2">{rev.policyName}</h4>
              <p className="text-gray-700 mb-2">{rev.comment}</p>
              <p className="text-sm text-gray-600">
                ⭐ {rev.rating} by{" "}
                <span className="font-semibold text-gray-900">{rev.username}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Review;
