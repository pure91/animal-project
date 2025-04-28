"use client";

import {useSearchParams} from "next/navigation";
import mbtiDescriptions from "@/app/data/mbtiDescriptions";
import Link from "next/link";

/** 결과 표시 페이지 */
export default function Result() {
    const searchParams = useSearchParams();
    console.log("searchParams:", searchParams);
    const type = searchParams.get("type") || "Unknown";
    console.log("type:", type);

    // 카카오톡 공유 핸들러
    const handleKakaoShare = () => {
        window.Kakao.Link.sendDefault({
            objectType: "feed",
            content: {
                title: `나의 MBTI는 ${type}`,
                description: mbtiDescriptions[type as keyof typeof mbtiDescriptions],
                imageUrl: `/image/${type.toLowerCase()}.png`,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                }
            }
        })
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
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>당신의 MBTI는..!</h1>
            <h2 style={{fontSize: "40px", margin: "20px 0"}}>⭐{type}⭐</h2>
            <img
                src={`/image/${type.toLowerCase()}.png`}
                alt={type}
                style={{width: "200px", height: "200px", margin: "20px 0"}}
            />
            <p>{mbtiDescriptions[type as keyof typeof mbtiDescriptions]}</p>

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