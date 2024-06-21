import { ComponentPropsWithoutRef } from 'react'

import { SpotifyTrack } from '@/domains/entity/spotify/common'

interface AlbumArtProps {
  loading?: ComponentPropsWithoutRef<'img'>['loading']
  track: SpotifyTrack | null
  hasError: boolean
  width: number
}

const AlbumArt = ({
  loading = 'lazy',
  track,
  hasError,
  width,
}: AlbumArtProps) => {
  /**
   * この画像サイズは300x300
   */
  const albumImage = track?.album.image
  return (
    <div
      className="relative h-full overflow-hidden"
      style={{ width: `${width}px`, minHeight: `${width}px` }}
    >
      {/* ライブラリのアートワークは幅を可変にしないと、スマホではみでる */}
      {track ? (
        <>
          {albumImage?.url ? (
            <>
              {/* 公式やDiscordの埋め込みと同様、SpotifyのCDNから直接表示 再キャッシュはしない */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={width}
                height={width}
                src={albumImage?.url}
                alt={track?.album.name ?? ''}
                loading={loading}
                className="absolute h-full blur-md"
              />
              {/* ↑ぼけた後ろの画像 アーティストが多い場合やモバイルではどうしても表示される */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={width}
                height={width}
                src={albumImage?.url}
                alt={track?.album.name ?? ''}
                loading={loading}
                className="absolute inset-0 z-10 m-auto w-full"
              />
            </>
          ) : (
            <div className="grid h-full place-items-center text-center text-black">
              Spotify外で買ったので
              <br />
              ジャケット取得不可
            </div>
          )}
        </>
      ) : hasError ? (
        <div className="flex h-full w-full bg-red-800 text-center text-white shadow-xl">
          <div className="m-auto p-4">取得失敗</div>
        </div>
      ) : (
        <div className="flex h-full w-full text-center text-black shadow-xl">
          <div className="m-auto p-4">Loading...</div>
        </div>
      )}
    </div>
  )
}
export default AlbumArt
