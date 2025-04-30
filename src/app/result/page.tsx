"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {Suspense} from "react";
import TraitBar from "@/app/components/TraitBar";
import rawAnimalTypes from "@/app/data/animalTypes.json";

// 지표 타입 선언
type TraitKeys = "I" | "E" | "S" | "N" | "F" | "T" | "J" | "P";

// "ISFJ"와 같은 키 객체의 타입 선언
type AnimalData = {
    types: {
        1: Subtype[];
        2: Subtype[];
        3: Subtype[];
        4: Subtype[];
    };
};

// 위 AnimalData의 내부 레벨 타입 선언
type Subtype = {
    name: string;
    description: string;
    traits: {
        I: number;
        S: number;
        F: number;
        J: number;
    };
};

// 원본 json 데이터를 변수에 할당
// 타입선언: Record는 객체의 키("ISFJ")와 밸류 타입(그 내부 객체들)을 정의하는 제네릭 유틸리티 타입
const animalTypes: Record<string, AnimalData> = rawAnimalTypes;

/** 결과 표시 페이지 */
function ResultContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "Unknown";

    const animalData = animalTypes[type];

    // 모든 지표 값 추출
    const traitKeys: TraitKeys[] = ["I", "E", "S", "N", "F", "T", "J", "P"];
    const userTraitsFull: Record<TraitKeys, number> = traitKeys.reduce((acc, key) => {
        acc[key] = Number(searchParams.get(key)) || 0;
        return acc;
    }, {} as Record<TraitKeys, number>);

    // 하위 타입 결정 로직
    const determineSubtype = (
        userTraits: { I: number; S: number; F: number; J: number },
        subtypesByLevel: AnimalData["types"]
    ): { name: string; description: string } | null => {
        let bestMatch = null;
        let smallestDiff = Infinity;

        Object.values(subtypesByLevel).flat().forEach((sub) => {
            const diff = ["I", "S", "F", "J"].reduce((acc, key) => {
                return acc + Math.abs(userTraits[key as keyof typeof userTraits] - sub.traits[key as keyof typeof sub.traits]);
            }, 0);

            if (diff < smallestDiff) {
                smallestDiff = diff;
                bestMatch = {name: sub.name, description: sub.description};
            }
        });

        return bestMatch;
    };
    // 세부타입 결정
    const selectedSubtype = determineSubtype(
        {I: userTraitsFull.I, S: userTraitsFull.S, F: userTraitsFull.F, J: userTraitsFull.J},
        animalData.types
    );

    // 카카오톡 공유 핸들러
    const handleKakaoShare = () => {
        // window.Kakao.Link.sendDefault({
        //     objectType: "feed",
        //     content: {
        //         title: `나의 MBTI는 ${type}`,
        //         description: animalTypes[type as keyof typeof animalTypes],
        //         imageUrl: `/image/${type.toLowerCase()}.png`,
        //         link: {
        //             mobileWebUrl: window.location.href,
        //             webUrl: window.location.href,
        //         }
        //     }
        // })
    }

    // 인스타그램 공유 핸들러
    const handleInstagramShare = () => {
        window.open(
            `https://www.instagram.com/share?url=${encodeURIComponent(
                window.location.href
            )}`,
            '_blank'
        );
    };

    return (
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <h1>당신은 <b style={{color: "blueviolet"}}>{type}</b> 타입 </h1>
            <h1>⭐ {selectedSubtype?.name || "알 수 없음"} ⭐</h1>
            <p style={{color: "gray"}}><b style={{color: "gray"}}>특징 :</b> {selectedSubtype?.description || "설명이 없습니다."}</p>
            {/*<Image*/}
            {/*    src={`/image/${type.toLowerCase()}.png`}*/}
            {/*    alt={type}*/}
            {/*    style={{width: "200px", height: "200px", margin: "20px 0"}}*/}
            {/*/>*/}

            <TraitBar leftLabel="I" rightLabel="E" leftValue={userTraitsFull.I} rightValue={userTraitsFull.E}/>
            <TraitBar leftLabel="S" rightLabel="N" leftValue={userTraitsFull.S} rightValue={userTraitsFull.N}/>
            <TraitBar leftLabel="F" rightLabel="T" leftValue={userTraitsFull.F} rightValue={userTraitsFull.T}/>
            <TraitBar leftLabel="J" rightLabel="P" leftValue={userTraitsFull.J} rightValue={userTraitsFull.P}/>

            {/* 카카오톡, 인스타그램 공유 버튼 */}
            <button onClick={handleKakaoShare} className="share-btn kakao">
                카카오톡 공유
            </button>
            <button onClick={handleInstagramShare} className="share-btn instagram">
                인스타그램 공유
            </button>
            <Link href="/" className="home-link">
                홈으로 돌아가기
            </Link>
        </div>
    )
}

export default function Result() {
    return (
        <Suspense>
            <ResultContent/>
        </Suspense>
    );
}