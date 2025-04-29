"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import QuestionCard from "@/app/components/QuestionCard";
import questions from "@/app/data/questions";

/** 메인 페이지 */
export default function Home() {
    const [started, setStarted] = useState(false); // 시작하기
    const [currentQuestion, setCurrentQuestion] = useState(0); //현재 질문
    const [answers, setAnswers] = useState<string[]>([]); // 답변 저장
    const [showResult, setShowResult] = useState(false); // 결과보기
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [progress, setProgress] = useState(0); // 로딩바의 진행 상태

    // 점수 계산
    const [scores, setScores] = useState<{
        I: number; E: number; S: number; N: number; F: number; T: number; J: number; P: number;
    }>({
        I: 0, E: 0, S: 0, N: 0, F: 0, T: 0, J: 0, P: 0,
    });

    const router = useRouter();
    const pathname = usePathname();

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
    const handleSelect = (selectedScore: { [key: string]: number }) => {
        // 답변 저장
        setAnswers((prev) => [...prev, JSON.stringify(selectedScore)]);

        console.log("selectedScore:", JSON.stringify(selectedScore));

        // 점수 업데이트
        setScores((prev) => {
            const newScores = {...prev};
            for (const key in selectedScore) {
                if (key in newScores) {
                    newScores[key as keyof typeof newScores] += selectedScore[key];
                }
            }
            return newScores;
        });

        // 다음 질문 이동
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

            // 점수 복구
            const previousScore = JSON.parse(answers[answers.length - 1]);
            setScores((prev) => {
                const newScores = {...prev};
                for (const key in previousScore) {
                    if (key in newScores) {
                        newScores[key as keyof typeof newScores] -= previousScore[key];
                    }
                }
                return newScores;
            });

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
        console.log("최종 scores:", scores);
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
        }, 40); // 40ms마다 진행 상태 업데이트 (일부러 느리게 증가)
    };

    // 최초 렌더링
    if (!started) {
        return (
            <div style={{textAlign: "center", marginTop: "100px"}}>
                <h1>나의 동물 유형은?</h1>
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
                    <h2>👇 PUSH 👇</h2>
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