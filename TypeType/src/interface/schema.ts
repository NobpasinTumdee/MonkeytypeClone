// ไม่ได้ใช้ T _ T ลืมไปว่าใช้ React + jsx

export interface UserInterface {
    ID?:                number;
    user_name?:         string;
    password?:          string;
    email?:             string;
    picture?:           string;
    level?:             number;
    test_completed?:    number;
    day_start?:         Date;
}
export interface PlayerScoreInterface {
    acc_score?:         number;
    wpm_score?:         number;
    time_stamp?:        Date;

    user_id?:           number;
    User?:              UserInterface;

    mode_id?:           number;
    ModeWords?:         ModeWordsInterface;
}
export interface HistoryTypeInterface {
    wpm?:               number;
    accuracy?:          number;
    chars?:             number;
    date_time?:         Date;

    user_id?:           number;
    User?:              UserInterface;

    mode_id?:           number;
    ModeWords?:         ModeWordsInterface;
}
export interface ModeWordsInterface {
    name_mode?:         string;
    total?:             number;
}
export interface AllWordInterface {
    history_id?:        number;
    HistoryType?:       HistoryTypeInterface;

    word_id?:           number;
    Words?:             WordsInterface;
}
export interface WordsInterface {
    word?:              string;
    
    language_id?:       number;
    Language?:          LanguageInterface;
}
export interface LanguageInterface {
    text_language?:     string;
}