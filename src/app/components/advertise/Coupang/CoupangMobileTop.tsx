"use client";
import {useEffect, useState} from "react";

/** 모바일용 상단 얇은 띠 */
export default function CoupangMobileTop() {
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
        <div style={{textAlign: "center", marginBottom:"-10px"}}>
            <iframe
                src="https://ads-partners.coupang.com/widgets.html?id=868046&template=banner&trackingCode=AF1164133&subId=&width=320&height=50"
                width="320"
                height="50"
                frameBorder="0"
                scrolling="no"
                referrerPolicy="unsafe-url"
            ></iframe>
        </div>
    );
}