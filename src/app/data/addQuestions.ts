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
    // I vs O
    {
        question: "혼잣말 하다가 들켰다!",
        options: [
            {text: "얼굴 빨개지거나 당황하는 편", score: {I: 1}},
            {text: "딱히 뭐 들어도 상관없음", score: {O: 1}},
        ]
    },

    // R vs D
    {
        question: "길에서 독특한 돌을 본 너의 반응은?",
        options: [
            {text: "오, 신기하게 생겼네", score: {R: 1}},
            {text: "혹시 이 돌에 어떤 의미가...?", score: {D: 1}},
        ]
    },

    // E vs C
    {
        question: "지인이 울고 있음. 이유는 모름",
        options: [
            {text: "갑자기 나도 눈물 날 것 같음", score: {E: 1}},
            {text: "왜 울고 있는지 원인을 찾고 있음", score: {C: 1}},
        ]
    },

    // S vs A
    {
        question: "친구가 당장 어디든 떠나자고 함",
        options: [
            {text: "생각 좀 해보고 어디로 가서 뭘 할지 찾아봄", score: {S: 1}},
            {text: "오케이~ 바로 나갈 준비부터 함", score: {A: 1}},
        ]
    }
];

export default addQuestions;