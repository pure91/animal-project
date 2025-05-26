"use client";
import {useEffect, useState} from "react";
import Script from "next/script";

/** 모바일용 상단 얇은 띠 */
export default function KaKaoAdMobileTop() {
    const [isMobileTop, setIsMobileTop] = useState(false);

    // 모바일 환경에서만 보이기
    useEffect(() => {
        function handleResize() {
            setIsMobileTop(window.innerWidth <= 768);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobileTop) return null;

    return (
        <>
            <ins
                className="kakao_ad_area"
                style={{display: "none", marginTop: "-20px"}}
                data-ad-unit="DAN-Z3dBCJFSTNoWEHvK"
                data-ad-width="320"
                data-ad-height="50"
            ></ins>
            <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload"/>
        </>
    );
}