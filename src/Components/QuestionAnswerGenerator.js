import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setQuestion, setCodeSuggestion } from "../Redux/questionSlice";


const QuestionAnswerGenerator = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("JavaScript");
  const [que, setQue] = useState("");
  const [codeSuggestion, setCodeSuggestion] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [error, setError] = useState(null);

  // Function to generate a random programming question
  const generateQuestion = async () => {
    setLoadingQuestion(true);
    setError(null); // Reset previous errors

    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate", // Cohere AI API endpoint
        {
          model: "command-r-plus", // Use a valid model ID
          prompt: `Generate a random DSA different topic programming question on the topic: ${topic} with a code example in 300 letters`,
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer zYldpU2VrErn2rw0uUhfIi8VlczVRZaOP3ZMHjCS`, // Replace with your Cohere API key
            "Content-Type": "application/json",
          },
        }
      );

      // Extract and display the generated question
      setQue(response.data.text.trim());
      dispatch(setQuestion(response.data.text.trim()));
    } catch (err) {
      setError("Failed to generate question. Please try again.");
    } finally {
      setLoadingQuestion(false);
    }
  };

  // Function to generate code suggestion for the question
  const generateCodeSuggestion = async () => {
    if (!que) {
      setError("Please generate a question first.");
      return;
    }

    setLoadingCode(true);
    setError(null); // Reset previous errors

    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate", // Cohere AI API endpoint
        {
          model: "command-r-plus", // Use a valid model ID
          prompt: `give me a code for ${que} in 300 letters`,
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer zYldpU2VrErn2rw0uUhfIi8VlczVRZaOP3ZMHjCS`, // Replace with your Cohere API key
            "Content-Type": "application/json",
          },
        }
      );

      // Extract and display the generated code suggestion
      setCodeSuggestion(response.data.text.trim());
    } catch (err) {
      setError("Failed to generate code suggestion. Please try again.");
    } finally {
      setLoadingCode(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Programming Question & Code Suggestion Generator</h1>

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
        disabled={loadingQuestion}
        style={{ marginBottom: "10px" }}
      >
        {loadingQuestion ? "Generating Question..." : "Generate Question"}
      </button>

      {que && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Generated Question:</h3>
          <p>{que}</p>
        </div>
      )}

      {que && (
        <button
          onClick={generateCodeSuggestion}
          disabled={loadingCode}
          style={{ marginBottom: "10px" }}
        >
          {loadingCode
            ? "Generating Code Suggestion..."
            : "Generate Code Suggestion"}
        </button>
      )}

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {codeSuggestion && (
        <div>
          <h3>Code Suggestion:</h3>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {codeSuggestion}
          </pre>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerGenerator;
