import React, { useState } from "react";
import CodeEditor from "./Components/CodeEditor";
import Compiler from "./Components/Compiler";
import QuestionGenerator from "./Components/QuestionGenerator";
import QuestionAnswerGenerator from "./Components/QuestionAnswerGenerator";
import { LiveblocksProvider } from "./liveblocks.config";

const App = () => {
  const [code, setCode] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("javascript");
  const [question, setQuestion] = useState("");

  return (
    <LiveblocksProvider>
      <div style={{ padding: "1rem" }}>
        <h1>AI-Powered Code Editor</h1>

        {/* <QuestionGenerator setQuestion={setQuestion} /> */}
        <QuestionAnswerGenerator />

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="language">Choose Language: </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>

        <CodeEditor code={code} setCode={setCode} selectedLanguage={language} />
        {/* <Compiler code={code} language={language} /> */}
      </div>
    </LiveblocksProvider>
  );
};

export default App;
