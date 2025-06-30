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
    // I vs O
    {
        question: "처음 만난 사람들과 있을 때 어떤가요?",
        options: [
            {text: "말 걸 생각조차 안함", score: {I: 5}},
            {text: "보통 먼저 나서진 않는다", score: {I: 3}},
            {text: "상황에 따라 다름", score: {I: 1, O: 1}},
            {text: "어색하지만 말을 거는 편", score: {O: 3}},
            {text: "주도적으로 분위기를 띄운다", score: {O: 5}},
        ]
    },
    {
        question: "쉬는 날 아침, 친구가 카톡으로 급 만남 제안!",
        options: [
            {text: "겉으로 읽고 못 본 척 한다", score: {I: 5}},
            {text: "귀찮지만 고민해보고.. 답장은 해준다", score: {I: 3}},
            {text: "상황 봐서 결정", score: {I: 1, O: 1}},
            {text: "오? 오늘 할거 없었는데 나가볼까?", score: {O: 3}},
            {text: "오예!! 바로 씻고 나간다고 답장 완료!", score: {O: 5}},
        ]
    },
    // {
    //     question: "나갈 준비 다 해가는데 약속이 취소됐을 때?",
    //     options: [
    //         {text: "집에서 쉴 생각에 오히려 행복하다", score: {I: 5}},
    //         {text: "미리 말해주지.. 좀 그렇지만 좋긴하다", score: {I: 3}},
    //         {text: "뭐 어쩔 수 없지", score: {I: 1, O: 1}},
    //         {text: "다른 사람을 찾아서 나갈 생각을 한다", score: {O: 3}},
    //         {text: "아우 심심해! 혼자라도 밖에 나간다", score: {O: 5}},
    //     ]
    // },
    // {
    //     question: "혼자서 영화관 가는거 어색한가요?",
    //     options: [
    //         {text: "전혀 안 어색함", score: {I: 5}},
    //         {text: "좀 편하다", score: {I: 3}},
    //         {text: "보통이다", score: {I: 1, O: 1}},
    //         {text: "누구라도 같이 가야함", score: {O: 3}},
    //         {text: "혼자는 절대 못감", score: {O: 5}},
    //     ]
    // },
    {
        question: "동네 마트에서 애매한 사이의 아는 사람 마주침",
        options: [
            {text: "날 아직 못봤다면 다른 코너로 도망감", score: {I: 5}},
            {text: "먼저 아는척 안하면 그냥 모른 척함", score: {I: 3}},
            {text: "상황 봐서 인사하거나 말거나", score: {I: 1, O: 1}},
            {text: "어? 너 여기 왜 있어~? 먼저 말 건다", score: {O: 3}},
            {text: "바로 인사 + 잡담 + 친구들한테 공유", score: {O: 5}},
        ]
    },
    // {
    //     question: "반나절 이상 방콕하면 행복한가요?",
    //     options: [
    //         {text: "이게 휴식이지~", score: {I: 5}},
    //         {text: "꽤 좋다", score: {I: 3}},
    //         {text: "보통이다", score: {I: 1, O: 1}},
    //         {text: "슬슬 나갈까?", score: {O: 3}},
    //         {text: "어우 답답해서 나가야함", score: {O: 5}},
    //     ]
    // },
    {
        question: "모르는 010 번호로 전화가 왔다.",
        options: [
            {text: "핸드폰 무음 버튼 클릭 + 문자도 안 보냄", score: {I: 5}},
            {text: "일단 안 받고 인터넷에 번호 검색해봄", score: {I: 3}},
            {text: "받진 않지만, 누구세요? 문자는 보냄", score: {I: 1, O: 1}},
            {text: "한 번 받아봄. 혹시 뭐 재밌는 일?", score: {O: 3}},
            {text: "여보세요~ 누구세요~? 인싸 모드 발동", score: {O: 5}},
        ]
    },
    {
        question: "많은 사람이 모인 자리, 무대로 나오라고 했을 때",
        options: [
            {text: "영혼까지 도망감, 절대 안나감", score: {I: 5}},
            {text: "계속 버텨보다가 할 수 없으면 나감", score: {I: 3}},
            {text: "고민하다가 천천히 나가본다", score: {I: 1, O: 1}},
            {text: "조금 떨리긴한데 설레는 마음으로 나간다", score: {O: 3}},
            {text: "기회다! 마이크 잡고 내 끼를 방출한다", score: {O: 5}},
        ]
    },
    // {
    //     question: "사람들 많은데 가면 에너지가 충전되나요?",
    //     options: [
    //         {text: "배터리 방전난다", score: {I: 5}},
    //         {text: "살짝 피곤하다", score: {I: 3}},
    //         {text: "그럭저럭 괜찮다", score: {I: 1, O: 1}},
    //         {text: "벌써 신난다", score: {O: 3}},
    //         {text: "행복 에너지 충전 MAX다", score: {O: 5}},
    //     ]
    // },

    // R vs D
    {
        question: "고양이가 갑자기 당신을 뚫어지게 쳐다본다",
        options: [
            {text: "아우 귀여워 간식이라도 줘야 하나?", score: {R: 5}},
            {text: "같이 눈싸움 함", score: {R: 3}},
            {text: "뭐지? 왜 이러지?", score: {R: 1, D: 1}},
            {text: "내 안에 뭔가를 보고 있는건가…", score: {D: 3}},
            {text: "고양이야, 혹시 내 과거를 본 거니?", score: {D: 5}},
        ]
    },
    {
        question: "가게 간판에 오타가 보이면 신경 쓰이나요?",
        options: [
            {text: "바로 눈에 띄고 불편함, 한글 요정 발동", score: {R: 5}},
            {text: "눈에 조금 거슬리긴 함..", score: {R: 3}},
            {text: "음? 이상하네… 하고 넘김", score: {R: 1, D: 1}},
            {text: "저런 것도 귀엽지~ 그냥 지나감", score: {D: 3}},
            {text: "'혹시 일부러 낸 오타?’ 하며 상상함", score: {D: 5}},
        ]
    },
    {
        question: "택시기사님이 한 마디도 안 하심",
        options: [
            {text: "조용해서 좋음", score: {R: 5}},
            {text: "어색하긴 한데 괜찮음", score: {R: 3}},
            {text: "말 걸까 말까 고민함", score: {R: 1, D: 1}},
            {text: "나 혹시 뭔가 잘못한 거 아니야..?", score: {D: 3}},
            {text: "지금 납치된 건 아닐까? 시나리오 돌림", score: {D: 5}},
        ]
    },
    {
        question: "내일 비 온대요. 당신의 반응은?",
        options: [
            {text: "우산 챙겨야겠다!", score: {R: 5}},
            {text: "신발 젖겠다… 불편하네", score: {R: 3}},
            {text: "비? 뭐 어쩔", score: {R: 1, D: 1}},
            {text: "비랑 관련된 플레이리스트 쫙 틀어야지", score: {D: 3}},
            {text: "뭔가 운명적인 일이 생길 것 같아", score: {D: 5}},
        ]
    },
    // {
    //     question: "상상으로 대서사시 만드는 걸 좋아하나요?",
    //     options: [
    //         {text: "별로 그런 거 없음", score: {R: 5}},
    //         {text: "적당히 상상함", score: {R: 3}},
    //         {text: "보통이다", score: {R: 1, D: 1}},
    //         {text: "혼자 영화 찍는다", score: {D: 3}},
    //         {text: "상상하다 나의 세계관까지 만듦", score: {D: 5}},
    //     ]
    // },
    // {
    //     question: "갑자기 외계인 얘기하면 어떻게 반응하나요?",
    //     options: [
    //         {text: "왜 저럴까", score: {R: 5}},
    //         {text: "음... 신기하네", score: {R: 3}},
    //         {text: "그냥 듣는다", score: {R: 1, D: 1}},
    //         {text: "같이 상상에 뛰어든다", score: {D: 3}},
    //         {text: "외계인 세계관 바로 구축해버림", score: {D: 5}},
    //     ]
    // },
    {
        question: "친구가 내 전화를 안 받는다. 당신의 생각은?",
        options: [
            {text: "배터리 없나보다~", score: {R: 5}},
            {text: "바쁘겠지 뭐~", score: {R: 3}},
            {text: "모르겠음", score: {R: 1, D: 1}},
            {text: "혹시 사고 난 건 아니겠지..?", score: {D: 3}},
            {text: "내가 뭐 잘못한게 있었나..?", score: {D: 5}},
        ]
    },

    // E vs C
    {
        question: "친구가 '나 실패한 인생인가 봐...'라고 한다",
        options: [
            {text: "“헐 뭔 소리야?! 넌 존재 자체가 선물임”", score: {E: 5}},
            {text: "“일단 뭐 먹자. 배고프면 인생 다 구려 보여”", score: {E: 3}},
            {text: "“음... 뭐라 하지?” 머리속 오류남", score: {E: 1, C: 1}},
            {text: "“구체적으로 어떤 실패를 말하는 거지?” 분석 시작", score: {C: 3}},
            {text: "“그건 니 생각에 실패고, 기준을 바꾸면 해결임” (멘토톤)", score: {C: 5}},
        ]
    },
    {
        question: "단톡방에 내가 보낸 말에 아무런 반응도 없다",
        options: [
            {text: "‘나… 뭔가 잘못했나…?’ 계속 생각함", score: {E: 5}},
            {text: "‘다들 바쁜가…’ 살짝 서운함", score: {E: 3}},
            {text: "‘뭐 어쩔’ + ‘내가 민감한가?’ 계속 갈등", score: {E: 1, C: 1}},
            {text: "‘이건 반응할 만한 주제가 아니었군’ 결론 내림", score: {C: 3}},
            {text: "“사회적 알고리즘상 이 타이밍엔 답장이 없음” 이라며 분석함", score: {C: 5}},
        ]
    },
    // {
    //     question: "드라마 볼 때 감정 이입 많이 하나요?",
    //     options: [
    //         {text: "주인공 감정이 곧 내 감정", score: {E: 5}},
    //         {text: "꽤 몰입한다", score: {E: 3}},
    //         {text: "가끔씩 감정 이입", score: {E: 1, C: 1}},
    //         {text: "스토리 전개에 집중함", score: {C: 3}},
    //         {text: "연출법이나 CG에 감탄하는 편", score: {C: 5}},
    //     ]
    // },
    {
        question: "팀 프로젝트 발표에서 실수함",
        options: [
            {text: "‘다 나 때문이야… 팀원들 미안해ㅠㅠ’", score: {E: 5}},
            {text: "혼자서 계속 자책하고 자꾸 생각남", score: {E: 3}},
            {text: "살짝 민망하지만 애써 넘김", score: {E: 1, C: 1}},
            {text: "어떤 파트에서 어떤 실수였는지 분석함", score: {C: 3}},
            {text: "실수를 정리해서 바로 다음을 대비함 (회복력 갑)", score: {C: 5}},
        ]
    },
    {
        question: "친구가 갑자기 기프티콘을 보내줬다",
        options: [
            {text: "“너 왜 이렇게 따뜻해 ㅠ” 울컥함", score: {E: 5}},
            {text: "“이런 거 챙겨주는 거 진짜 감동이야…”", score: {E: 3}},
            {text: "“오… 고마움” 리액션 어떻게할지 고민 중", score: {E: 1, C: 1}},
            {text: "기프티콘 금액 확인 or 주고받은 횟수 비교", score: {C: 3}},
            {text: "“기프티콘 = 우정 유지 비용” 이라고 분석", score: {C: 5}},
        ]
    },
    // {
    //     question: "팀플하다 의견 충돌나면?",
    //     options: [
    //         {text: "분위기 먼저 걱정", score: {E: 5}},
    //         {text: "눈치를 살핀다", score: {E: 3}},
    //         {text: "중립", score: {E: 1, C: 1}},
    //         {text: "팩트로 바로 정리함", score: {C: 3}},
    //         {text: "효율성으로 밀어붙임", score: {C: 5}},
    //     ]
    // },
    {
        question: "SNS에서 친구가 의미심장한 감성글을 올렸다",
        options: [
            {text: "‘헉 무슨 일이지…?’ 너무 걱정됨", score: {E: 5}},
            {text: "DM 보낼까 말까 10분 고민함", score: {E: 3}},
            {text: "궁금하긴 한데… 뭐 그냥 넘긴다", score: {E: 1, C: 1}},
            {text: "뇌속에서 원인 추정하며 관찰 시작함", score: {C: 3}},
            {text: "“감성글은 관심 유도 패턴일 확률 높음” 판단 완료", score: {C: 5}},
        ]
    },
    // {
    //     question: "결정을 내릴 때 어떤 기준을 많이 따르나요?",
    //     options: [
    //         {text: "사람의 감정을 우선 시 한다", score: {E: 5}},
    //         {text: "당사자의 기분 먼저 생각해본다", score: {E: 3}},
    //         {text: "그때그때 다르다", score: {E: 1, C: 1}},
    //         {text: "이치에 맞는지를 본다", score: {C: 3}},
    //         {text: "논리와 객관성을 중시한다", score: {C: 5}},
    //     ]
    // },
    // {
    //     question: "친구가 연애 문제로 고민 상담하면 당신은?",
    //     options: [
    //         {text: "감정 공감 먼저 하고 들어준다", score: {E: 5}},
    //         {text: "우선 잘 들어주려 한다", score: {E: 3}},
    //         {text: "듣고 나서 어떻게 해야 할지 고민함", score: {E: 1, C: 1}},
    //         {text: "객관적인 해결책부터 생각함", score: {C: 3}},
    //         {text: "논리적으로 따져주며 정리해준다", score: {C: 5}},
    //     ]
    // },

    // S vs A
    {
        question: "하루 일정을 어떻게 보내나요?",
        options: [
            {text: "To-Do, 핸드폰 달력, 메모 습관화", score: {S: 5}},
            {text: "어느 정도 플랜은 있음", score: {S: 3}},
            {text: "아침에 기분 보고 결정함", score: {S: 1, A: 1}},
            {text: "그때그때 느낌 따라 움직임", score: {A: 3}},
            {text: "계획 세우는 순간 하기 싫어짐", score: {A: 5}},
        ]
    },
    // {
    //     question: "음식점에서 메뉴 고를 때 당신은?",
    //     options: [
    //         {text: "이미 오기 전에 메뉴 정해옴", score: {S: 5}},
    //         {text: "도착하자마자 빠르게 결정!", score: {S: 3}},
    //         {text: "이것도 괜찮고 저것도 괜찮고..", score: {S: 1, A: 1}},
    //         {text: "고르기전에 주변 테이블 음식들을 훑어봄", score: {A: 3}},
    //         {text: "직원 오기 직전부터 급하게 고른다", score: {A: 5}},
    //     ]
    // },
    {
        question: "평소 외출할 때 옷 고르는 스타일은?",
        options: [
            {text: "전날 밤에 코디 맞춰놓음", score: {S: 5}},
            {text: "당일날 대충 머리속으로 정해서 입는다", score: {S: 3}},
            {text: "그때그때 기분따라 다름", score: {S: 1, A: 1}},
            {text: "나가기 직전에 여러벌 갈아입는다", score: {A: 3}},
            {text: "그냥 아무거나 입고 나간다", score: {A: 5}},
        ]
    },
    {
        question: "혼자 카페에서 공부하려고 왔는데 자리 없을 때",
        options: [
            {text: "플랜 B 카페 2곳 이미 조사 완료", score: {S: 5}},
            {text: "근처 조용한 데로 이동", score: {S: 3}},
            {text: "흠.. 자리 날 때까지 기다림", score: {S: 1, A: 1}},
            {text: "다른 데 갈까 하다 그냥 집으로 돌아옴", score: {A: 3}},
            {text: "오늘은 아닌가보다~ 빠른 포기", score: {A: 5}},
        ]
    },
    {
        question: "먹자골목에 들어온 당신, 점심 뭐 먹지?",
        options: [
            {text: "전날 미리 정해놨음", score: {S: 5}},
            {text: "아침에 검색해서 찾아놨음", score: {S: 3}},
            {text: "간판 훑어보면서 고민함", score: {S: 1, A: 1}},
            {text: "웨이팅 제일 짧은곳으로 감", score: {A: 3}},
            {text: "그냥 아무 데나 끌리는 대로 감", score: {A: 5}},
        ]
    },
    // {
    //     question: "계획이 틀어졌을 때 당신의 반응은?",
    //     options: [
    //         {text: "스트레스를 받지만 다시 계획을 세운다", score: {S: 5}},
    //         {text: "차분히 다시 계획을 짠다", score: {S: 3}},
    //         {text: "아 뭐.. 어쩔 수 없지", score: {S: 1, A: 1}},
    //         {text: "상황에 맞게 그냥 흘러간다", score: {A: 3}},
    //         {text: "계획보다 재밌는 게 중요하지!", score: {A: 5}},
    //     ]
    // },
    // {
    //     question: "여행 전날 밤, 당신의 짐싸기 스타일은?",
    //     options: [
    //         {text: "며칠 전부터 체크리스트 써놓고 팩킹 완료", score: {S: 5}},
    //         {text: "전날부터 야금야금 챙겨놓음", score: {S: 3}},
    //         {text: "대충 생각만 해놓음", score: {S: 1, A: 1}},
    //         {text: "당일날 급하게 던져넣는다", score: {A: 3}},
    //         {text: "대충 뭐 없으면 가서 사면 되지~", score: {A: 5}},
    //     ]
    // },
    {
        question: "과제 제출 마감시간 23:59!!",
        options: [
            {text: "21시 전에는 무조건 제출", score: {S: 5}},
            {text: "마감 1~2시간 전에 여유롭게", score: {S: 3}},
            {text: "적당히 30분 ~ 1시간 사이에 제출", score: {S: 1, A: 1}},
            {text: "10분 정도 남겨놓고 간신히 올림", score: {A: 3}},
            {text: "신이 나를 도와줌, 1분 남기고 세잎", score: {A: 5}},
        ]
    },
    // {
    //     question: "친구가 갑자기 '지금 나올 수 있어?' 하면?",
    //     options: [
    //         {text: "큰 일이 아니면 거절하고 싶다", score: {S: 5}},
    //         {text: "얘기를 들어보고 고민 후 나간다고 한다", score: {S: 3}},
    //         {text: "상황에 따라 다름", score: {S: 1, A: 1}},
    //         {text: "얘기를 듣다가 30초 안에 ㅇㅋ 어디야?", score: {A: 3}},
    //         {text: "다 필요없고 나가려고 준비부터함", score: {A: 5}},
    //     ]
    // }
];

export default questions;