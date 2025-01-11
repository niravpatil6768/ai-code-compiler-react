import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
} from "../liveblocks.config";

// Create a wrapper component to handle Liveblocks room functionality
const LiveCodeEditor = (props) => {
  return (
    <RoomProvider
      id="code-editor-room"
      initialPresence={{ cursor: null, isTyping: false }}
      initialStorage={{ code: props.code }}
    >
      <CodeEditorWithLive {...props} />
    </RoomProvider>
  );
};

const CodeEditorWithLive = ({ code, setCode, selectedLanguage, question }) => {
  const [output, setOutput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const dispatch = useDispatch();

  const { currentQuestion } = useSelector((state) => state.question);

  console.log(currentQuestion);

  // Liveblocks hooks
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const storage = useStorage();

  // Track users who are typing
  useEffect(() => {
    updateMyPresence({ isTyping: true });
    const timeout = setTimeout(() => {
      updateMyPresence({ isTyping: false });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [code, updateMyPresence]);

  // Function to get the appropriate language extension
  const getLanguageExtension = () => {
    switch (selectedLanguage.toLowerCase()) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      default:
        return javascript();
    }
  };

  const checkAnswer = async () => {
    if (!currentQuestion) {
      alert("Please generate a question first!");
      return;
    }

    setIsChecking(true);
    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate", // Cohere AI API endpoint,
        {
          model: "command-r-plus", // Use a valid model ID
          prompt: `Please check answer for ${currentQuestion} answer is ${code} and give me the result with test cases`,
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer zYldpU2VrErn2rw0uUhfIi8VlczVRZaOP3ZMHjCS`,
            "Content-Type": "application/json",
          },
        }
      );

      setOutput(response.data.text || response.data.message);
    } catch (error) {
      setOutput("Error checking the answer. Please try again.");
      console.error("Error checking answer:", error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="active-users" style={{ marginBottom: "10px" }}>
        Active Users: {others.count + 1}
        {others.map((user) => (
          <span key={user.connectionId} style={{ marginLeft: "10px" }}>
            {user.presence.isTyping ? "typing..." : ""}
          </span>
        ))}
      </div>

      <CodeMirror
        value={code}
        height="400px"
        theme="dark"
        extensions={[getLanguageExtension()]}
        onChange={(value) => {
          setCode(value);
          // Update storage when code changes
          storage.set("code", value);
        }}
        style={{ fontSize: "14px" }}
      />

      <div className="editor-controls" style={{ marginTop: "10px" }}>
        <button
          onClick={checkAnswer}
          disabled={isChecking || !currentQuestion}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentQuestion ? "pointer" : "not-allowed",
            opacity: currentQuestion ? 1 : 0.6,
          }}
        >
          {isChecking ? "Checking..." : "Check Answer"}
        </button>
      </div>

      {output && (
        <div
          className="output-container"
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <h3>Evaluation:</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default LiveCodeEditor;
