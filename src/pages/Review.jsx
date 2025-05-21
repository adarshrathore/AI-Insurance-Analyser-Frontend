import React, { useState, useEffect } from "react";
import "./Review.css";

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
    <div className="review-container">
      <h2>📝 Policy Reviews</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Policy Name"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="">Rate out of 5</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <button type="submit">Submit Review</button>
      </form>

      <div className="review-list">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev, idx) => (
            <div key={idx} className="review-item">
              <h4>{rev.policyName}</h4>
              <p>{rev.comment}</p>
              <p>
                ⭐ {rev.rating} by <strong>{rev.username}</strong>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Review;
