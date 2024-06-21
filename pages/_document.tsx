import { Html, Head, Main, NextScript } from 'next/document'

import { THEME_COLOR, URL } from '@/drivers/views/components/const'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color={THEME_COLOR}
        />
        <meta name="msapplication-TileColor" content={THEME_COLOR} />
        <meta name="theme-color" content={THEME_COLOR}></meta>

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href={URL} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
