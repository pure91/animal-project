"use client";

import {useEffect, useState} from "react";
import Script from "next/script";

/** pc용 가로로 긴 직사각형 하단용 */
export default function KakaoAdPCBottom() {
    const [isDesktopBottom, setIsDesktopBottom] = useState(false);

    // PC 환경에서만 보이기
    useEffect(() => {
        function checkWidth() {
            setIsDesktopBottom(window.innerWidth > 768);
        }

        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    if (!isDesktopBottom) return null;

    return (
        <div
            style={{
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                width: "728px",
                height: "90px",
            }}
        >
            <ins
                className="kakao_ad_area"
                style={{display:"none", marginTop:"15px"}}
                data-ad-unit="DAN-Dd6IEg8SN5aXtv5R"
                data-ad-width="728"
                data-ad-height="90"
            />
            <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload" />
        </div>
    );
}