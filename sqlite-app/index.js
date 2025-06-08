// How to run 
// C:\Users\ACER\Documents\GitHub\MonkeytypeClone\sqlite-app>   node index.js
// open cmd with run 
// C:\Users\ACER\Documents\GitHub\MonkeytypeClone\sqlite-app>   sqlite3 database.db < schema.sql
// if don't want to run on cmd you can use >>"sqlite3 database.db"<< in vs-code terminal and use this >>".read schema.sql"<<

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// เปิด database (สร้างไฟล์ชื่อ database.db)
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to SQLite database.");
});

// CREATE - เพิ่ม User
app.post('/users', (req, res) => {
  const { UserName, Password, Email, Profile, Level, TestCompleted } = req.body;
  db.run(`INSERT INTO User (UserName, Password, Email, Profile, Level, TestCompleted)
          VALUES (?, ?, ?, ?, ?, ?)`,
    [UserName, Password, Email, Profile, Level, TestCompleted],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

// READ - ดึง User ทั้งหมด
app.get('/users', (req, res) => {
  db.all("SELECT * FROM User", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// UPDATE - แก้ไขข้อมูล User ตาม ID
app.put('/users/:id', (req, res) => {
  const { UserName, Password, Email, Profile, Level, TestCompleted } = req.body;
  db.run(`UPDATE User SET UserName = ?, Password = ?, Email = ?, Profile = ?, Level = ?, TestCompleted = ?
          WHERE UserID = ?`,
    [UserName, Password, Email, Profile, Level, TestCompleted, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    });
});

// DELETE - ลบ User ตาม ID
app.delete('/users/:id', (req, res) => {
  db.run(`DELETE FROM User WHERE UserID = ?`, req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
