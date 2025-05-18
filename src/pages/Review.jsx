import React, { useState, useEffect } from "react";
import "./Review.css";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [policyName, setPolicyName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Failed to load reviews:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to submit a review.");
      return;
    }

    const res = await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ policyName, comment, rating })
    });

    const data = await res.json();
    if (res.ok) {
      setReviews([...reviews, data]);
      setPolicyName("");
      setComment("");
      setRating(0);
    } else {
      alert(data.error || "Submission failed.");
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
        <select value={rating} onChange={(e) => setRating(e.target.value)} required>
          <option value="">Rate out of 5</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <button type="submit">Submit Review</button>
      </form>

      <div className="review-list">
        {reviews.map((rev, idx) => (
          <div key={idx} className="review-item">
            <h4>{rev.policyName}</h4>
            <p>{rev.comment}</p>
            <p>⭐ {rev.rating} by {rev.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
