import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import { Highlight, themes } from "prism-react-renderer";
import starterCode from "./starter-code";

const CodeEditor = () => {
  const [code, setCode] = useState(starterCode);
  const textareaRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleCopyCode = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard.writeText(textareaRef.current.value).then(() => {
        console.log("Code copied to clipboard!");
      }).catch((error) => {
        console.error("Failed to copy:", error);
      });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "60%",
        height: "400px",
        margin: "0 auto",
        marginTop: "40px",
        overflow: "hidden"
      }}
    >
      <pre
        ref={codeRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          margin: 0,
          padding: "10px",
          zIndex: 1,
          backgroundColor: "#f5f5f5",
          pointerEvents: "none",
          color: "black",
          overflowY: "scroll",
          lineHeight: "1.5",
        }}
      >
        <Highlight theme={themes.github} code={code} language="javascript">
          {({ tokens, getLineProps, getTokenProps }) => (
            <div>
              {tokens.map((line, i) => {
                const padding = i + 1 >= 10 ? "4px" : "10px";
                return (
                <div {...getLineProps({ line, key: i })}>
                  <span
                    style={{
                        display: "table-cell",
                      textAlign: "right",
                        paddingRight: padding,
                      userSelect: "none",
                      opacity: 0.5,
                    }}
                  >
                    {i + 1}
                  </span>
                    <span
                      style={{
                        display: "table-cell",
                        position: "relative",
                        caretColor: "black",
                      }}
                    >
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
                );
              })}
            </div>
          )}
        </Highlight>
      </pre>
      <textarea
        ref={textareaRef}
        value={code}
        placeholder="Type some code...."
        onChange={handleChange}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          padding: "10px 10px 10px 30px",
          border: "transparent",
          outline: "none",
          resize: "none",
          background: "transparent",
          color: "transparent",
          caretColor: "black",
          lineHeight: "1.5",
          fontSize: "13px",
          fontFamily: "monospace",
        }}
        spellCheck="false"
      />
      <button
        onClick={handleCopyCode}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "12px",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        Copy Code
      </button>
    </div>
  );
};

export default CodeEditor;
