import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CodeEditor() {
  const navigate = useNavigate();
  const [code, setCode] = useState("function sum() { return 1 + 1 }");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("https://ai-powered-code-reviewer-dj6x.onrender.com/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => navigate("/")} className="back-btn">← Home</button>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {loading ? "⏳ Loading review..." : review}
          </Markdown>
        </div>
      </main>

      <style>
        {`
          .back-btn {
            position: absolute;
            top: 20px;
            left: 20px;
            background: #444;
            color: white;
            padding: 10px 15px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
          }
          .back-btn:hover {
            background: #666;
          }
          .review {
            margin-top: 10px;
            background: #007bff;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            display: inline-block;
          }
          .review:hover {
            background: #0056b3;
          }
        `}
      </style>
    </>
  );
}

export default CodeEditor;
