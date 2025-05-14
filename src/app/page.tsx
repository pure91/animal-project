"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import QuestionCard from "@/app/components/QuestionCard";
import questions from "@/app/data/questions";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";

/** 메인 페이지 */
export default function Home() {
    const [initLoading, setInitLoading] = useState(true); // 최초 페이지 로딩 상태
    const [isClicked, setIsClicked] = useState(false);
    const [started, setStarted] = useState(false); // 시작하기
    const [participantCount, setParticipantCount] = useState<number | 0>(0); // 참여자 수

    const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 질문
    const [answers, setAnswers] = useState<string[]>([]); // 답변 저장

    const [showResult, setShowResult] = useState(false); // 결과보기
    const [loading, setLoading] = useState(false); // 결과 로딩 상태
    const [progress, setProgress] = useState(0); // 결과 로딩바 상태

    // 점수 계산
    const [scores, setScores] = useState<{
        W: number; X: number; A: number; I: number; F: number; T: number; S: number; U: number;
    }>({
        W: 0, X: 0, A: 0, I: 0, F: 0, T: 0, S: 0, U: 0,
    });

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // 홈 페이지로 이동 시 상태 초기화
        if (pathname === "/") {
            setStarted(false);
            setCurrentQuestion(0);
            setAnswers([]);
            setScores({W: 0, X: 0, A: 0, I: 0, F: 0, T: 0, S: 0, U: 0});
        }
    }, [pathname]);


    // 참여자 수 조회
    useEffect(() => {
        fetchParticipantCount();
    }, []);

    const fetchParticipantCount = async () => {
        setInitLoading(true);
        try {
            const res = await fetch("/api/participants/count");
            const data = await res.json();
            console.log("data:", data);
            setParticipantCount(data.count);
        } catch (error) {
            console.error("error:", error);
        } finally {
            setInitLoading(false);
        }
    };

    // 페이지 최상단 로딩
    if (initLoading) {
        return (
            <div className="loading-container">
                <Spinner/>
            </div>
        );
    }

    // 질문 시작 + 참여자 수 증가
    const handleStart = async () => {
        setStarted(true);
        // 중복 클릭 방지
        if (isClicked) return;
        setIsClicked(true);

        try {
            await fetch("/api/participants/add", {
                method: "POST",
            });
            fetchParticipantCount();
        } catch (error) {
            console.error("add fail", error);
        }
    };

    // 최초 렌더링
    if (!started) {
        return (
            <div className="start-page">
                <h1>🎉 호랑이의 생일잔치에 참여해보세요 🎉</h1>
                <h3>단, 사람으로는 참석할 수 없으니 질문에 답하여 동물로 변신해야 합니다!</h3>
                <Image src="/images/entry.png" alt="입장이미지" width={300} height={400} onClick={handleStart}
                       className="entry-image-style"/>
                <p>전체 참여 횟수 : {participantCount.toLocaleString()}회</p>
            </div>
        )
    }

    // 사용자가 선택한 값
    const handleSelect = (selectedScore: { [key: string]: number }) => {
        // 답변 저장
        setAnswers((prev) => [...prev, JSON.stringify(selectedScore)]);

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

    // 유형 계산
    const calculateType = () => {
        const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);

        // 모든 대답이 0이면, 특수 타입 반환
        if (totalScore === 0) {
            return "HUMAN";
        }

        return [
            scores.W >= scores.X ? "W" : "X",
            scores.A >= scores.I ? "A" : "I",
            scores.F >= scores.T ? "F" : "T",
            scores.S >= scores.U ? "S" : "U",
        ].join("");
    };

    // 결과 보기
    const handleShowResult = () => {
        setLoading(true);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval); // 로딩이 완료되면 인터벌을 중지
                    const pattern = calculateType();
                    const scoreParams = new URLSearchParams(
                        Object.entries(scores).reduce((acc, [key, value]) => {
                            acc[key] = value.toString();
                            return acc;
                        }, {} as Record<string, string>)
                    ).toString();

                    // 렌더링 중 push() 사이드 이펙트 실행 문제로 setTimeout 추가 -> 푸시 지연
                    setTimeout(() => {
                        router.push(`/result?type=${pattern}&${scoreParams}`);
                    }, 0);

                    return 100;
                }
                return prev + 2; // 진행 상태 업데이트
            });
        }, 40); // 40ms 마다 진행 상태 업데이트 (일부러 느리게 증가)
    };

    return (
        <div className="result-section">
            {showResult ? (
                // 결과 보기 버튼
                <div>
                    <h2>변신술 준비 중...</h2>
                    <h2>👇 PUSH 👇</h2>
                    {loading && (
                        <div className="loading-wrapper">
                            <div className="rotating-card-container">
                                <Image
                                    src="/images/animalAll.png"
                                    alt="물음표 카드"
                                    width={200}
                                    height={300}
                                    className="rotating-card"
                                />
                            </div>
                            <p>{progress}%</p>
                        </div>
                    )}
                    <div>
                        <button className="back-button" onClick={handleBack} disabled={loading}>
                            ⬅️ 뒤로가기
                        </button>
                        <button className="submit-button" onClick={handleShowResult} disabled={loading}>
                            결과보기
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <QuestionCard
                        question={questions[currentQuestion].question}
                        options={questions[currentQuestion].options}
                        onSelect={handleSelect}
                        current={currentQuestion + 1}
                        total={questions.length}
                        onBack={handleBack}
                        showBackButton={currentQuestion > 0}
                    />
                </div>
            )}
        </div>
    );
}