import React, { useEffect, useState, useRef } from "react";

const sampleText = "this is a simple monkeytype clone";

export default function MonkeyTypeClone() {
  const [text] = useState(sampleText.split(" "));
  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());

    if (value.endsWith(" ")) {
      const currentWord = value.trim();
      if (currentWord === text[currentWordIndex]) {
        setCurrentWordIndex((prev) => prev + 1);
        setInput("");
        if (currentWordIndex + 1 === text.length) {
          setEndTime(Date.now());
          setIsFinished(true);
        }
      } else {
        setInput(""); // reset wrong input
      }
    } else {
      setInput(value);
    }
  };

  const getWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    return Math.round(text.length / timeInMinutes);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">MonkeyType Clone</h1>

      <div className="mb-4">
        {text.map((word, index) => (
          <span
            key={index}
            className={
              index === currentWordIndex
                ? "text-blue-500 underline"
                : index < currentWordIndex
                ? "text-gray-400"
                : ""
            }
          >
            {word + " "}
          </span>
        ))}
      </div>

      {!isFinished ? (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="border px-2 py-1"
        />
      ) : (
        <div>
          <h2 className="text-lg font-semibold mt-4">Finished!</h2>
          <p>Words per minute (WPM): {getWPM()}</p>
        </div>
      )}
    </div>
  );
}
