"use client";

import {useEffect, useState} from "react";
import Script from "next/script";

/** 모바일용 가로를 채우는 직사각형 하단 배치 */
export default function KakaoAdMobileBottom() {
    const [isMobileBottom, setIsMobileBottom] = useState(false);

    // 모바일 환경에서만 보이기
    useEffect(() => {
        const handleResize = () => {
            setIsMobileBottom(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobileBottom) return null;

    return (
        <div style={{textAlign: "center", marginBottom: '-25px'}}>
            <ins className="kakao_ad_area" style={{display: "none"}}
                 data-ad-unit="DAN-HJOimM1VFybaBUeU"
                 data-ad-width="320"
                 data-ad-height="100"></ins>
            <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload"/>
        </div>
    );
}