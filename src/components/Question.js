// src/components/Question.js
import React from "react";

const Question = ({ question, options, handleAnswer, isAnswered }) => {
  return (
    <div style={{ margin: "20px", padding: "20px", borderRadius: "15px", backgroundColor: "#e56b6f", boxShadow: "0 4px 6px rgba(181, 101, 118, 1)" }}>
      <h2 style={{ textAlign: "center" }}>{question}</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.value)}
            disabled={isAnswered}
            style={{
              backgroundColor: "#eaac8b",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px 20px",
              marginBottom: "10px",
              width: "100%",
              cursor: isAnswered ? "not-allowed" : "pointer",
              fontFamily: 'Courier New',
              fontWeight: 400,
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
// color pallet https://coolors.co/palette/355070-6d597a-b56576-e56b6f-eaac8b