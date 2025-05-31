import React, { useEffect, useState, useRef } from "react";
import './App.css';

const sampleText = "lorem ipsum dolor sit ";

export default function MonkeyTypeClone() {
  const [text] = useState(sampleText);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const typingRef = useRef(null);

  useEffect(() => {
    typingRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (!startTime) setStartTime(Date.now());

    let nextInput = userInput;

    if (e.key === "Backspace") {
      nextInput = nextInput.slice(0, -1);
    } else if (e.key.length === 1) {
      nextInput += e.key;
    }

    setUserInput(nextInput);

    if (nextInput.length === text.length) {
      setEndTime(Date.now());
    }dfsgdfg
  };

  const getWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const words = userInput.trim().split(/\s+/).length;
    return Math.round(words / timeInMinutes);
  };

  return (
    <>
      <h1 className="header">MonkeyType Clone</h1>
      <div className="mainpage">
        <div
          ref={typingRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="typing-box"
        >
          {text.split("").map((char, index) => {
            let className = "";
            if (index < userInput.length) {
              className = userInput[index] === char ? "correct-char" : "wrong-char";
            } else if (index === userInput.length) {
              className = "current-char";
            }
            return (
              <span key={index} className={className}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        {endTime && (
          <div className="result">
            <h2>Finished!</h2>
            <p>Words per minute (WPM): {getWPM()}</p>
          </div>
        )}
      </div>
    </>
  );
}
