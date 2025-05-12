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
            <Script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3666035347659822"
                    crossOrigin="anonymous"></Script>
            <meta name="google-adsense-account" content="ca-pub-3666035347659822"/>
        </head>
        <body>
        {/* Kakao Share */}
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
        />
        <Header/>
        <main>{children}</main>
        <Footer/>
        </body>
        </html>
    );
}