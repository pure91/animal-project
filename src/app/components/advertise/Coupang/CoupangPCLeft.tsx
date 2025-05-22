"use client";

import {useEffect, useState} from "react";

/** pc용 세로로 긴 직사각형 왼쪽 카테고리 배너 */
export default function CoupangPCLeft() {
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
            <iframe
                src="https://ads-partners.coupang.com/widgets.html?id=868017&template=banner&trackingCode=AF1164133&subId=&width=160&height=600"
                width="160" height="600" frameBorder="0" scrolling="no" referrerPolicy="unsafe-url"
            ></iframe>
        </div>
    );
}