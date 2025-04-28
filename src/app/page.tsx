"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import QuestionCard from "@/app/components/QuestionCard";
import questions from "@/app/data/questions";

/** 메인 페이지 */
export default function Home() {
    const [started, setStarted] = useState(false); // 시작하기
    const [currentQuestion, setCurrentQuestion] = useState(0); //현재 질문
    const [answers, setAnswers] = useState<string[]>([]); // 질문
    const [showResult, setShowResult] = useState(false); // 결과보기
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [progress, setProgress] = useState(0); // 로딩바의 진행 상태

    const router = useRouter();
    const pathname = usePathname();

    // 점수 계산
    const [scores, setScores] = useState<{
        I: number; E: number; S: number; N: number; F: number; T: number; J: number; P: number;
    }>({
        I: 0, E: 0, S: 0, N: 0, F: 0, T: 0, J: 0, P: 0,
    });

    useEffect(() => {
        // 홈 페이지로 이동 시 상태 초기화
        if (pathname === "/") {
            setStarted(false);
            setCurrentQuestion(0);
            setAnswers([]);
            setScores({I: 0, E: 0, S: 0, N: 0, F: 0, T: 0, J: 0, P: 0});
        }
    }, [pathname]);

    // 질문 시작
    const handleStart = () => {
        setStarted(true);
    }

    // 사용자가 선택한 값
    const handleSelect = (option: string) => {
        const updatedAnswers = [...answers, option];
        setAnswers(updatedAnswers);

        const currentScore = questions[currentQuestion].scores;
        const selectedIndex = questions[currentQuestion].options.indexOf(option);
        const selectedScore = currentScore[selectedIndex];
        console.log("currentQuestion", currentQuestion);
        console.log("selectedIndex", selectedIndex);
        console.log("selectedScore", selectedScore);

        // selectedScore는 "I", "E", "S", "N", "F", "T", "J", "P" 중 하나여야 하므로 이를 명시적으로 타입 지정
        setScores(prev => ({
            ...prev,
            [selectedScore as keyof typeof scores]: prev[selectedScore as keyof typeof scores] + 1
        }));

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true); // 질문이 끝났을때 결과 보기 버튼 활성화
        }
    };

    // 뒤로 가기
    const handleBack = () => {
        if (currentQuestion > 0) {
            const updatedAnswers = answers.slice(0, answers.length - 1); // 마지막 선택지 삭제
            setAnswers(updatedAnswers);

            const currentScore = questions[currentQuestion - 1].scores;
            const selectedOption = answers[answers.length - 1]; // 이전 질문에서 선택한 옵션
            const selectedIndex = questions[currentQuestion - 1].options.indexOf(selectedOption);
            const selectedScore = currentScore[selectedIndex];

            console.log("뒤로가기 currentScore", currentScore);
            console.log("뒤로가기 selectedOption", selectedOption);
            console.log("뒤로가기 selectedIndex", selectedIndex);
            console.log("뒤로가기 selectedScore", selectedScore);

            // 점수 되돌림
            setScores((prev) => ({
                ...prev,
                [selectedScore as keyof typeof scores]: prev[selectedScore as keyof typeof scores] - 1
            }));

            // 이전 질문으로 돌아가기
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    // mbti 유형 계산
    const calculateMbti = () => {
        const mbti = [
            scores.I >= scores.E ? "I" : "E",
            scores.S >= scores.N ? "S" : "N",
            scores.F >= scores.T ? "F" : "T",
            scores.J >= scores.P ? "J" : "P",
        ];
        console.log("scores:", scores);
        return mbti.join("");
    }

    // 결과 보기
    const handleShowResult = () => {
        setLoading(true); // 로딩 상태 시작
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval); // 로딩이 완료되면 인터벌을 중지
                    const mbti = calculateMbti();
                    router.push(`/result?type=${mbti}`);
                    return 100;
                }
                return prev + 2; // 진행 상태 업데이트
            });
        }, 40); // 50ms마다 진행 상태 업데이트 (일부러 느리게 증가)
    };

    if (!started) {
        return (
            <div style={{textAlign: "center", marginTop: "100px"}}>
                <h1>나의 MBTI 유형은?</h1>
                <p>간단한 질문에 답하고 알아보세요!</p>
                <button onClick={handleStart}>시작하기</button>
            </div>
        );
    }

    return (
        <div style={{textAlign: "center"}}>
            {showResult ? (
                // 결과 보기 버튼
                <div>
                    <h2>결과를 준비하는 중...</h2>
                    {loading && (
                        <div>
                            <div style={{width: "100%", height: "20px", background: "#e0e0e0", borderRadius: "10px"}}>
                                <div
                                    style={{
                                        width: `${progress}%`,
                                        height: "100%",
                                        background: "#7e78dd",
                                        borderRadius: "10px",
                                        transition: "width 0.1s ease-out"
                                    }}
                                ></div>
                            </div>
                            <p>{progress}%</p>
                        </div>
                    )}
                    <button onClick={handleShowResult}>결과보기</button>
                </div>
            ) : (
                <div>
                    <QuestionCard
                        question={questions[currentQuestion].question}
                        options={questions[currentQuestion].options}
                        onSelect={handleSelect}
                    />
                    <p>{currentQuestion + 1} / {questions.length}</p>

                    {currentQuestion > 0 && (
                        <button onClick={handleBack} style={{marginTop: "20px"}}>
                            뒤로가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}