import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";
import Script from "next/script";

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
            {/* Google AdSense */}
            {/*<script*/}
            {/*    async*/}
            {/*    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3666035347659822"*/}
            {/*    crossOrigin="anonymous"*/}
            {/*/>*/}
            {/*<meta*/}
            {/*    name="google-adsense-account"*/}
            {/*    content="ca-pub-3666035347659822"*/}
            {/*/>*/}
        </head>
        <body>
        {/* Kakao Share */}
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
        />
        <Header/>
        <main>{children}</main>
        {/* 애드핏 광고 */}
        {/* PC용 세로로 긴 직사각형 */}
        <ins className="kakao_ad_area" style={{display: "none"}}
             data-ad-unit="DAN-7NrcKlwYN0GSSzow"
             data-ad-width="160"
             data-ad-height="600"
        ></ins>
        {/* 모바일용 얇은 띠배너형 */}
        <ins className="kakao_ad_area" style={{display: "none"}}
             data-ad-unit="DAN-Z3dBCJFSTNoWEHvK"
             data-ad-width="320"
             data-ad-height="50"
        ></ins>
        {/* PC/M 겸용 정사각에 가까운 직사각형 */}
        <ins className="kakao_ad_area" style={{display: "none"}}
             data-ad-unit="DAN-HJOimM1VFybaBUeU"
             data-ad-width="300"
             data-ad-height="250"
        ></ins>
        <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
        <Footer/>
        </body>
        </html>
    );
}