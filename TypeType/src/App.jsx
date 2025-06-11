import { useEffect, useState, useRef } from "react";
import { message } from 'antd';
import './App.css';
import ButtonClear from './button/ButtonClear';
import { words } from "./Words";
import { GetUserAll } from "./services/index";
import Profile from "./Page/Profile/Profile";
import user from "./assets/user.png"


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
    handleGenerate();
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


  // test api
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await GetUserAll();
    if (res?.status === 200) {
      setUsers(res.data);
    } else {
      console.error("โหลดข้อมูลไม่สำเร็จ", res?.status);
    }
  };

  return (
    <>
      {contextHolder}

      {/* ทดสอบเรียก api */}
      {/* <div style={{position:'fixed',color:'#fff'}}>
        <h1>รายชื่อผู้ใช้</h1>
        {users.map((user) => (
          <div key={user.ID}>
            <img src={user.picture} alt={user.user_name} width={100} />
            <h3>{user.user_name}</h3>
            <p>Email: {user.email}</p>
            <p>ระดับ: {user.level}</p>
          </div>
        ))}
      </div> */}

      <div className="header-nav">
        <div className="header">
          <p style={{ fontSize: '1.8rem', color: 'var(--text)', margin: '0', cursor: 'pointer' }}>GorillaType</p>
          <p style={{ fontSize: '1.5rem', color: 'var(--nextword)', margin: '0', cursor: 'pointer' }}>⌨</p>
          <p style={{ fontSize: '1.5rem', color: 'var(--nextword)', margin: '0', cursor: 'pointer' }}>ℹ</p>
        </div>
        <div className="profile-header-nav">
          <span></span>
          <span>👩🏻‍🚀PorGzz</span>
        </div>
      </div>
      {!DisplayScore &&
        <div className="option-bar">
          <div className="nav-option-bar">
            <p className="total-word-active">
              {words.length} words
            </p>
            <div className="space-bar"></div>
            <p className="total-word">@ punctuation</p>
            <p className="total-word-active"># numbers</p>
            <div className="space-bar"></div>
            <p className="total-word">time</p>
            <p className="total-word-active">A words</p>
            <p className="total-word">" quote</p>
            <p className="total-word">zen</p>
            <p className="total-word">custom</p>
            <div className="space-bar"></div>
            <div >
              <label>
                <input type="radio" name="wordCount" onChange={() => ChangeNword(10)} />
                <span>10</span>
              </label>

              <label>
                <input type="radio" name="wordCount" onChange={() => ChangeNword(25)} />
                <span>25</span>
              </label>

              <label>
                <input type="radio" name="wordCount" onChange={() => ChangeNword(50)} />
                <span>50</span>
              </label>
            </div>
            <div className="space-bar"></div>
            <div>
              <div onClick={handleGenerate}>Re Words</div>
            </div>
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
      {/* <div className="testtextthai">
        <Profile />
      </div> */}

      <footer>
        <div className="footer-content"><span className="text-background">Tab</span> + <span className="text-background">enter</span> - restart test</div>
        <div className="footer-content"><span className="text-background">esc</span> or <span className="text-background">ctrl</span> + <span className="text-background">shift</span> + <span className="text-background">p</span> - command line</div>
        <div style={{display:'flex',justifyContent:"space-between",color:'var(--nextword)',margin:'10px 10% 20px'}}>
          <div className="service-help">
            <span className="service-help-sub">contact</span>
            <span className="service-help-sub">support</span>
            <span className="service-help-sub">github</span>
            <span className="service-help-sub">discord</span>
            <span className="service-help-sub">twitter</span>
            <span className="service-help-sub">terms</span>
            <span className="service-help-sub">security</span>
            <span className="service-help-sub">privacy</span>
          </div>
          <div className="service-help">
            <span className="service-help-sub">alduin</span>
            <span className="service-help-sub">v0.0.1</span>
          </div>
        </div>
      </footer>
    </>
  );
}
