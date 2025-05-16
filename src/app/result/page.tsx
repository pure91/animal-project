"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {Suspense, useEffect, useState} from "react";
import TraitBar from "@/app/components/TraitBar";
import toast, {Toaster} from "react-hot-toast";
import Image from "next/image";
import rawAnimalTypes from '@/app/data/animalTypes.json';

// 지표 타입 선언
type TraitKeys = "W" | "X" | "A" | "I" | "F" | "T" | "S" | "U";

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


/** 결과 표시 페이지 */
function ResultContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "Unknown";
    const levelStr = searchParams.get("level");
    const level = levelStr ? Number(levelStr) : undefined;

    // 통계 상태
    const [stats, setStats] = useState<{ totalCount: number; typeCount: number; levelCount: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 통계 조회
    useEffect(() => {
        if (!type || type === "Unknown") return;

        setLoading(true);
        fetch(`/api/stats/result/get?type=${type}${level !== undefined ? `&level=${level}` : ""}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setStats({totalCount: data.totalCount, typeCount: data.typeCount, levelCount: data.levelCount});
                }
            })
            .catch(() => setError("Failed to load stats"))
            .finally(() => setLoading(false));
    }, [type, level]);

    const animalData: AnimalData = animalTypes[type];

    // 모든 지표 값 추출
    const traitKeys: TraitKeys[] = ["W", "X", "A", "I", "F", "T", "S", "U"];
    const userTraitsFull: Record<TraitKeys, number> = traitKeys.reduce((acc, key) => {
        acc[key] = Number(searchParams.get(key)) || 0;
        return acc;
    }, {} as Record<TraitKeys, number>);

    // 하위 타입 결정 로직
    const determineSubtype = (
        userTraits: { W: number; A: number; F: number; S: number },
        subtypesByLevel: AnimalData["types"]
    ): Subtype | null => {
        let bestMatch = null;
        let smallestDiff = Infinity;

        Object.values(subtypesByLevel).flat().forEach((sub) => {
            const diff = ["W", "A", "F", "S"].reduce((acc, key) => {
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
        {W: userTraitsFull.W, A: userTraitsFull.A, F: userTraitsFull.F, S: userTraitsFull.S},
        animalData.types
    );


    // 링크 복사 핸들러
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.success("복사 완료");
        }).catch((err) => {
            console.error("링크 복사 실패:", err);
            toast.error("복사에 실패했습니다.");
        });
    };

    // 로컬용 키 초기화
    useEffect(() => {
        const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_SHARE;
        if (!kakaoAppKey) {
            console.log("app key missing");
            return;
        }

        if (typeof window !== "undefined" && window.Kakao) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(kakaoAppKey);
                console.log("app key init complete");
            }
        }
    }, []);

    // 카카오톡 공유 핸들러
    const handleKakaoShare = () => {
        if (window.Kakao && window.Kakao.isInitialized()) {
            window.Kakao.Link.sendDefault({
                objectType: "feed",
                content: {
                    title: `나의 유형은 ${type}`,
                    description: `⭐${selectedSubtype?.name}⭐`,
                    imageUrl: animalImageUrlForKakao,
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
            });
        } else {
            toast.error("카카오톡 공유 기능을 사용할 수 없습니다.");
        }
    };

    // 모바일 공유 기능
    const handleWebShare = async () => {
        if (!navigator.share) {
            toast("공유 기능이 지원되지 않는 환경이에요.\n링크를 복사하거나, 카카오톡으로 공유해 주세요.");
        } else {
            try {
                await navigator.share({
                    title: `나의 유형은 ${type}`,
                    text: `⭐ ${selectedSubtype?.name} ⭐`,
                    url: window.location.href,
                });
            } catch (err: unknown) {
                // 단순 공유 취소는 에러를 출력 X
                if (err instanceof Error) {
                    if (err.name !== 'AbortError') {
                        console.error(err);
                        toast.error("공유 실패😿");
                    }
                } else {
                    console.error("에러 발생:", err);
                }
            }
        }
    }

    // 타입별 동물 이미지 매핑
    const animalImages: Record<string, string> = {
        WAFS: "/images/b_hedgehog.png",
        WATS: "/images/turtle.png",
        WIFS: "/images/b_cat.png",
        WITS: "/images/penguin.png",
        WAFU: "/images/b_rabbit.png",
        WATU: "/images/b_badger.png",
        WIFU: "/images/b_fox.png",
        WITU: "/images/b_weasel.png",
        XAFS: "/images/b_dog.png",
        XATS: "/images/b_wolf.png",
        XIFS: "/images/b_lion.png",
        XITS: "/images/b_elephant.png",
        XAFU: "/images/b_dolphin.png",
        XATU: "/images/b_shark.png",
        XIFU: "/images/squirrel.png",
        XITU: "/images/b_octopus.png",
        HUMAN: "/images/human.png",
    }

    // 이미지 URL
    const animalImageUrl = animalImages[type]; // 내부 이미지 (상대 경로)
    const animalImageUrlForKakao = `${window.location.origin}${animalImageUrl}`; // 카카오 공유용 (절대 경로)

    return (
        <div className="character-card-parent">
            <Toaster position="top-center"/>
            <div className="character-card">
                {type !== "HUMAN" ? <h1>🎉 변신 성공 🎉</h1> : <h1>☠️ 변신 실패 ☠️</h1>}
                <h2>⭐ {selectedSubtype?.name || "알 수 없음"} ⭐</h2>
                <div>
                    <Image
                        src={animalImageUrl}
                        alt={`${type}이미지`}
                        width={200}
                        height={300}
                    />
                </div>

                <div className="trait-bar-container">
                    <p className="trait-type-label">{type}</p>
                    <TraitBar description="내성적인,외향적인" element="에너지" leftLabel="W" rightLabel="X"
                              leftValue={userTraitsFull.W} rightValue={userTraitsFull.X}/>
                    <TraitBar description="감각적인,직관적인" element="인식" leftLabel="A" rightLabel="I"
                              leftValue={userTraitsFull.A} rightValue={userTraitsFull.I}/>
                    <TraitBar description="감성적인,이성적인" element="의사결정" leftLabel="F" rightLabel="T"
                              leftValue={userTraitsFull.F} rightValue={userTraitsFull.T}/>
                    <TraitBar description="계획적인,자유로운" element="라이프" leftLabel="S" rightLabel="U"
                              leftValue={userTraitsFull.S} rightValue={userTraitsFull.U}/>
                </div>
                <div className="stats-section">
                    {loading && <p>통계 불러오는 중...</p>}
                    {error && <p className="error">{error}</p>}
                    {stats && (
                        <p>
                            🔍 전체 {stats.totalCount}명 중 {type} 타입은 {stats.typeCount}명(상위 : {stats.totalCount > 0 ? ((stats.typeCount / stats.totalCount) * 100).toFixed(1) : 0}%)
                            <br />
                            🔍 {type} 타입 중 {stats.typeCount}명인 {selectedSubtype?.name}(상위 : {stats.totalCount > 0 ? ((stats.levelCount / stats.typeCount) * 100).toFixed(1) : 0}%)
                            <br/>
                        </p>
                    )}
                </div>

                <h3>{selectedSubtype?.description || "설명이 없습니다."}</h3>
                <ul>
                    {selectedSubtype?.characteristics?.length ? (
                        selectedSubtype.characteristics.map((char, idx) => (
                            <li key={idx}>{char}</li>
                        ))
                    ) : (
                        <li>특성 정보가 없습니다.</li>
                    )}
                </ul>
                <div className="button-group">
                    <button onClick={handleWebShare} className="share-btn native">
                        모바일 공유
                    </button>
                    <button onClick={handleCopyLink} className="share-btn link">
                        링크 복사
                    </button>
                    <button onClick={handleKakaoShare} className="share-btn kakao">
                        카카오톡 공유
                    </button>
                    <Link href="/" className="home-link">
                        Home
                    </Link>
                </div>
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