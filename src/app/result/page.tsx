"use client";

import {useSearchParams} from "next/navigation";
import mbtiDescriptions from "@/app/data/mbtiAnimalDescriptions.json";
import Link from "next/link";
import TraitBar from "@/app/components/TraitBar";

/** 결과 표시 페이지 */
export default function Result() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "Unknown";
    const mbtiData = mbtiDescriptions[type as keyof typeof mbtiDescriptions];

    type SubType = {
        name : string;
        description: string;
        I: number;
        S: number;
        T: number;
        J: number;
    };

    // 측정값에 따른 subtypes 선택
    const determineSubtype = (
        userTraits: { I: number; S: number; T: number; J: number },
        subtypes: SubType[]
    ): SubType | null => {
        let bestMatch : SubType | null = null;
        let smallestDiff = Infinity;

        subtypes?.forEach(sub => {
            const diff = ["I", "S", "T", "J"].reduce((acc, key) => {
                const traitKey = key as "I" | "S" | "T" | "J";
                return acc + Math.abs(userTraits[traitKey] - sub[traitKey]);
            }, 0);

            if (diff < smallestDiff) {
                smallestDiff = diff;
                bestMatch = sub;
            }
        });

        return bestMatch;
    };

    const selectedSubtype: SubType | null = determineSubtype(mbtiData.traits, mbtiData.subtypes);

    // 카카오톡 공유 핸들러
    const handleKakaoShare = () => {
        // window.Kakao.Link.sendDefault({
        //     objectType: "feed",
        //     content: {
        //         title: `나의 MBTI는 ${type}`,
        //         description: mbtiDescriptions[type as keyof typeof mbtiDescriptions],
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

    // 비율 환산
    const traits = mbtiData.traits;

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>당신의 동물 유형은..!</h1>
            {/*<Image*/}
            {/*    src={`/image/${type.toLowerCase()}.png`}*/}
            {/*    alt={type}*/}
            {/*    style={{width: "200px", height: "200px", margin: "20px 0"}}*/}
            {/*/>*/}
            <h2>⭐ {mbtiData?.animal} ⭐</h2>
            <p>{type} 유형, {mbtiData?.description}!</p>

            <p>당신의 성향 점수는:</p>
            <TraitBar leftLabel="I" rightLabel="E" leftValue={traits.I} />
            <TraitBar leftLabel="S" rightLabel="N" leftValue={traits.S} />
            <TraitBar leftLabel="T" rightLabel="F" leftValue={traits.T} />
            <TraitBar leftLabel="J" rightLabel="P" leftValue={traits.J} />

            <h3>서브타입: {selectedSubtype?.name || "알 수 없음"}</h3>
            <p>{selectedSubtype?.description || "서브타입 설명이 없습니다."}</p>

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