'use client';

import Script from 'next/script';

export default function GoogleAd() {
    return (
        <>
            <ins className="adsbygoogle"
                 style={{ display: 'block', height: '50px', margin: '0 auto' }}
                 data-ad-client="ca-pub-3666035347659822"
                 data-ad-slot="3570785121"
                 data-ad-format="horizontal"
                 data-full-width-responsive="true">
            </ins>

            <Script id="ads-init" strategy="afterInteractive">
                {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
            </Script>
        </>
    );
}