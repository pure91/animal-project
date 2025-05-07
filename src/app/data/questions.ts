/** 질문 데이터 모음 */

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
        question: "나갈 준비 다 해가는데 약속이 취소됐을 때?",
        dimension: "I/E",
        options: [
            {text: "집에서 쉴 생각에 오히려 행복하다", score: {In: 2}},
            {text: "미리 말해주지.. 좀 그렇지만 좋긴하다", score: {In: 1}},
            {text: "뭐 어쩔 수 없지", score: {}},
            {text: "다른 사람을 찾아서 나갈 생각을 한다", score: {Ex: 1}},
            {text: "아우 심심해! 혼자라도 밖에 나간다", score: {Ex: 2}},
        ]
    },
    {
        question: "단톡방에 글이 +300개인걸 봤을때 어떤가요?",
        dimension: "I/E",
        options: [
            {text: "또 떠들고 있겠거니 한다", score: {In: 2}},
            {text: "읽을 생각에 귀찮다", score: {In: 1}},
            {text: "별 생각 없다", score: {}},
            {text: "무슨 말을 했을지 기대된다", score: {Ex: 1}},
            {text: "반응할 생각에 벌써 신난다", score: {Ex: 2}},
        ]
    },
    {
        question: "혼자서 영화관 가는거 어색한가요?",
        dimension: "I/E",
        options: [
            {text: "전혀 안 어색함", score: {In: 2}},
            {text: "좀 편하다", score: {In: 1}},
            {text: "보통이다", score: {}},
            {text: "누구라도 같이 가야함", score: {Ex: 1}},
            {text: "혼자는 절대 못감", score: {Ex: 2}},
        ]
    },
    {
        question: "반나절 이상 방콕하면 행복한가요?",
        dimension: "I/E",
        options: [
            {text: "이게 휴식이지~", score: {In: 2}},
            {text: "꽤 좋다", score: {In: 1}},
            {text: "보통이다", score: {}},
            {text: "슬슬 나갈까?", score: {Ex: 1}},
            {text: "어우 답답해서 나가야함", score: {Ex: 2}},
        ]
    },
    {
        question: "사람들 많은데 가면 에너지가 충전되나요?",
        dimension: "I/E",
        options: [
            {text: "배터리 방전난다", score: {In: 2}},
            {text: "살짝 피곤하다", score: {In: 1}},
            {text: "그럭저럭 괜찮다", score: {}},
            {text: "벌써 신난다", score: {Ex: 1}},
            {text: "행복 에너지 충전 MAX다", score: {Ex: 2}},
        ]
    },

    // S vs N
    {
        question: "가게 간판에 오타가 보이면 신경 쓰이나요?",
        dimension: "S/N",
        options: [
            {text: "바로 눈에 띄고 불편함, 한글 요정", score: {Se: 2}},
            {text: "꽤 신경 쓰인다", score: {Se: 1}},
            {text: "가끔 눈에 들어온다", score: {}},
            {text: "오타든 뭐든 넘긴다", score: {Nu: 1}},
            {text: "오히려 상상력을 자극함", score: {Nu: 2}},
        ]
    },
    {
        question: "내일 비 온대요. 당신의 반응은?",
        dimension: "S/N",
        options: [
            {text: "우산 챙겨야겠다!", score: {Se: 2}},
            {text: "신발 젖겠다… 불편하네", score: {Se: 1}},
            {text: "비? 뭐 어쩔", score: {}},
            {text: "비 오는 감성… 집에서 플레이리스트 틀어야지", score: {Nu: 1}},
            {text: "비 오는 날에는 뭔가 운명적인 일이 생기더라", score: {Nu: 2}},
        ]
    },
    {
        question: "상상으로 대서사시 만드는 걸 좋아하나요?",
        dimension: "S/N",
        options: [
            {text: "별로 그런 거 없음", score: {Se: 2}},
            {text: "적당히 상상함", score: {Se: 1}},
            {text: "보통이다", score: {}},
            {text: "혼자 영화 찍는다", score: {Nu: 1}},
            {text: "상상하다 나의 세계관까지 만듦", score: {Nu: 2}},
        ]
    },
    {
        question: "갑자기 외계인 얘기하면 어떻게 반응하나요?",
        dimension: "S/N",
        options: [
            {text: "왜 저럴까", score: {Se: 2}},
            {text: "음... 신기하네", score: {Se: 1}},
            {text: "그냥 듣는다", score: {}},
            {text: "같이 상상에 뛰어든다", score: {Nu: 1}},
            {text: "외계인 세계관 바로 구축해버림", score: {Nu: 2}},
        ]
    },
    {
        question: "친구가 전화를 안 받는다. 당신의 생각은?",
        dimension: "S/N",
        options: [
            {text: "배터리 없나보다~", score: {Se: 2}},
            {text: "바쁘겠지 뭐~", score: {Se: 1}},
            {text: "모르겠음", score: {}},
            {text: "혹시 사고 난 건 아니겠지...?", score: {Nu: 1}},
            {text: "아니 혹시 내가 뭐 잘못했나...?", score: {Nu: 2}},
        ]
    },

    // F vs T
    {
        question: "친구가 울 때 제일 먼저 드는 생각은?",
        dimension: "F/T",
        options: [
            {text: "괜찮아? 위로해야지", score: {Em: 2}},
            {text: "일단 달래자", score: {Em: 1}},
            {text: "당황한다", score: {}},
            {text: "왜 울어? 원인 분석", score: {Lo: 1}},
            {text: "해결책부터 찾는다", score: {Lo: 2}},
        ]
    },
    {
        question: "문제 생기면 어떻게 하나요?",
        dimension: "F/T",
        options: [
            {text: "감정부터 정리", score: {Em: 2}},
            {text: "일단 진정", score: {Em: 1}},
            {text: "그냥 넘어간다", score: {}},
            {text: "바로 해결책 모색", score: {Lo: 1}},
            {text: "손익계산부터 따짐", score: {Lo: 2}},
        ]
    },
    {
        question: "드라마 볼 때 감정 이입 많이 하나요?",
        dimension: "F/T",
        options: [
            {text: "주인공 감정이 곧 내 감정", score: {Em: 2}},
            {text: "꽤 몰입한다", score: {Em: 1}},
            {text: "가끔씩 감정 이입", score: {}},
            {text: "스토리 구조 분석", score: {Lo: 1}},
            {text: "연출법을 파악한다", score: {Lo: 2}},
        ]
    },
    {
        question: "팀플하다 의견 충돌나면?",
        dimension: "F/T",
        options: [
            {text: "분위기 먼저 걱정", score: {Em: 2}},
            {text: "눈치를 살핀다", score: {Em: 1}},
            {text: "중립", score: {}},
            {text: "팩트로 바로 정리함", score: {Lo: 1}},
            {text: "효율성으로 밀어붙임", score: {Lo: 2}},
        ]
    },
    {
        question: "결정을 내릴 때 어떤 기준을 많이 따르나요?",
        dimension: "F/T",
        options: [
            {text: "사람의 감정을 우선 시 한다", score: {Em: 2}},
            {text: "당사자의 기분 먼저 생각해본다", score: {Em: 1}},
            {text: "그때그때 다르다", score: {}},
            {text: "이치에 맞는지를 본다", score: {Lo: 1}},
            {text: "논리와 객관성을 중시한다", score: {Lo: 2}},
        ]
    },

    // J vs P
    {
        question: "음식점에서 메뉴 고를 때 당신은?",
        dimension: "J/P",
        options: [
            {text: "이미 오기 전에 메뉴 정해옴", score: {St: 2}},
            {text: "도착하자마자 빠르게 결정!", score: {St: 1}},
            {text: "이것도 괜찮고 저것도 괜찮고..", score: {}},
            {text: "고르기전에 주변 테이블 음식들을 훑어봄", score: {Fr: 1}},
            {text: "직원 오기 직전부터 급하게 고른다", score: {Fr: 2}},
        ]
    },
    {
        question: "드라마 정주행할 때 당신은?",
        dimension: "J/P",
        options: [
            {text: "회차별로 하루 몇 편 볼지 정해놓음", score: {St: 2}},
            {text: "자기 전에 딱 정해진 시간까지만 본다", score: {St: 1}},
            {text: "그때그때 다른 편", score: {}},
            {text: "본김에 새벽까지 폭주해버림", score: {Fr: 1}},
            {text: "시즌 끝날 때까지 멈출 수 없음", score: {Fr: 2}},
        ]
    },
    {
        question: "외출할 때 옷 고르는 스타일은?",
        dimension: "J/P",
        options: [
            {text: "전날 밤에 코디 다 맞춰놓음", score: {St: 2}},
            {text: "일어나서 머리속으로 정해놓고 나간다", score: {St: 1}},
            {text: "그때그때 기분따라 다름", score: {}},
            {text: "나가기 직전 여러벌 갈아입는다", score: {Fr: 1}},
            {text: "아무거나 입고 나간다", score: {Fr: 2}},
        ]
    },
    {
        question: "여행 전날 밤, 당신의 짐싸기 스타일은?",
        dimension: "J/P",
        options: [
            {text: "며칠 전부터 체크리스트 써놓고 팩킹 완료", score: {St: 2}},
            {text: "전날부터 야금야금 챙겨놓음", score: {St: 1}},
            {text: "대충 생각만 해놓음", score: {}},
            {text: "당일날 급하게 던져넣는다", score: {Fr: 1}},
            {text: "대충 뭐 없으면 가서 사면 되지~", score: {Fr: 2}},
        ]
    },
    {
        question: "친구가 갑자기 '지금 나올 수 있어?' 하면?",
        dimension: "J/P",
        options: [
            {text: "큰 일이 아니면 거절하고 싶다", score: {St: 2}},
            {text: "얘기를 들어보고 고민 후 나간다고 한다", score: {St: 1}},
            {text: "상황에 따라 다름", score: {}},
            {text: "얘기를 듣다가 30초 안에 ㅇㅋ 어디야?", score: {Fr: 1}},
            {text: "다 필요없고 나가려고 준비부터함", score: {Fr: 2}},
        ]
    }
];

export default questions;