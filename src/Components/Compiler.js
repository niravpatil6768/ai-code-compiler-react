import React, { useState } from "react";

const Compiler = ({ code }) => {
  const [output, setOutput] = useState("");

  const executeCode = () => {
    try {
      // Evaluate code safely
      const result = eval(code);
      setOutput(result);
    } catch (err) {
      setOutput(err.message);
    }
  };

  return (
    <div>
      <button onClick={executeCode} style={{ marginBottom: "1rem" }}>
        Run Code
      </button>
      <div>
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
