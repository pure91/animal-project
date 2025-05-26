import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";
import Script from "next/script";
import KakaoAdMobileBottom from "@/app/components/advertise/KaKao/KakaoAdMobileBottom";
import KakaoAdPCBottom from "@/app/components/advertise/KaKao/KakaoAdPCBottom";
import KakaoAdPCLeft from "@/app/components/advertise/KaKao/KakaoAdPCLeft";
import KakaoAdPCRight from "@/app/components/advertise/KaKao/KakaoAdPCRight";
import KaKaoAdMobileTop from "@/app/components/advertise/KaKao/KaKaoAdMobileTop";

// 카카오 공유 window 객체 타입 선언
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kakao: any;
    }
}

export const metadata = {
    title: '동물 성격 테스트 - Zootypes',
    description: '호랑이의 생일잔치에 참여해보세요! 단, 성격 테스트를 통해 동물로 변신해야합니다. 질문에 제대로 응하지 않는다면 변신에 실패할 수도 있어요!',
    applicationName: 'Zootypes',
    appleWebApp: {
        title: 'Zootypes',
    },
    openGraph: {
        title: '동물 성격 테스트 - Zootypes',
        description: '호랑이의 생일잔치에 참여해보세요! 단, 성격 테스트를 통해 동물로 변신해야합니다. 질문에 제대로 응하지 않는다면 변신에 실패할 수도 있어요!',
        url: 'https://zootypes.com',
        siteName: 'Zootypes',
        type: 'website',
        images: [
            {
                url: 'https://zootypes.com/zootypes-og-image-v2.png',
                width: 1200,
                height: 630,
                alt: '동물 성격 테스트 | Zootypes | 호랑이 생일잔치 컨셉'
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
        <main>
            <KaKaoAdMobileTop/>
            <KakaoAdPCLeft/>
            <KakaoAdPCRight/>
            {children}
        </main>
        <KakaoAdPCBottom/>
        <KakaoAdMobileBottom/>
        <Footer/>
        </body>
        </html>
    );
}