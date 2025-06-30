"use client";

import {useSearchParams} from "next/navigation";
import Link from "next/link";
import React, {Suspense, useEffect, useState} from "react";
import Image from "next/image";
import TraitBar from "@/app/components/TraitBar";
import rawAnimalTypes from '@/app/data/animalTypes.json';
import type {AnimalData, LevelKeys, TraitKeys} from '@/types/animalTypes';
import {getCharacterProfile} from '@/utils/animalUtils';
import {createShareSlug} from "@/utils/shareUtils";
import toast, {Toaster} from "react-hot-toast";
import {IoIosLink} from "react-icons/io";
import {FaFacebookF, FaTwitter} from "react-icons/fa";
import {SiKakaotalk} from "react-icons/si";
import {getAnimalImageAbsoluteUrl, getAnimalImageUrl} from "@/utils/getAnimalImageUrl";

// json 원시 데이터 할당
const animalTypes = rawAnimalTypes as Record<string, AnimalData>;

/** URL 쿼리 파라미터를 통해 결과 표시(통계, 공유) */
function ResultContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "Unknown";
    const level = searchParams.get("level");

    // 통계 상태
    const [stats, setStats] = useState<{ totalCount: number; typeCount: number; levelCount: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 공유 상태
    const [isSharing, setIsSharing] = useState(false);      // 공용
    const [showFbModal, setShowFbModal] = useState(false);  // 페북
    const [isMobile, setIsMobile] = useState(false);        // 모바일

    // 모바일 감지
    useEffect(() => {
        if (typeof window !== "undefined") {
            const userAgent = navigator.userAgent;
            const mobileRegex = /android|iphone|ipad|ipod/i;
            setIsMobile(mobileRegex.test(userAgent));
        }
    }, []);

    // fb=1 파라미터 확인, isMobile 결정된 이후
    useEffect(() => {
        if (!isMobile) return; // 모바일일 때만 실행
        const fbFlag = searchParams.get("fb");
        if (fbFlag === "1" && isMobile) {
            setShowFbModal(true);
        }
    }, [searchParams, isMobile]);

    // 카카오톡 init
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

    // 동물 데이터
    const animalData: AnimalData = animalTypes[type];

    // traits 키 배열
    const traitKeys: TraitKeys[] = ["I", "O", "R", "D", "E", "C", "S", "A"];

    // URL의 traits 전체 값 받아옴
    const resultTraits: Record<TraitKeys, number> = traitKeys.reduce((acc, key) => {
        acc[key] = Number(searchParams.get(key)) || 0;
        return acc;
    }, {} as Record<TraitKeys, number>);

    // 캐릭터 결정
    const characterProfile = animalData ? getCharacterProfile(resultTraits, animalData.types) : null;

    // 링크 복사 핸들러
    const handleCopyLink = () => {
        if (isSharing) return;
        setIsSharing(true);

        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.success("링크 복사 완료");
            })
            .catch((err) => {
                console.error("링크 복사 실패:", err);
                toast.error("복사에 실패했습니다.");
            })
            .finally(() => {
                setTimeout(() => setIsSharing(false), 1000);
            });
    };

    // 카카오톡 공유 핸들러
    const handleKakaoShare = () => {
        if (window.Kakao && window.Kakao.isInitialized()) {
            window.Kakao.Link.sendDefault({
                objectType: "feed",
                content: {
                    title: `나의 유형은 ${type}`,
                    description: `⭐${characterProfile?.name}⭐`,
                    imageUrl: animalImageUrlAbsolutePath,
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

    // 페이스북 공유 핸들러
    const handleFaceBookShare = () => {
        if (isSharing) return;
        setIsSharing(true);

        const slug = createShareSlug(resultTraits, type, level as LevelKeys);
        const shareUrl = `https://zootypes.com/share/${slug}${isMobile ? '?fb=1' : ''}`;
        const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=705418702255336&display=popup&href=${encodeURIComponent(shareUrl)}`;

        window.open(facebookShareUrl, "_blank")
        setTimeout(() => setIsSharing(false), 3000);
    }

    const openFacebookApp = () => {
        const now = Date.now();
        window.location.href = "fb://";

        // fallback: 앱 못 열었으면 웹으로 리디렉션
        setTimeout(() => {
            if (Date.now() - now < 2000) {
                window.open("https://www.facebook.com", "_blank");
            }
            setShowFbModal(false);
        }, 1500);
    };

    // 트위터 공유 핸들러
    const handleTwitterShare = () => {
        if (isSharing) return;
        setIsSharing(true);

        const text = `나의 유형은 ${type} 타입의⭐${characterProfile?.name}⭐\n🐾${characterProfile?.description}`;
        const slug = createShareSlug(resultTraits, type, level as LevelKeys);
        const url = encodeURIComponent(`https://zootypes.com/share/${slug}`);
        const tweetText = encodeURIComponent(text);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`;
        window.open(twitterUrl, "_blank");

        setTimeout(() => setIsSharing(false), 3000);
    };

    // 이미지 URL
    const animalImageUrl = getAnimalImageUrl(type, level as LevelKeys); // 내부 이미지 (상대 경로)
    const animalImageUrlAbsolutePath = typeof window !== "undefined" ? getAnimalImageAbsoluteUrl(type, level as LevelKeys) : ""; // 카카오 공유용 (절대 경로)

    // 궁합 타입
    const goodType = characterProfile?.match?.good ?? "";
    const badType = characterProfile?.match?.bad ?? "";
    const goodProfile = goodType ? animalTypes[goodType]?.types[level as LevelKeys]?.[0] : null;
    const badProfile = badType ? animalTypes[badType]?.types[level as LevelKeys]?.[0] : null;
    const goodName = goodProfile?.name ?? "정보 없음";
    const badName = badProfile?.name ?? "정보 없음";

    return (
        <div className="character-card-parent">
            <Toaster position="top-center"/>
            <div className="character-card">
                <span className="character-type">{type}</span>
                {type !== "HUMAN" ? <h1>🎉변신 성공🎉</h1> : <h1>☠️ 변신 실패 ☠️</h1>}
                <h2>⭐{characterProfile?.name || "알 수 없음"}⭐</h2>
                <div>
                    <Image
                        src={animalImageUrl}
                        alt={`${type}이미지`}
                        width={200}
                        height={300}
                    />
                </div>

                <div className="trait-bar-container">
                    <div className="tooltip">
                        <TraitBar description="내향,외향" element="에너지 방향" leftLabel="I" rightLabel="O"
                                  leftValue={resultTraits.I} rightValue={resultTraits.O}/>
                        <TraitBar description="현실,추상" element="인식 기능" leftLabel="R" rightLabel="D"
                                  leftValue={resultTraits.R} rightValue={resultTraits.D}/>
                        <TraitBar description="감성,이성" element="판단 기능" leftLabel="E" rightLabel="C"
                                  leftValue={resultTraits.E} rightValue={resultTraits.C}/>
                        <TraitBar description="계획,적응" element="생활 방식" leftLabel="S" rightLabel="A"
                                  leftValue={resultTraits.S} rightValue={resultTraits.A}/>
                    </div>
                </div>
                <div className="stats-section">
                    {loading && <p>통계 불러오는 중...</p>}
                    {error && <p className="error">{error}</p>}
                    <h3 className="stats-title">📊 통계</h3>
                    {stats && (
                        <div className="stats-card">
                            <p>
                                지금까지 총 <span className="first-color">{stats.totalCount}명</span>이 테스트를 진행했어요
                            </p>
                            <p>
                                <b>{type}</b> 타입은 총 <span className="first-color"> {stats.typeCount}명</span>으로
                                전체의 약 <span className="first-color">
                                {stats.totalCount > 0 ? ((stats.typeCount / stats.totalCount) * 100).toFixed(1) : 0}%</span>에
                                해당해요
                            </p>
                            <p>
                                이 <b>{type}</b> 타입 중에서도 <span
                                className="second-color">{stats.levelCount}명({stats.typeCount > 0 ? ((stats.levelCount / stats.typeCount) * 100).toFixed(1) : 0}%)</span>인
                                <span className="bold-name">⭐{characterProfile?.name}⭐</span>
                            </p>
                            <p className="sub-note">
                                <i>😎 전체 참여자
                                    중 {(stats.totalCount > 0 ? ((stats.levelCount / stats.totalCount) * 100).toFixed(2) : 0)}%만
                                    이 유형이에요</i>
                            </p>
                        </div>
                    )}
                </div>

                <h3 className="stats-characteristics">✏️ {characterProfile?.description || "설명 없음"}의 특징</h3>
                <ul>
                    {characterProfile?.characteristics?.length ? (
                        characterProfile.characteristics.map((char, idx) => (
                            <li key={idx}>{char}</li>
                        ))
                    ) : (
                        <li>특성 정보가 없습니다.</li>
                    )}
                </ul>

                <div className="match-section">
                    <div className="match-card good">
                        {goodProfile ? (
                            <div className="match-card">
                                <span className="match-type">{goodType}</span>
                                {type === "HUMAN" ? <h4>모두 반가워!</h4> : <h4>우린 최고야!</h4>}
                                <span className="match-text">
                                    <span className="match-name">⭐{goodName}⭐</span>
                                </span>
                                <Image
                                    src={getAnimalImageUrl(goodType, level as LevelKeys)}
                                    alt={`${goodType} 이미지`}
                                    width={100}
                                    height={180}
                                />
                            </div>
                        ) : (
                            <p>정보 없음</p>
                        )}
                    </div>

                    <div className="match-card bad">
                        {badProfile ? (
                            <div className="match-card">
                                <span className="match-type">{badType}</span>
                                {type === "HUMAN" ? <h4>사람 싫어!</h4> : <h4>어렵다 너..</h4>}
                                <span className="match-text">
                                    <span className="match-name">⭐{badName}⭐</span>
                                </span>
                                <Image
                                    src={getAnimalImageUrl(badType, level as LevelKeys)}
                                    alt={`${badType} 이미지`}
                                    width={100}
                                    height={180}
                                />
                            </div>
                        ) : (
                            <p>정보 없음</p>
                        )}
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={handleCopyLink} className="share-btn link-copy" aria-label="링크 복사"
                            disabled={isSharing}>
                        <IoIosLink size={20}/>
                    </button>
                    <button onClick={handleKakaoShare} className="share-btn kakao" aria-label="카카오톡 공유"
                            disabled={isSharing}>
                        <SiKakaotalk size={20}/>
                    </button>
                    <button onClick={handleFaceBookShare} className="share-btn facebook" aria-label="페이스북 공유"
                            disabled={isSharing}>
                        <FaFacebookF size={20}/>
                    </button>
                    <button onClick={handleTwitterShare} className="share-btn twitter" aria-label="트위터 공유"
                            disabled={isSharing}>
                        <FaTwitter size={20}/>
                    </button>
                    <Link href="/" className="home-link">
                        Home
                    </Link>
                </div>
            </div>
            {showFbModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>☺️Facebook 공유 완료</h3>
                        <p>지금 Facebook 앱을 열어보시겠습니까?</p>
                        <div className="button-row">
                            <button onClick={openFacebookApp}>앱 열기</button>
                            <button onClick={() => setShowFbModal(false)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
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