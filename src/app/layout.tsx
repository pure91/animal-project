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
    title: '동물 성격 테스트',
    description: '성격 테스트 결과에 따라 16가지 동물 캐릭터 중 하나로 변신! 각 동물은 level별 4단계로 나뉘어 총 64장의 이미지로 나만의 동물 아이덴티티를 완성하세요.',
    applicationName: '동물 성격 테스트',
    appleWebApp: {
        title: '동물 성격 테스트',
    },
    openGraph: {
        title: '동물 성격 테스트',
        description: '성격 테스트 결과에 따라 16가지 동물 캐릭터 중 하나로 변신! 각 동물은 level별 4단계로 나뉘어 총 64장의 이미지로 나만의 동물 아이덴티티를 완성하세요.',
        url: 'https://zootypes.com',
        siteName: '동물 성격 테스트',
        type: 'website',
        images: [
            {
                url: 'https://zootypes.com/zootypes-og-image-v2.png',
                width: 1200,
                height: 630,
                alt: '동물 성격 테스트 | zootypes | 16가지 동물과 64가지 레벨별 이미지'
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