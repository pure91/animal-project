"use client";

import {useEffect, useState} from "react";

/** pc용 세로로 긴 직사각형 오른쪽 카테고리 배너 */
export default function CoupangPCRight() {
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
                top: "111px",
                right: "0",
                width: "160px",
                height: "600px",
            }}
        >
            <iframe
                src="https://ads-partners.coupang.com/widgets.html?id=868027&template=banner&trackingCode=AF1164133&subId=&width=160&height=600"
                width="160" height="600" frameBorder="0" scrolling="no" referrerPolicy="unsafe-url"
            />
        </div>
    );
}