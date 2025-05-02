"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import QuestionCard from "@/app/components/QuestionCard";
import questions from "@/app/data/questions";
import Image from "next/image";

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
        In: number; Ex: number; Se: number; Nu: number; Em: number; Lo: number; St: number; Fr: number;
    }>({
        In: 0, Ex: 0, Se: 0, Nu: 0, Em: 0, Lo: 0, St: 0, Fr: 0,
    });

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // 홈 페이지로 이동 시 상태 초기화
        if (pathname === "/") {
            setStarted(false);
            setCurrentQuestion(0);
            setAnswers([]);
            setScores({In: 0, Ex: 0, Se: 0, Nu: 0, Em: 0, Lo: 0, St: 0, Fr: 0});
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

            if (showResult) {
                setShowResult(false); // 결과 보기 전에도 뒤로가기 가능하도록
                setCurrentQuestion(currentQuestion);
            }
        }
    }

    // mbti 유형 계산
    const calculateMbti = () => {
        const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
        console.log("totalScore:", totalScore);

        // 모든 대답이 0이면, 특수 타입 반환
        if (totalScore === 0) {
            return "HUMAN";
        }

        return [
            scores.In >= scores.Ex ? "In" : "Ex",
            scores.Se >= scores.Nu ? "Se" : "Nu",
            scores.Em >= scores.Lo ? "Em" : "Lo",
            scores.St >= scores.Fr ? "St" : "Fr",
        ].join("");
    };

    // 결과 보기
    const handleShowResult = () => {
        setLoading(true); // 로딩 상태 시작
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval); // 로딩이 완료되면 인터벌을 중지
                    const mbti = calculateMbti();
                    const scoreParams = new URLSearchParams(
                        Object.entries(scores).reduce((acc, [key, value]) => {
                            acc[key] = value.toString();
                            return acc;
                        }, {} as Record<string, string>)
                    ).toString();

                    // 렌더링 중 push() 사이드 이펙트 실행 문제로 setTimeout 추가 -> 푸시 지연
                    setTimeout(() => {
                        router.push(`/result?type=${mbti}&${scoreParams}`);
                    }, 0);

                    return 100;
                }
                return prev + 2; // 진행 상태 업데이트
            });
        }, 40); // 40ms마다 진행 상태 업데이트 (일부러 느리게 증가)
    };

    // 최초 렌더링
    if (!started) {
        return (
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <h1>🎇호랑이의 생일잔치에 참여해보세요!🎇</h1>
                <h3 style={{color: "firebrick"}}>단, 사람으로는 참석할 수 없으니 질문에 답하여 동물로 변신해야 합니다!☺️</h3>
                <Image src="/images/entry2.png" alt="입장이미지" width={300} height={400} onClick={handleStart} className="entry-image-style" />
            </div>
        );
    }

    return (
        <div style={{textAlign: "center"}}>
            {showResult ? (
                // 결과 보기 버튼
                <div>
                    <h2>변신술 준비 중...</h2>
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
                    <button onClick={handleBack} style={{marginRight: "10px"}}>
                        뒤로가기
                    </button>

                    <button onClick={handleShowResult} style={{background: "darkorchid"}}>변신하기</button>
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
                        <button onClick={handleBack}>
                            뒤로가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}