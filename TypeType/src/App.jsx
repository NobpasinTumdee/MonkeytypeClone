import React, { useEffect, useState, useRef } from "react";
import './App.css'
const sampleText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel pariatur optio at velit molestiae dicta minima veniam laudantium amet, perspiciatis nesciunt aperiam quis provident id.";

export default function MonkeyTypeClone() {
  const [text] = useState(sampleText);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    setUserInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (userInput.trim() === text.trim()) {
        setEndTime(Date.now());
      }
    }
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
        <div className="display-text">
          {text.split("").map((char, index) => {
            let className = "";
            if (index < userInput.length) {
              className = userInput[index] === char ? "text-green-500" : "text-red-500";
            } else if (index === userInput.length) {
              className = "underline text-blue-500";
            }
            return (
              <span key={index} className={className}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="inputkey"
          placeholder="Start typing here..."
        />

        {endTime && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Finished!</h2>
            <p>Words per minute (WPM): {getWPM()}</p>
          </div>
        )}
      </div>
    </>
  );
}
