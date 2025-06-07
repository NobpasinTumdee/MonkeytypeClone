import { useEffect, useState, useRef } from "react";
import { message } from 'antd';
import './App.css';
import ButtonClear from './button/ButtonClear';
import { words } from "./Words";


export default function MonkeyTypeClone() {
  //set up data
  const typingRef = useRef(null);
  const [text, setrandomWordsText] = useState("");

  // random words
  const [count, setCount] = useState(15);

  const getRandomWords = (n) => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(n, words.length));
  };

  const handleGenerate = (Num = count) => {
    let sum = "";
    const result = getRandomWords(Number(Num));
    for (let index = 0; index < result.length; index++) {
      const W = result[index];
      sum += W + " ";
    }
    setrandomWordsText(sum.trim()) // .trim() ลบช่องว่างท้ายสุด
  };

  //========อีกวิธีที่ง่ายกว่าแต่ไม่ทำเพราะถ้ากลับมาอ่านเดะงง===========
  // const sumWord = () => {
  //   const sentence = randomWords.join(" ");
  //   setRandomWordsText(sentence);
  // };
  //=======================================================


  // select amount word 
  const ChangeNword = (Num) => {
    setCount(Num);
    handleGenerate(Num);
  }

  useEffect(() => {
    typingRef.current?.focus();
    handleGenerate();
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


  // fuc การพิมพ์ words
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


  // คำนวน wpm ac
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
      {!DisplayScore &&
        <div className="UserSetting">
          <p style={{ fontSize: "1rem", opacity: "0.5" }}>
            Max words = {words.length} words
          </p>
          <p style={{ fontSize: "1.4rem", margin: "10px" }}>{count} Words</p>

          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="wordCount" onChange={() => ChangeNword(15)} />
              <span>15</span>
            </label>

            <label className="radio-option">
              <input type="radio" name="wordCount" onChange={() => ChangeNword(25)} />
              <span>25</span>
            </label>

            <label className="radio-option">
              <input type="radio" name="wordCount" onChange={() => ChangeNword(50)} />
              <span>50</span>
            </label>
          </div>

          <div>
            <button className="modern-button" onClick={handleGenerate}>Re Words</button>
          </div>
        </div>
      }
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
            {text.length ? (
              <div></div>
            ) : (
              <div className="getstart" onClick={handleGenerate()}>Click here to start</div>
            )}
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
