import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="#UTD108 Friendship" />
        <meta
          property="og:description"
          content="Open-source web application for #UTD108. Made by PeerawitP and Captainistz"
        />
        <meta
          property="og:image"
          content="https://www.liveabout.com/thmb/fxGnjPVpRlFfpGnl26UW4GyBnSQ=/1411x1411/smart/filters:no_upscale()/cat-giving-finger-590355133df78c5456e78839.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
