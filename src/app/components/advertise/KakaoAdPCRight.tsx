"use client";

import {useEffect, useState} from "react";
import Script from "next/script";

/** pc용 세로로 긴 직사각형 오른쪽 */
export default function KakaoAdPCRight() {
    const [isRightDesktop, setIsRightDesktop] = useState(false);

    // PC 환경에서만 보이기
    useEffect(() => {
        function checkWidth() {
            setIsRightDesktop(window.innerWidth > 768);
        }

        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    if (!isRightDesktop) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: "111px", // header 아래
                right: "0", // 좌측
                width: "160px",
                height: "600px",
                zIndex: 10,
            }}
        >
            <ins
                className="kakao_ad_area"
                style={{display:"none"}}
                data-ad-unit="DAN-sRGQC1Po6R2TXwdS"
                data-ad-width="160"
                data-ad-height="600"
            />
            <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="lazyOnload" />
        </div>
    );
}