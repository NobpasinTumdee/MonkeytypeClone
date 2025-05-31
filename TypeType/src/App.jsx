import { useEffect, useState, useRef } from "react";
import { message } from 'antd';
import './App.css';
import ButtonClear from './button/ButtonClear';

const sampleText = "Once upon a time in a village there was a sweet little girl named Little Red Riding Hood";

export default function MonkeyTypeClone() {
  //set up data
  const [text] = useState(sampleText);
  const typingRef = useRef(null);

  useEffect(() => {
    typingRef.current?.focus();
  }, []);


  //เริ่มต้นตัวแปร
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  //clear input
  const [DisplayScore, setDisplayScore] = useState(false);

  const clear = () => {
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setDisplayScore(false);
    success();
  };

  //Message from antd
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Clear Your Gorilla!',
    });
  };



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
      setDisplayScore(true);
    }
  };

  const getWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const words = userInput.trim().split(/\s+/).length;
    return Math.round(words / timeInMinutes);
  };

  const getAcc = () => {
    if (!startTime || !endTime) return 0;
    let correct = 0;
    for (let i = 0; i < text.length; i++) {
      if (userInput[i] === text[i]) correct++;
    }
    return Math.round((correct / text.length) * 100);
  };


  return (
    <>
      {contextHolder}
      <h1 className="header">GorillaType</h1>
      <div className="mainpage">
        {!DisplayScore ? (
          <>
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
            <div onClick={clear} className="reset"><ButtonClear /></div>
          </>
        ) : (
          <>
            <div className="result">
              <h2>Finished!</h2>
              <span>
                <h2>WPM</h2>
                <h1>{getWPM()}</h1>
              </span>
              <span>
                <h2>Accuracy</h2>
                <h1>{getAcc()}%</h1>
              </span>
              <div onClick={clear}><ButtonClear /></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
