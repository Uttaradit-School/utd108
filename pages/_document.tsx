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
          content="https://utd.ac.th/main/wp-content/uploads/2018/05/new_utd-logo-300x300.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
