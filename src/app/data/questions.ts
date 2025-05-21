/** 질문 데이터 모음 */

// 타입 재사용 인터페이스 정의
export interface Option {
    text: string;
    score: { [key: string]: number };
}

export interface Question {
    question: string;
    options: Option[];
}

// 질문 data
const questions: Question[] = [
    // W vs X
    {
        question: "처음 만난 사람들과 있을 때 어떤가요?",
        options: [
            {text: "말 걸 생각도 안함", score: {W: 5}},
            {text: "먼저 나서진 않는다", score: {W: 3}},
            {text: "상황 봐서 다름", score: {W: 1, X: 1}},
            {text: "어색하지만 먼저 말을 건다", score: {X: 3}},
            {text: "주도적으로 분위기를 띄운다", score: {X: 5}},
        ]
    },
    {
        question: "나갈 준비 다 해가는데 약속이 취소됐을 때?",
        options: [
            {text: "집에서 쉴 생각에 오히려 행복하다", score: {W: 5}},
            {text: "미리 말해주지.. 좀 그렇지만 좋긴하다", score: {W: 3}},
            {text: "뭐 어쩔 수 없지", score: {W: 1, X: 1}},
            {text: "다른 사람을 찾아서 나갈 생각을 한다", score: {X: 3}},
            {text: "아우 심심해! 혼자라도 밖에 나간다", score: {X: 5}},
        ]
    },
    {
        question: "혼자서 영화관 가는거 어색한가요?",
        options: [
            {text: "전혀 안 어색함", score: {W: 5}},
            {text: "좀 편하다", score: {W: 3}},
            {text: "보통이다", score: {W: 1, X: 1}},
            {text: "누구라도 같이 가야함", score: {X: 3}},
            {text: "혼자는 절대 못감", score: {X: 5}},
        ]
    },
    {
        question: "반나절 이상 방콕하면 행복한가요?",
        options: [
            {text: "이게 휴식이지~", score: {W: 5}},
            {text: "꽤 좋다", score: {W: 3}},
            {text: "보통이다", score: {W: 1, X: 1}},
            {text: "슬슬 나갈까?", score: {X: 3}},
            {text: "어우 답답해서 나가야함", score: {X: 5}},
        ]
    },
    {
        question: "사람들 많은데 가면 에너지가 충전되나요?",
        options: [
            {text: "배터리 방전난다", score: {W: 5}},
            {text: "살짝 피곤하다", score: {W: 3}},
            {text: "그럭저럭 괜찮다", score: {W: 1, X: 1}},
            {text: "벌써 신난다", score: {X: 3}},
            {text: "행복 에너지 충전 MAX다", score: {X: 5}},
        ]
    },

    // A vs I
    {
        question: "가게 간판에 오타가 보이면 신경 쓰이나요?",
        options: [
            {text: "바로 눈에 띄고 불편함, 한글 요정", score: {A: 5}},
            {text: "꽤 신경 쓰인다", score: {A: 3}},
            {text: "가끔 눈에 들어온다", score: {A: 1, I: 1}},
            {text: "오타든 뭐든 넘긴다", score: {I: 3}},
            {text: "오히려 상상력을 자극함", score: {I: 5}},
        ]
    },
    {
        question: "내일 비 온대요. 당신의 반응은?",
        options: [
            {text: "우산 챙겨야겠다!", score: {A: 5}},
            {text: "신발 젖겠다… 불편하네", score: {A: 3}},
            {text: "비? 뭐 어쩔", score: {A: 1, I: 1}},
            {text: "비 오는 감성… 집에서 플레이리스트 틀어야지", score: {I: 3}},
            {text: "비 오는 날에는 뭔가 운명적인 일이 생기더라", score: {I: 5}},
        ]
    },
    {
        question: "상상으로 대서사시 만드는 걸 좋아하나요?",
        options: [
            {text: "별로 그런 거 없음", score: {A: 5}},
            {text: "적당히 상상함", score: {A: 3}},
            {text: "보통이다", score: {A: 1, I: 1}},
            {text: "혼자 영화 찍는다", score: {I: 3}},
            {text: "상상하다 나의 세계관까지 만듦", score: {I: 5}},
        ]
    },
    {
        question: "갑자기 외계인 얘기하면 어떻게 반응하나요?",
        options: [
            {text: "왜 저럴까", score: {A: 5}},
            {text: "음... 신기하네", score: {A: 3}},
            {text: "그냥 듣는다", score: {A: 1, I: 1}},
            {text: "같이 상상에 뛰어든다", score: {I: 3}},
            {text: "외계인 세계관 바로 구축해버림", score: {I: 5}},
        ]
    },
    {
        question: "친구가 전화를 안 받는다. 당신의 생각은?",
        options: [
            {text: "배터리 없나보다~", score: {A: 5}},
            {text: "바쁘겠지 뭐~", score: {A: 3}},
            {text: "모르겠음", score: {A: 1, I: 1}},
            {text: "혹시 사고 난 건 아니겠지...?", score: {I: 3}},
            {text: "아니 혹시 내가 뭐 잘못했나...?", score: {I: 5}},
        ]
    },

    // F vs T
    {
        question: "친구가 울 때 제일 먼저 드는 생각은?",
        options: [
            {text: "괜찮아? 위로해야지", score: {F: 5}},
            {text: "일단 달래자", score: {F: 3}},
            {text: "당황한다", score: {F: 1, T: 1}},
            {text: "왜 울어? 원인 분석", score: {T: 3}},
            {text: "해결책부터 찾는다", score: {T: 5}},
        ]
    },
    {
        question: "드라마 볼 때 감정 이입 많이 하나요?",
        options: [
            {text: "주인공 감정이 곧 내 감정", score: {F: 5}},
            {text: "꽤 몰입한다", score: {F: 3}},
            {text: "가끔씩 감정 이입", score: {F: 1, T: 1}},
            {text: "스토리 구조 분석", score: {T: 3}},
            {text: "연출법을 파악한다", score: {T: 5}},
        ]
    },
    {
        question: "팀플하다 의견 충돌나면?",
        options: [
            {text: "분위기 먼저 걱정", score: {F: 5}},
            {text: "눈치를 살핀다", score: {F: 3}},
            {text: "중립", score: {F: 1, T: 1}},
            {text: "팩트로 바로 정리함", score: {T: 3}},
            {text: "효율성으로 밀어붙임", score: {T: 5}},
        ]
    },
    {
        question: "결정을 내릴 때 어떤 기준을 많이 따르나요?",
        options: [
            {text: "사람의 감정을 우선 시 한다", score: {F: 5}},
            {text: "당사자의 기분 먼저 생각해본다", score: {F: 3}},
            {text: "그때그때 다르다", score: {F: 1, T: 1}},
            {text: "이치에 맞는지를 본다", score: {T: 3}},
            {text: "논리와 객관성을 중시한다", score: {T: 5}},
        ]
    },
    {
        question: "친구가 연애 문제로 고민 상담하면 당신은?",
        options: [
            {text: "감정 공감 먼저 하고 들어준다", score: {F: 5}},
            {text: "우선 잘 들어주려 한다", score: {F: 3}},
            {text: "듣고 나서 어떻게 해야 할지 고민함", score: {F: 1, T: 1}},
            {text: "객관적인 해결책부터 생각함", score: {T: 3}},
            {text: "논리적으로 따져주며 정리해준다", score: {T: 5}},
        ]
    },

    // S vs U
    {
        question: "음식점에서 메뉴 고를 때 당신은?",
        options: [
            {text: "이미 오기 전에 메뉴 정해옴", score: {S: 5}},
            {text: "도착하자마자 빠르게 결정!", score: {S: 3}},
            {text: "이것도 괜찮고 저것도 괜찮고..", score: {S: 1, U: 1}},
            {text: "고르기전에 주변 테이블 음식들을 훑어봄", score: {U: 3}},
            {text: "직원 오기 직전부터 급하게 고른다", score: {U: 5}},
        ]
    },
    {
        question: "계획이 틀어졌을 때 당신의 반응은?",
        options: [
            {text: "스트레스를 받지만 다시 계획을 세운다", score: {S: 5}},
            {text: "차분히 다시 계획을 짠다", score: {S: 3}},
            {text: "아 뭐.. 어쩔 수 없지", score: {S: 1, U: 1}},
            {text: "상황에 맞게 그냥 흘러간다", score: {U: 3}},
            {text: "계획보다 재밌는 게 중요하지!", score: {U: 5}},
        ]
    },
    {
        question: "외출할 때 옷 고르는 스타일은?",
        options: [
            {text: "전날 밤에 코디 다 맞춰놓음", score: {S: 5}},
            {text: "일어나서 머리속으로 정해놓고 나간다", score: {S: 3}},
            {text: "그때그때 기분따라 다름", score: {S: 1, U: 1}},
            {text: "나가기 직전 여러벌 갈아입는다", score: {U: 3}},
            {text: "아무거나 입고 나간다", score: {U: 5}},
        ]
    },
    {
        question: "여행 전날 밤, 당신의 짐싸기 스타일은?",
        
        options: [
            {text: "며칠 전부터 체크리스트 써놓고 팩킹 완료", score: {S: 5}},
            {text: "전날부터 야금야금 챙겨놓음", score: {S: 3}},
            {text: "대충 생각만 해놓음", score: {S: 1, U: 1}},
            {text: "당일날 급하게 던져넣는다", score: {U: 3}},
            {text: "대충 뭐 없으면 가서 사면 되지~", score: {U: 5}},
        ]
    },
    {
        question: "친구가 갑자기 '지금 나올 수 있어?' 하면?",
        options: [
            {text: "큰 일이 아니면 거절하고 싶다", score: {S: 5}},
            {text: "얘기를 들어보고 고민 후 나간다고 한다", score: {S: 3}},
            {text: "상황에 따라 다름", score: {S: 1, U: 1}},
            {text: "얘기를 듣다가 30초 안에 ㅇㅋ 어디야?", score: {U: 3}},
            {text: "다 필요없고 나가려고 준비부터함", score: {U: 5}},
        ]
    }
];

export default questions;