// src/components/Feedback.js
import React from "react";

const Feedback = ({ answer, feedback }) => {
  return <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f5cdde" }}>
    {feedback[answer]}
  </div>;
};

export default Feedback;
