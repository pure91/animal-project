"use client";

import {useEffect, useState} from "react";

/** 모바일용 하단 박스 */
export default function CoupangMobileBottom() {
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
            <p style={{
                fontSize: '10px',
                color: '#888',
                wordBreak: "keep-all",
                textAlign: "center",
                margin: "-5px 0 5px 0"
            }}>
                쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
            </p>
            <iframe
                src="https://ads-partners.coupang.com/widgets.html?id=868040&template=carousel&trackingCode=AF1164133&subId=&width=300&height=250&tsource="
                width="300"
                height="250"
                frameBorder="0"
                scrolling="no"
                referrerPolicy="unsafe-url"
            />
        </div>
    );
}