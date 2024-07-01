const Copyright = () => {
  return (
    <div className="text-sm">
      {`当サイトに掲載しているアルバムアートワークはSpotify APIで取得したURLを使って表示しており、公式やDiscordの埋め込み機能と同様にSpotifyサーバーの画像をそのまま埋め込んでいるため、権利上の問題はないと判断し運用しています。楽曲の権利は提供元に帰属します。`}
      {`当サイトはいかなる広告・解析サービスも使用しておらず、管理画面以外でCookieは使用しておりません。`}
      {`© ${new Date().getFullYear()} Ryo Ando`}
    </div>
  )
}

export default Copyright
