/** MBTI 질문을 위한 단순 데이터 모음 */
// 25.04.29 re-run 임시

export interface Option {
    text: string;
    score: { [key: string]: number };
}

export interface Question {
    question: string;
    dimension: string;
    options: Option[];
}

const questions: Question[] = [
    // I vs E
    {
        question: "준비 다 했는데 친구가 약속 갑자기 취소하면 어때요?",
        dimension: "I/E",
        options: [
            {text: "집에서 쉴 생각에 속으로는 행복하다", score: {I: 2}},
            {text: "오히려 잘됐다 싶다", score: {I: 1}},
            {text: "괜찮다", score: {}},
            {text: "좀 서운하지만 다른 사람 만나려고 연락한다", score: {E: 1}},
            {text: "아우 심심해! 무조건 밖에 나간다", score: {E: 2}},
        ]
    },
    {
        question: "단톡방 알림이 울리면 기분이 어떤가요?",
        dimension: "I/E",
        options: [
            {text: "또 떠들고 있겠거니 한다", score: {I: 2}},
            {text: "살짝 귀찮다", score: {I: 1}},
            {text: "별 생각 없다", score: {}},
            {text: "무슨 말을 했을지 기대된다", score: {E: 1}},
            {text: "벌써 신난다", score: {E: 2}},
        ]
    },
    {
        question: "혼자 영화관 가는 거 어색한가요?",
        dimension: "I/E",
        options: [
            {text: "전혀 안 어색", score: {I: 2}},
            {text: "좀 편하다", score: {I: 1}},
            {text: "보통이다", score: {}},
            {text: "누구라도 같이 가야", score: {E: 1}},
            {text: "혼자는 절대 못감", score: {E: 2}},
        ]
    },
    {
        question: "반나절 이상 집콕하면 행복한가요?",
        dimension: "I/E",
        options: [
            {text: "이게 바로 휴식이지", score: {I: 2}},
            {text: "꽤 좋다", score: {I: 1}},
            {text: "보통이다", score: {}},
            {text: "슬슬 나가야지", score: {E: 1}},
            {text: "답답해서 못 산다", score: {E: 2}},
        ]
    },
    {
        question: "사람 많은데 가면 에너지 충전되나요?",
        dimension: "I/E",
        options: [
            {text: "배터리 방전난다", score: {I: 2}},
            {text: "살짝 피곤하다", score: {I: 1}},
            {text: "그럭저럭 괜찮다", score: {}},
            {text: "신나서 춤춘다", score: {E: 1}},
            {text: "행복 MAX다", score: {E: 2}},
        ]
    },

    // S vs N
    {
        question: "길 가다가 가게 간판 오타 보면 신경 쓰이나요?",
        dimension: "S/N",
        options: [
            {text: "바로 눈에 띄고 불편함", score: {S: 2}},
            {text: "좀 신경 쓰인다", score: {S: 1}},
            {text: "가끔 눈에 들어온다", score: {}},
            {text: "오타든 뭐든 넘긴다", score: {N: 1}},
            {text: "오히려 상상력을 자극함", score: {N: 2}},
        ]
    },
    {
        question: "내일 비 온대요. 당신의 반응은?",
        dimension: "S/N",
        options: [
            {text: "우산 챙겨야겠다!", score: {S: 2}},
            {text: "신발 젖겠다… 불편하네", score: {S: 1}},
            {text: "비? 뭐 어쩔 (중립)", score: {}},
            {text: "비 오는 날 감성… 집에서 플레이리스트 틀어야지", score: {N: 1}},
            {text: "비 오는 날에는 항상 뭔가 운명적인 일이 생기더라", score: {N: 2}},
        ]
    },
    {
        question: "상상으로 대서사시 만드는 걸 좋아하나요?",
        dimension: "S/N",
        options: [
            {text: "별로 그런 거 없음", score: {S: 2}},
            {text: "상상은 적당히", score: {S: 1}},
            {text: "보통이다", score: {}},
            {text: "혼자 영화 찍는다", score: {N: 1}},
            {text: "상상하다 세계관 만듦", score: {N: 2}},
        ]
    },
    {
        question: "갑자기 외계인 얘기하면 어떻게 반응하나요?",
        dimension: "S/N",
        options: [
            {text: "왜 저럴까", score: {S: 2}},
            {text: "음... 신기하네", score: {S: 1}},
            {text: "그냥 듣는다", score: {}},
            {text: "같이 상상 뛰어든다", score: {N: 1}},
            {text: "외계인 세계관 바로 구축", score: {N: 2}},
        ]
    },
    {
        question: "친구가 갑자기 전화를 안 받는다. 당신의 생각은?",
        dimension: "S/N",
        options: [
            {text: "배터리 없나보다~", score: {S: 2}},
            {text: "바쁘겠지 뭐~", score: {S: 1}},
            {text: "모르겠음", score: {}},
            {text: "혹시 사고 난 건 아니겠지...?", score: {N: 1}},
            {text: "아니 혹시 내가 뭐 실수했나...?", score: {N: 2}},
        ]
    },

    // F vs T
    {
        question: "친구가 울 때 제일 먼저 드는 생각은?",
        dimension: "F/T",
        options: [
            {text: "괜찮아? 위로해야지", score: {F: 2}},
            {text: "일단 달래자", score: {F: 1}},
            {text: "당황한다", score: {}},
            {text: "왜 울어? 원인 분석", score: {T: 1}},
            {text: "해결책부터 찾는다", score: {T: 2}},
        ]
    },
    {
        question: "문제 생기면 어떻게 하나요?",
        dimension: "F/T",
        options: [
            {text: "감정부터 정리", score: {F: 2}},
            {text: "일단 진정", score: {F: 1}},
            {text: "그냥 넘어간다", score: {}},
            {text: "바로 해결책 모색", score: {T: 1}},
            {text: "손익계산부터", score: {T: 2}},
        ]
    },
    {
        question: "드라마 볼 때 감정 이입 많이 하나요?",
        dimension: "F/T",
        options: [
            {text: "주인공 감정이 내 감정", score: {F: 2}},
            {text: "살짝 몰입한다", score: {F: 1}},
            {text: "가끔 감정 이입", score: {}},
            {text: "스토리 구조 분석", score: {T: 1}},
            {text: "연출법만 본다", score: {T: 2}},
        ]
    },
    {
        question: "팀플하다 의견 충돌나면?",
        dimension: "F/T",
        options: [
            {text: "분위기 먼저 걱정", score: {F: 2}},
            {text: "다들 괜찮은지 본다", score: {F: 1}},
            {text: "중립", score: {}},
            {text: "팩트로 바로 정리", score: {T: 1}},
            {text: "효율성으로 밀어붙임", score: {T: 2}},
        ]
    },
    {
        question: "감정 기복이 심한 편인가요?",
        dimension: "F/T",
        options: [
            {text: "롤러코스터 수준", score: {F: 2}},
            {text: "조금 있다", score: {F: 1}},
            {text: "보통이다", score: {}},
            {text: "감정 기복 적음", score: {T: 1}},
            {text: "늘 평정심", score: {T: 2}},
        ]
    },

    // J vs P
    {
        question: "음식점에서 메뉴 고를 때 당신은?",
        dimension: "J/P",
        options: [
            {text: "이미 오기 전에 메뉴 정해옴", score: {J: 2}},
            {text: "도착하자마자 빠르게 결정!", score: {J: 1}},
            {text: "이것도 괜찮고 저것도 괜찮고..", score: {}},
            {text: "고르다 말고 주변 테이블 음식도 훑어봄", score: {P: 1}},
            {text: "직원 오기 직전에 급하게 고른다", score: {P: 2}},
        ]
    },
    {
        question: "드라마 정주행할 때 당신은?",
        dimension: "J/P",
        options: [
            {text: "회차별로 하루 몇 편 볼지 스케줄 짬", score: {J: 2}},
            {text: "자기 전에 딱 정해진 시간만 본다", score: {J: 1}},
            {text: "그때그때 다른 편", score: {}},
            {text: "본김에 새벽까지 폭주해버림", score: {P: 1}},
            {text: "시즌 끝날 때까지 멈출 수 없음", score: {P: 2}},
        ]
    },
    {
        question: "외출할 때 옷 고르는 스타일은?",
        dimension: "J/P",
        options: [
            {text: "전날 밤에 코디 다 맞춰놓음", score: {J: 2}},
            {text: "아침에 깔끔하게 정해놓고 나간다", score: {J: 1}},
            {text: "그때그때 기분따라 다름", score: {}},
            {text: "나가기 직전 10벌 갈아입는다", score: {P: 1}},
            {text: "아무거나 입고 나가서 후회함", score: {P: 2}},
        ]
    },
    {
        question: "여행 전날 밤, 당신의 짐싸기 스타일은?",
        dimension: "J/P",
        options: [
            {text: "일주일 전부터 체크리스트 써놓고 완벽하게 팩킹 완료", score: {J: 2}},
            {text: "전날 아침에 미리 다 챙겨놓음", score: {J: 1}},
            {text: "대충 생각은 해놨다", score: {}},
            {text: "당일 새벽에 급하게 던져넣는다", score: {P: 1}},
            {text: "일단 가서 사면 되지~", score: {P: 2}},
        ]
    },
    {
        question: "친구가 갑자기 '지금 나올래?' 하면?",
        dimension: "J/P",
        options: [
            {text: "스케줄 없는 쉬는날이어도 거절하고 싶다", score: {J: 2}},
            {text: "한 10분 고민 후 나간다고 한다", score: {J: 1}},
            {text: "상황에 따라 다름", score: {}},
            {text: "30초 안에 ㅇㅋ 어디야?", score: {P: 1}},
            {text: "이미 나가려고 준비부터함", score: {P: 2}},
        ]
    }
];

export default questions;