import { ReactNode } from 'react'

import Container from '../common/Container'
import Navigation from '../Navigaiton'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-stone-200 contrast-more:bg-white dark:bg-stone-800 dark:text-white dark:contrast-more:bg-black">
      <Navigation />
      <main className="flex grow flex-col pb-16 pt-8">
        <Container>{children}</Container>
        <footer className="flex flex-col justify-center gap-y-3 p-8">
          <div className="text-sm">
            {`当サイトに掲載しているアルバムアートワークはSpotify APIで取得したURLを使って表示しており、公式やDiscordの埋め込み機能と同様にSpotifyサーバーの画像をそのまま埋め込んでいるため、権利上の問題はないと判断し運用しています。楽曲の権利は提供元に帰属します。`}
            {`当サイトはいかなる広告・解析サービスも使用しておらず、管理画面以外でCookieは使用しておりません。`}
          </div>
        </footer>
      </main>
    </div>
  )
}
export default DefaultLayout
