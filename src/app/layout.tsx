import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";
import Script from "next/script";
import GoogleAd from "@/app/components/advertise/Google/GoogleAd";

// 카카오 공유 window 객체 타입 선언
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kakao: any;
    }
}

export const metadata = {
    title: 'zootypes | 동물 성격 테스트',
    description: '성격 유형 테스트를 통해 16가지 동물 중 나와 닮은 캐릭터를 확인해보세요. 레벨별 64가지 이미지로 나만의 동물 아이덴티티를 완성!',
    applicationName: 'zootypes',
    appleWebApp: {
        title: 'zootypes',
    },
    openGraph: {
        title: 'zootypes - 동물 성격 테스트',
        description: '테스트 결과로 16가지 동물 캐릭터 중 하나를 만나보세요. 각 캐릭터는 레벨별 4단계 이미지로 구성되어 더욱 특별합니다.',
        url: 'https://zootypes.com',
        siteName: 'zootypes',
        type: 'website',
        images: [
            {
                url: 'https://zootypes.com/zootypes-og-image-v2.png',
                width: 1200,
                height: 630,
                alt: 'zootypes | 성격으로 알아보는 나의 동물 유형 | 16가지 동물과 64가지 레벨별 이미지'
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
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3666035347659822"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        </head>
        <body>
        {/* Kakao Share */}
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="beforeInteractive"/>
        <Header/>
        <main>
            {/*<KaKaoAdMobileTop/>*/}
            {/*<KakaoAdPCLeft/>*/}
            {/*<KakaoAdPCRight/>*/}
            {children}
            <GoogleAd />
        </main>
        {/*<KakaoAdPCBottom/>*/}
        {/*<KakaoAdMobileBottom/>*/}
        <Footer/>
        </body>
        </html>
    );
}