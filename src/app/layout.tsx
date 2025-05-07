import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";
import Head from "next/head";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <body>
                <Header/>
                <main>{children}</main>
                <Footer/>
            </body>
        </html>
    );
}
