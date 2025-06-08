-- สร้างตาราง User
CREATE TABLE User (
  UserID INTEGER PRIMARY KEY AUTOINCREMENT,
  UserName TEXT,
  Password TEXT,
  Email TEXT,
  Profile TEXT,
  Level INTEGER,
  TestCompleted INTEGER
);

-- ตาราง PlayerScore
CREATE TABLE PlayerScore (
  ScoreID INTEGER PRIMARY KEY AUTOINCREMENT,
  OneHundredAcc INTEGER,
  OneHundredWpm INTEGER,
  FiftyWpm INTEGER,
  FiftyAcc INTEGER,
  TwentyFiveAcc INTEGER,
  TwentyFiveWpm INTEGER,
  TenAcc INTEGER,
  TenWpm INTEGER,
  UserID INTEGER,
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- ตาราง Language
CREATE TABLE Language (
  LanguageID INTEGER PRIMARY KEY AUTOINCREMENT,
  TextLanguage TEXT
);

-- ตาราง Words
CREATE TABLE Words (
  WordID INTEGER PRIMARY KEY AUTOINCREMENT,
  Word TEXT,
  LanguageID INTEGER,
  FOREIGN KEY (LanguageID) REFERENCES Language(LanguageID)
);

-- ตาราง ModeWords
CREATE TABLE ModeWords (
  ModeID INTEGER PRIMARY KEY AUTOINCREMENT,
  NameMode TEXT,
  Total TEXT
);

-- ตาราง HistoryType
CREATE TABLE HistoryType (
  HistoryID INTEGER PRIMARY KEY AUTOINCREMENT,
  Wpm INTEGER,
  Accuracy INTEGER,
  Chars INTEGER,
  Date TEXT,
  ModelID INTEGER,
  FOREIGN KEY (ModelID) REFERENCES ModeWords(ModeID)
);

-- ตาราง AllWord
CREATE TABLE AllWord (
  HisWordID INTEGER PRIMARY KEY AUTOINCREMENT,
  HistoryID INTEGER,
  WordID INTEGER,
  FOREIGN KEY (HistoryID) REFERENCES HistoryType(HistoryID),
  FOREIGN KEY (WordID) REFERENCES Words(WordID)
);
