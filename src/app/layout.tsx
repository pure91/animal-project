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

export const metadata = {
    title: '동물 성격 유형 테스트',
    description: 'Zootypes는 호랑이의 생일잔치를 참가하기 위해 성격 유형 테스트를 통해 동물로 변신하는 웹사이트입니다.',
    openGraph: {
        title: '동물 성격 유형 테스트',
        description: 'Zootypes는 호랑이의 생일잔치를 참가하기 위해 성격 유형 테스트를 통해 동물로 변신하는 웹사이트입니다.',
        url: 'https://zootypes.com',
        siteName: 'Zootypes',
        type: 'website',
        images: [
            {
                url: 'https://zootypes.com/zootypes-og-image.png',
                width: 1200,
                height: 630,
                alt: 'Zootypes 동물 성격 유형 테스트'
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

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