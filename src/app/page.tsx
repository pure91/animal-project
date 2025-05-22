"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import QuestionCard from "@/app/components/QuestionCard";
import questions from "@/app/data/questions";
import addQuestions, {Question} from "@/app/data/addQuestions";
import Image from "next/image";
import Spinner from "@/app/components/Spinner";
import rawAnimalTypes from '@/app/data/animalTypes.json';
import {calculateTypeAndTies, determineLevel} from "@/utils/animalUtils";
import type {AnimalData, LevelKeys} from "@/types/animalTypes";
import toast, {Toaster} from "react-hot-toast";
import CoupangMobileTop from "@/app/components/advertise/Coupang/CoupangMobileTop";
import CoupangPCLeft from "./components/advertise/Coupang/CoupangPCLeft";
import CoupangPCRight from "@/app/components/advertise/Coupang/CoupangPCRight";

// json 원시 데이터 할당
const animalTypes = rawAnimalTypes as Record<string, AnimalData>;

/** 사용자 상호작용, 질문 진행, 점수 계산, 결과 전달 */
export default function Home() {
    const [initLoading, setInitLoading] = useState(true); // 최초 페이지 로딩 상태
    const [isClicked, setIsClicked] = useState(false); // 연속 클릭 방지
    const [started, setStarted] = useState(false); // 시작하기
    const [participantCount, setParticipantCount] = useState<number | 0>(0); // 참여자 수

    const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 질문 인덱스
    const [answers, setAnswers] = useState<string[]>([]); // 답변 저장

    const [showResult, setShowResult] = useState(false); // 결과보기
    const [loading, setLoading] = useState(false); // 결과 로딩 상태

    // 동점 방지
    const [isTieState, setIsTieState] = useState(false); // 동점 상태
    const [currentTieQuestion, setCurrentTieQuestion] = useState(0); // 추가 질문 인덱스
    const [tieQuestionList, setTieQuestionList] = useState<Question[]>([]); // 동점 질문 리스트

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
            setIsTieState(false);
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
                <p>🍀지금까지 생일잔치에 다녀온 사람들 : 총 {participantCount.toLocaleString()}명</p>
            </div>
        )
    }

    // 사용자 선택 값
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
            console.log("newScores:", newScores);
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
                setShowResult(false); // 결과보기 클릭 전까진 뒤로가기 가능
                setCurrentQuestion(currentQuestion);
            }
        }
    }

    // 동점 시 사용자 추가질문 선택 값
    const handleTieSelect = (selectedScore: { [key: string]: number }) => {
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
            console.log("newScores:", newScores);
            return newScores;
        });

        // 다음 추가 질문 이동
        if (currentTieQuestion + 1 < tieQuestionList.length) {
            setCurrentTieQuestion(currentTieQuestion + 1);
        } else {
            setShowResult(true);  // 추가 질문까지 끝났으면 다시 결과보기 버튼 활성화
        }
    }

    // 추가 질문 뒤로가기
    const handleTieBack = () => {
        if (currentTieQuestion > 0) {
            const updatedAnswers = answers.slice(0, answers.length - 1); // 마지막 선택지 삭제
            setAnswers(updatedAnswers);
        }

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
        setCurrentTieQuestion(currentTieQuestion - 1);

        if (showResult) {
            setShowResult(false); // 결과보기 클릭 전까진 뒤로가기 가능
            setCurrentTieQuestion(currentTieQuestion);
        }
    }

    // 동점에 해당하는 추가 질문만 필터링
    const getFilteredTieQuestions = (ties: string[]) => {
        // 추가질문 전체 data에서 해당하는 항목만 필터링
        return addQuestions.filter((question) => {
            // flat으로 map 돌려서 추가질문 data의 questions.options.score에 존재하는 key를 뽑아냄
            const optionKeys = question.options.flatMap(opt => Object.keys(opt.score));
            // 하나라도 존재하면 true return
            return ties.some(tie => {
                const [a, b] = tie.split("/"); // a에 W, b에 X 이런식으로 들어옴
                return optionKeys.includes(a) && optionKeys.includes(b); // 여기서 score에 W 와 X가 있는 질문을 가져옴
            })
        })
    }

    // 결과 보기
    const handleShowResult = async () => {
        setLoading(true);

        // 타입 계산
        const {type, ties} = calculateTypeAndTies(scores);

        // 동점 발생 시 추가 질문을 위한 결과 보류
        if (type === "TIE") {
            toast("🔥동점 발생! 추가 질문이 주어집니다!🔥");

            // 동점인 항목만 필터
            const tieQuestions = getFilteredTieQuestions(ties);
            setTieQuestionList(tieQuestions);

            setIsTieState(true);
            setShowResult(false);
            setLoading(false);
            return;
        }

        const animalData = animalTypes[type] as AnimalData | undefined;
        let level: LevelKeys = "1";

        if (animalData) {
            level = determineLevel(scores, animalData);
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
            finalParameter.append("level", level);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            router.push(`/result?${finalParameter.toString()}`);
        } catch (err) {
            console.error("결과 저장 실패:", err)
        }
    };

    return (
        <div className="result-section">
            <Toaster position="top-center"/>
            {started &&
                <>
                    <CoupangMobileTop/>
                    <CoupangPCLeft/>
                    <CoupangPCRight/>
                </>
            }
            {showResult ? (
                // 결과 보기 버튼
                <>
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
                </>
            ) : (
                <>
                    {!isTieState ? (
                        <QuestionCard
                            question={questions[currentQuestion]}
                            onSelect={handleSelect}
                            current={currentQuestion + 1}
                            total={questions.length}
                            onBack={handleBack}
                            showBackButton={currentQuestion > 0}
                            isTieState={isTieState}
                        />
                    ) : (
                        // 동점인 경우 추가질문 카드
                        <QuestionCard
                            question={tieQuestionList[currentTieQuestion]}
                            onSelect={handleTieSelect}
                            current={currentTieQuestion + 1}
                            total={tieQuestionList.length}
                            onBack={handleTieBack}
                            showBackButton={currentTieQuestion > 0}
                            isTieState={isTieState}
                        />
                    )}
                </>
            )}
        </div>
    );
}