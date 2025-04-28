"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import QuestionCard from "@/app/components/QuestionCard";
import questions from "@/app/data/questions";

/** 메인 페이지 */
export default function Home() {
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const router = useRouter();

    // 점수 계산
    const [scores, setScores] = useState<{
        I: number;
        E: number;
        S: number;
        N: number;
        F: number;
        T: number;
        J: number;
        P: number;
    }>({
        I: 0, E: 0, S: 0, N: 0, F: 0, T: 0, J: 0, P: 0,
    });

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

        // selectedScore는 "I", "E", "S", "N", "F", "T", "J", "P" 중 하나여야 하므로 이를 명시적으로 타입 지정
        setScores(prev => ({
            ...prev,
            [selectedScore as keyof typeof scores]: prev[selectedScore as keyof typeof scores] + 1
        }));

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const mbti = calculateMbti();
            router.push(`/result?type=${mbti}`);
        }
    };

    // mbti 유형 계산
    const calculateMbti = () => {
        const mbti = [
            scores.I >= scores.E ? "I" : "E",
            scores.S >= scores.N ? "S" : "N",
            scores.F >= scores.T ? "F" : "T",
            scores.J >= scores.P ? "J" : "P",
        ];
        return mbti.join("");
    }

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
            <QuestionCard
                question={questions[currentQuestion].question}
                options={questions[currentQuestion].options}
                onSelect={handleSelect}
            />
            <p>{currentQuestion + 1} / {questions.length}</p>
        </div>
    );
}