"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {Suspense} from "react";
import TraitBar from "@/app/components/TraitBar";
import rawAnimalTypes from "@/app/data/animalTypes.json";

// 지표 타입 선언
type TraitKeys = "In" | "Ex" | "Se" | "Nu" | "Em" | "Lo" | "St" | "Fr";

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
        In: number;
        Se: number;
        Em: number;
        St: number;
    };
    characteristics: string[];
};

// 원본 json 데이터를 변수에 할당
// 타입선언: Record는 객체의 키("ISFJ")와 밸류 타입(그 내부 객체들)을 정의하는 제네릭 유틸리티 타입
const animalTypes: Record<string, AnimalData> = rawAnimalTypes;

/** 결과 표시 페이지 */
function ResultContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "Unknown";

    const animalData: AnimalData = animalTypes[type];

    // 모든 지표 값 추출
    const traitKeys: TraitKeys[] = ["In", "Ex", "Se", "Nu", "Em", "Lo", "St", "Fr"];
    const userTraitsFull: Record<TraitKeys, number> = traitKeys.reduce((acc, key) => {
        acc[key] = Number(searchParams.get(key)) || 0;
        return acc;
    }, {} as Record<TraitKeys, number>);

    // 하위 타입 결정 로직
    const determineSubtype = (
        userTraits: { In: number; Se: number; Em: number; St: number },
        subtypesByLevel: AnimalData["types"]
    ): Subtype | null => {
        let bestMatch = null;
        let smallestDiff = Infinity;

        Object.values(subtypesByLevel).flat().forEach((sub) => {
            const diff = ["In", "Se", "Em", "St"].reduce((acc, key) => {
                return acc + Math.abs(userTraits[key as keyof typeof userTraits] - sub.traits[key as keyof typeof sub.traits]);
            }, 0);

            if (diff < smallestDiff) {
                smallestDiff = diff;
                bestMatch = sub;
            }
        });

        return bestMatch;
    };
    // 세부타입 결정
    const selectedSubtype = determineSubtype(
        {In: userTraitsFull.In, Se: userTraitsFull.Se, Em: userTraitsFull.Em, St: userTraitsFull.St},
        animalData.types
    );

    // 카카오톡 공유 핸들러
    const handleKakaoShare = () => {
        // window.Kakao.Link.sendDefault({
        //     objectType: "feed",
        //     content: {
        //         title: `나의 유형은 ${type}`,
        //         description: animalTypes[type as keyof typeof animalTypes],
        //         imageUrl: `/image/${type.toLowerCase()}.png`,
        //         link: {
        //             mobileWebUrl: window.location.href,
        //             webUrl: window.location.href,
        //         }
        //     }
        // })
    }

    // 링크 복사 핸들러
    const handleCopyLink = () => {
        const currentUrl = window.location.href;

        // 임시 textarea 요소 생성
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        document.body.appendChild(textarea);

        // 텍스트 선택
        textarea.select();
        textarea.setSelectionRange(0, 99999); // 모바일 선택 범위 설정

        // 클립보드 복사
        navigator.clipboard.writeText(textarea.value).then(() => {
            alert("복사 완료");
        }).catch((err) => {
            console.error("링크 복사 실패:", err);
            alert("복사 실패");
        });

        // textarea 요소 삭제
        document.body.removeChild(textarea);
    };

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "675px", textAlign: "center"}}>
                {type !== "HUMAN" ? <h1>🎉변신 성공!🎉</h1> : <h1>☠️변신 실패☠️</h1>}
                <h2><b style={{color: "blueviolet"}}>{type}</b> 타입의 ⭐{selectedSubtype?.name || "알 수 없음"}⭐</h2>
                <p style={{color: "gray"}}>{selectedSubtype?.description || "설명이 없습니다."}</p>

                <TraitBar leftLabel="In" rightLabel="Ex" leftValue={userTraitsFull.In} rightValue={userTraitsFull.Ex}/>
                <TraitBar leftLabel="Se" rightLabel="Nu" leftValue={userTraitsFull.Se} rightValue={userTraitsFull.Nu}/>
                <TraitBar leftLabel="Em" rightLabel="Lo" leftValue={userTraitsFull.Em} rightValue={userTraitsFull.Lo}/>
                <TraitBar leftLabel="St" rightLabel="Fr" leftValue={userTraitsFull.St} rightValue={userTraitsFull.Fr}/>

                <ul style={{width: "80%", placeSelf: "center", textAlign: "left"}}>
                    {selectedSubtype?.characteristics?.length ? (
                        selectedSubtype.characteristics.map((char, idx) => (
                            <li key={idx}>{char}</li>
                        ))
                    ) : (
                        <li>특성 정보가 없습니다.</li>
                    )}
                </ul>
                {/* 링크 복사, 카카오톡 공유 버튼 */}
                <button onClick={handleCopyLink} className="share-btn link">
                    링크 복사
                </button>
                <button onClick={handleKakaoShare} className="share-btn kakao">
                    카카오톡 공유
                </button>
                <Link href="/" className="home-link">
                    홈으로 돌아가기
                </Link>
            </div>
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