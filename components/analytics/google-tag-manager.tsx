import Script from "next/script"

export function GoogleTagManager() {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID

    if (!gtmId) return null

    return (
        <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
            });

            try {
                var item = localStorage.getItem('cookie_consent');
                if (item) {
                    var c = JSON.parse(item);
                    if (c && typeof c === 'object') {
                        gtag('consent', 'update', c);
                    }
                }
            } catch(e) {}

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${gtmId}');
        `,
            }}
        />
    )
}

export function GoogleTagManagerNoscript() {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID

    if (!gtmId) return null

    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>
    )
}
