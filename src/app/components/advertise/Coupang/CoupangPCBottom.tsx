"use client";

import {useEffect, useState} from "react";

/** PC용 다이나믹 배너 직사각형 바텀 */
export default function CoupangPCBottom() {
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
        <div style={{textAlign: "center", marginBottom: "-3px"}}>
            <p style={{fontSize: '14px', color: '#888', wordBreak: "keep-all", textAlign: "center", margin: "0 0 5px 0"}}>
                쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공 받습니다.
            </p>
            <iframe
                src="https://ads-partners.coupang.com/widgets.html?id=867974&template=carousel&trackingCode=AF1164133&subId=&width=680&height=140&tsource="
                width="680"
                height="140"
                frameBorder="0"
                scrolling="no"
                referrerPolicy="unsafe-url"
            />
        </div>
    );
}
