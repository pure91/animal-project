/** MBTI 질문을 위한 단순 데이터 모음 */

const questions = [
    // I vs E
    {
        question: "혼자 있을 때 에너지가 충전되나요?",
        options: ["예", "아니오"],
        scores: ["I", "E"],
    },
    {
        question: "사람들과의 대화가 즐겁나요?",
        options: ["예", "아니오"],
        scores: ["E", "I"],
    },
    {
        question: "혼자 여행을 떠나는 것을 좋아하나요?",
        options: ["예", "아니오"],
        scores: ["I", "E"],
    },
    {
        question: "사교 모임이 끝난 후 피곤함을 느끼나요?",
        options: ["예", "아니오"],
        scores: ["I", "E"],
    },
    {
        question: "모르는 사람과 이야기하는 것이 어렵나요?",
        options: ["예", "아니오"],
        scores: ["I", "E"],
    },

    // S vs N
    {
        question: "사실이나 현실에 집중하는 편인가요?",
        options: ["예", "아니오"],
        scores: ["S", "N"],
    },
    {
        question: "추상적인 아이디어를 다루는 것이 흥미롭나요?",
        options: ["예", "아니오"],
        scores: ["N", "S"],
    },
    {
        question: "지금 이 순간에 집중하는 것을 좋아하나요?",
        options: ["예", "아니오"],
        scores: ["S", "N"],
    },
    {
        question: "상상하는 것을 즐기나요?",
        options: ["예", "아니오"],
        scores: ["N", "S"],
    },
    {
        question: "현실적인 조언을 선호하나요?",
        options: ["예", "아니오"],
        scores: ["S", "N"],
    },

    // F vs T
    {
        question: "결정할 때 감정을 중시하나요?",
        options: ["예", "아니오"],
        scores: ["F", "T"],
    },
    {
        question: "논리적으로 생각하는 것을 선호하나요?",
        options: ["예", "아니오"],
        scores: ["T", "F"],
    },
    {
        question: "사람들의 감정을 고려하나요?",
        options: ["예", "아니오"],
        scores: ["F", "T"],
    },
    {
        question: "객관적 사실을 더 중시하나요?",
        options: ["예", "아니오"],
        scores: ["T", "F"],
    },
    {
        question: "타인에게 상처를 주는 것을 걱정하나요?",
        options: ["예", "아니오"],
        scores: ["F", "T"],
    },

    // J vs P
    {
        question: "계획 세우는 것을 좋아하나요?",
        options: ["예", "아니오"],
        scores: ["J", "P"],
    },
    {
        question: "즉흥적인 선택을 선호하나요?",
        options: ["예", "아니오"],
        scores: ["P", "J"],
    },
    {
        question: "정리 정돈을 중요하게 생각하나요?",
        options: ["예", "아니오"],
        scores: ["J", "P"],
    },
    {
        question: "마감 직전에 일을 처리하는 편인가요?",
        options: ["예", "아니오"],
        scores: ["P", "J"],
    },
    {
        question: "미리 준비하는 것을 좋아하나요?",
        options: ["예", "아니오"],
        scores: ["J", "P"],
    },
];

export default questions;