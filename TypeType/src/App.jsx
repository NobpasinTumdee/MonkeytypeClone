import { useEffect, useState } from "react";
import './App.css';
import Typingbox from "./Page/Typing/Typingbox";
import { GetUserAll } from "./services/index";
import Profile from "./Page/Profile/Profile";
import user from "./assets/user.png"
import Footerbox from "./Page/Footerbox";


export default function MonkeyTypeClone() {
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

      <div>
        <Typingbox isOpen={true} />
      </div>

      {/* <div className="testtextthai">
        <Profile />
      </div> */}

      <div>
        <Footerbox />
      </div>
    </>
  );
}
