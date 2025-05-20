"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import QuestionCard from "@/app/components/QuestionCard";
import questions from "@/app/data/questions";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";
import rawAnimalTypes from '@/app/data/animalTypes.json';

// AnimalData의 내부 레벨 타입 선언
type Subtype = {
    name: string;
    description: string;
    traits: {
        W: number;
        A: number;
        F: number;
        S: number;
    };
    characteristics: string[];
};

// 키 객체의 타입 선언
type AnimalData = {
    types: {
        1: Subtype[];
        2: Subtype[];
        3: Subtype[];
        4: Subtype[];
    };
};

// 원본 json 데이터를 변수에 할당
// 타입선언: Record는 객체의 키와 밸류 타입(그 내부 객체들)을 정의하는 제네릭 유틸리티 타입
const animalTypes: Record<string, AnimalData> = rawAnimalTypes;

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
            const res = await fetch("/api/participants/get");
            const data = await res.json();
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
        } catch (error) {
            console.error("add fail", error);
        }
    };

    // 최초 렌더링
    if (!started) {
        return (
            <div className="start-page">
                <h1>🎉호랑이의 생일잔치에 참여해보세요🎉</h1>
                <h3>단, 사람으로는 참석할 수 없으니 질문에 답하여 동물로 변신해야 합니다!</h3>
                <Image src="/images/entry.png" alt="입장이미지" width={300} height={400} onClick={handleStart}
                       className="entry-image-style"/>
                <p>🍀전체 참여 횟수 : {participantCount.toLocaleString()}회</p>
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

        // 총점이 40점 이하면, 특수 타입 반환
        if (totalScore <= 40) {
            return "HUMAN";
        }

        return [
            scores.W >= scores.X ? "W" : "X",
            scores.A >= scores.I ? "A" : "I",
            scores.F >= scores.T ? "F" : "T",
            scores.S >= scores.U ? "S" : "U",
        ].join("");
    };

    // 하위 타입 level 결정 로직
    const determineLevel = (
        userTraits: { W: number; A: number; F: number; S: number },
        data: AnimalData
    ): number => {
        let minDiff = Infinity;
        let bestLevel = 1;

        for (const levelStr in data.types) {
            const level = parseInt(levelStr);
            const subtypes = data.types[level as keyof typeof data.types];
            for (const subtype of subtypes) {
                const diff = ['W', 'A', 'F', 'S'].reduce(
                    (acc, key) => acc + Math.abs(userTraits[key as keyof typeof userTraits] - subtype.traits[key as keyof typeof subtype.traits]), 0
                );
                if (diff < minDiff) {
                    minDiff = diff;
                    bestLevel = level;
                }
            }
        }

        return bestLevel;
    };

    // 시각적 효과를 주기 위한 슬립
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // 결과 보기
    const handleShowResult = async () => {
        setLoading(true);

        const type = calculateType();
        const {W, A, F, S} = scores;
        const traitSubset = {W, A, F, S};
        const animalData = animalTypes[type];
        let level = 1;

        if (animalData) {
            level = determineLevel(traitSubset, animalData);
        }

        try {
            // 사용자 결과 DB 저장
            await fetch("/api/stats/result/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({type, level}),
            }).catch((err) => {
                console.error("결과 저장 실패:", err);
            })

            // 최종 전달 파라미터
            const finalParameter = new URLSearchParams(
                Object.entries(scores).reduce((acc, [key, value]) => {
                    acc[key] = value.toString();
                    return acc;
                }, {} as Record<string, string>)
            );

            finalParameter.append("type", type);
            finalParameter.append("level", String(level));

            await sleep(1500);

            router.push(`/result?${finalParameter.toString()}`);
        } catch (err) {
            console.error("결과 저장 실패:", err)
        }
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