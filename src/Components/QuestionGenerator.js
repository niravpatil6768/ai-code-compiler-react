import React, { useState } from "react";
import axios from "axios";

const QuestionGenerator = () => {
  const [topic, setTopic] = useState("JavaScript");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to call Cohere AI API and generate a question
  const generateQuestion = async () => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate", // Cohere AI API endpoint
        {
          model: "command-r-plus", // The model you want to use (can be changed)
          prompt: `Generate a random programming question on the topic: ${topic}`,
          max_tokens: 100, // Set the maximum tokens for the response
          temperature: 0.7, // Controls the randomness of the response
        },
        {
          headers: {
            Authorization: `Bearer zYldpU2VrErn2rw0uUhfIi8VlczVRZaOP3ZMHjCS`, // Replace with your Cohere API key
            "Content-Type": "application/json",
          },
        }
      );

      // Extract and display the generated question
      setQuestion(response.data.text.trim());
    } catch (err) {
      setError("Failed to generate question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Generate Programming Question</h1>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="topic">Topic: </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ marginRight: "10px" }}
        />
      </div>

      <button
        onClick={generateQuestion}
        disabled={loading}
        style={{ marginBottom: "10px" }}
      >
        {loading ? "Generating..." : "Generate Question"}
      </button>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {question && (
        <div>
          <h3>Generated Question:</h3>
          <p>{question}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionGenerator;
