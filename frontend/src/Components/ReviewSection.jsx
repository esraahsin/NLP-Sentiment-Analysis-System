import React, { useState } from "react";
import "./Navbar.css";
import axios from "axios";

export default function ReviewSection() {
  const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem("reviews")) || []);
  const [newComment, setNewComment] = useState("");
  const [filter, setFilter] = useState("all");

  const addReview = (name, rating, comment, sentiment, lexicalAnalysis) => {
    const newReviews = [...reviews, { name, rating, comment, sentiment, lexicalAnalysis }];
    setReviews(newReviews);
    localStorage.setItem("reviews", JSON.stringify(newReviews));
  };

  const clearReviews = () => {
    if (window.confirm("Delete all comments?")) {
      setReviews([]);
      localStorage.removeItem("reviews");
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const analyzeLexical = async (text) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/lexical", { text });
      return response.data.lexicalAnalysis;
    } catch (error) {
      console.error("Error analyzing lexical:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const sentimentResponse = await axios.post("http://127.0.0.1:5000/analyze", { text: newComment });
        const sentiment = sentimentResponse.data.combined_sentiment;
        const lexicalAnalysis = sentimentResponse.data.lexical_analysis;
        const syntactic_analysis = sentimentResponse.data.syntactic_analysis;
        let rating;
        let emoji;
  
        // Determine rating and emoji based on sentiment
        if (sentiment === "Positive") {
          rating = 5;
          emoji = "😊";
        } else if (sentiment === "Negative") {
          rating = 1;
          emoji = "😞";
        } else {
          rating = 3; // Neutral
          emoji = "😐";
        }
  
        addReview("User", rating, newComment, sentiment);
        // Display lexical and syntactic analysis (including tokens) in an alert
        alert(`Lexical Analysis: Tokens: -${syntactic_analysis.tokens}- \nSyntactic Analysis POS Tags: ${syntactic_analysis.pos_tags}, Dependencies: ${syntactic_analysis.dependencies}, Named Entities: ${JSON.stringify(syntactic_analysis.named_entities)}`);
        setNewComment("");
      } catch (error) {
        console.error("Error analyzing comment:", error);
      }
    }
  };
  
  


  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true;
    return review.sentiment === filter;
  });

  return (
    <section className="review">
      <h1 className="heading">Client <span>Reviews</span></h1>
      <div className="filter-buttons">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Tous</button>
        <button className={`filter-btn ${filter === "Positive" ? "active" : ""}`} onClick={() => setFilter("Positive")}>Positifs</button>
        <button className={`filter-btn ${filter === "Negative" ? "active" : ""}`} onClick={() => setFilter("Negative")}>Négatifs</button>
      </div>
      <div className="box-container">
        {filteredReviews.map((review, index) => (
          <div className="box" key={index}>
            <p><strong>{review.name}</strong> - Note : {review.rating}/5 {review.sentiment === "Positive" ? "😊" : review.sentiment === "Negative" ? "😞" : "😐"}</p>
            <p>
              {review.comment} <br />
              <em>Sentiment: {review.sentiment}</em><br />
            </p>
            <i className="fas fa-quote-right"></i>
          </div>
        ))}
      </div>
      <div className="add-review">
        <form onSubmit={handleSubmit}>
          <textarea
            className="comment-textfield"
            placeholder="Write your comment ..."
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button className="submit-btn" type="submit">Submit Comment</button>
        </form>
      </div>
      <button onClick={clearReviews}>Delete All Comments </button>
    </section>
  );
}
