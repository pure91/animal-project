'use client';

import Script from 'next/script';

export default function GoogleAd() {
    return (
        <>
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-3666035347659822"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>

            <Script id="ads-init" strategy="afterInteractive">
                {`
                  (adsbygoogle = window.adsbygoogle || []).push({});
                `}
            </Script>
        </>
    );
}
