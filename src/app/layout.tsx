import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";
import Script from "next/script";
import KakaoAdMobileBottom from "@/app/components/advertise/KakaoAdMobileBottom";
import KakaoAdPCLeft from "@/app/components/advertise/KakaoAdPCLeft";
import KakaoAdPCRight from "@/app/components/advertise/KakaoAdPCRight";
import KaKaoAdMobileTop from "@/app/components/advertise/KaKaoAdMobileTop";
import KakaoAdPCBottom from "@/app/components/advertise/KakaoAdPCBottom";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kakao: any;
    }
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html>
        <head>
        </head>
        <body>
        {/* Kakao Share */}
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
        />
        <Header/>
        {/* Kakao Adfit */}
        <KaKaoAdMobileTop/>
        <main>
            <KakaoAdPCLeft/>
            {children}
            <KakaoAdPCRight/>
            <KakaoAdPCBottom/>
        </main>
        <KakaoAdMobileBottom/>
        <Footer/>
        </body>
        </html>
    );
}