import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";
import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html>
            <body>
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