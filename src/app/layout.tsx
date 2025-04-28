import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {ReactNode} from "react";


export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html>
        <body>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </body>
        </html>
    );
}
