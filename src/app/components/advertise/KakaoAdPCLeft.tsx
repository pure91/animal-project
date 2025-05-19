"use client";

import {useEffect, useState} from "react";
import Script from "next/script";

/** pc용 세로로 긴 직사각형 왼쪽 */
export default function KakaoAdPCLeft() {
    const [isLeftDesktop, setIsLeftDesktop] = useState(false);

    // PC 환경에서만 보이기
    useEffect(() => {
        function checkWidth() {
            setIsLeftDesktop(window.innerWidth > 768);
        }

        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    if (!isLeftDesktop) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: "111px",
                left: "0",
                width: "160px",
                height: "600px",
            }}
        >
            <ins
                className="kakao_ad_area"
                style={{display: "none"}}
                data-ad-unit="DAN-7NrcKlwYN0GSSzow"
                data-ad-width="160"
                data-ad-height="600"
            />
            <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload"/>
        </div>
    );
}