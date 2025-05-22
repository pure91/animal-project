import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";
import Script from "next/script";
import CoupangPCBottom from "@/app/components/advertise/Coupang/CoupangPCBottom";
import CoupangMobileTop from "@/app/components/advertise/Coupang/CoupangMobileTop";
import CoupangPCLeft from "@/app/components/advertise/Coupang/CoupangPCLeft";
import CoupangPCRight from "@/app/components/advertise/Coupang/CoupangPCRight";
import CoupangMobileBottom from "@/app/components/advertise/Coupang/CoupangMobileBottom";

// 카카오 공유 window 객체 타입 선언
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kakao: any;
    }
}

export const metadata = {
    title: '동물 성격 유형 테스트 | 호랑이의 생일잔치에 초대합니다!',
    description: '호랑이의 생일잔치에 참여해보세요! 단, 성격 유형 테스트를 통해 동물로 변신해야합니다. 질문에 제대로 응하지 않는다면 변신에 실패할 수도 있어요!',
    applicationName: 'Zootypes',
    appleWebApp: {
        title: 'Zootypes',
    },
    openGraph: {
        title: '동물 성격 유형 테스트 | 호랑이의 생일잔치에 초대합니다!',
        description: '호랑이의 생일잔치에 참여해보세요! 단, 성격 유형 테스트를 통해 동물로 변신해야합니다. 질문에 제대로 응하지 않는다면 변신에 실패할 수도 있어요!',
        url: 'https://zootypes.com',
        siteName: 'Zootypes',
        type: 'website',
        images: [
            {
                url: 'https://zootypes.com/zootypes-og-image-v2.png',
                width: 1200,
                height: 630,
                alt: '성격 유형 테스트를 통해 동물로 변신하는 재미있는 심리 테스트 검사 | 호랑이 생일잔치 컨셉'
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
    other: {
        'naver-site-verification': 'f90d73710976c4dfdcfe0aa2bc8cb235894d2f95',
    }
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html>
        <head>
            {/*Google Adsense*/}
            <meta name="google-adsense-account" content="ca-pub-3666035347659822"/>
        </head>
        <body>
        {/* Kakao Share */}
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive"/>
        <Header/>
        {/* Coupang Partners */}
        {/*<CoupangMobileTop/>*/}
        <main>
            {/*<CoupangPCLeft/>*/}
            {children}
            {/*<CoupangPCRight/>*/}
        </main>
        <CoupangPCBottom/>
        <CoupangMobileBottom/>
        <Footer/>
        </body>
        </html>
    );
}