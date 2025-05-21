/** 동점을 위한 추가 질문 데이터 모음 */

// 타입 재사용 인터페이스 정의
export interface Option {
    text: string;
    score: { [key: string]: number };
}

export interface Question {
    question: string;
    options: Option[];
}

// 추가 질문 data
const addQuestions: Question[] = [
    // W vs X
    {
        question: "혼잣말 하다가 들켰다!",
        options: [
            {text: "얼굴 빨개짐", score: {W: 1}},
            {text: "들어도 상관없음", score: {X: 1}},
        ]
    },

    // A vs I
    {
        question: "길에서 독특한 돌을 본 너의 반응은?",
        options: [
            {text: "오, 신기하게 생겼네", score: {A: 1}},
            {text: "혹시 이 돌에 어떤 의미가...?", score: {I: 1}},
        ]
    },

    // F vs T
    {
        question: "지인이 울고 있음. 이유는 모름",
        options: [
            {text: "갑자기 나도 눈물 날 것 같음", score: {F: 1}},
            {text: "울기 전에 원인 분석부터", score: {T: 1}},
        ]
    },

    // S vs U
    {
        question: "친구가 지금 당장 떠나자고 함",
        options: [
            {text: "일단 짐 싸야지. 경로도 알아보고", score: {S: 1}},
            {text: "오케이~ 바지 챙기면서 나갈 준비", score: {U: 1}},
        ]
    }
];

export default addQuestions;