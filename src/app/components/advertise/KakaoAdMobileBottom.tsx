"use client";

import {useEffect, useState} from "react";
import Script from "next/script";

/** PC/M 겸용 정사각에 가까운 직사각형 하단 배치 */
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
        <div style={{textAlign: "center"}}>
            <ins
                className="kakao_ad_area"
                style={{display:"none"}}
                data-ad-unit="DAN-HJOimM1VFybaBUeU"
                data-ad-width="300"
                data-ad-height="250"
            ></ins>
            <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload" />
        </div>
    );
}