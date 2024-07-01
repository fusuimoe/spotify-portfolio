import { SpotifyTrack } from '@/domains/entity/spotify/common'

import ArtistList from './ArtistList'
interface MusicInfoProps {
  track: SpotifyTrack | null
  hasError: boolean
}

const MusicInfo = ({ track, hasError }: MusicInfoProps) => {
  const albumUrlOrSearch =
    track?.album.spotifyUrl ??
    `https://www.google.com/search?q=${track?.album.name}`
  const spotifyUrl = track?.spotifyUrl
  const spotifyUrlOrSearch =
    spotifyUrl ?? `https://www.google.com/search?q=${track?.name}`
  return (
    <div className="flex flex-col items-start gap-y-1">
      {/* items-startで寄せないと、リンクのエリアが無駄に右に広がる gapがないとタップエリアで怒られる */}
      <a
        aria-label="曲名"
        href={spotifyUrlOrSearch}
        target="_blank"
        rel="noreferrer"
        className="text-lg font-bold text-white"
      >
        {/* inline-blockにしないと、文字がない場所もリンクになってしまう */}
        {track ? track.name : hasError ? '(曲名取得失敗)' : '(Loading...)'}
      </a>
      {/* スペースの都合上、やむを得ず無効化 */}
      {/* <a
        aria-label="アルバム名"
        href={albumUrlOrSearch}
        target="_blank"
        rel="noreferrer"
      >
        <div className="pr-8 text-yellow-100 dark:text-yellow-200">
          {track
            ? track.album.name
            : hasError
            ? '(アルバム取得失敗)'
            : '(Loading...)'}
        </div>
      </a> */}
      <div className="text-blue-100 dark:text-blue-200">
        {track ? (
          <ArtistList artists={track.artists} />
        ) : hasError ? (
          ''
        ) : (
          '(Loading...)'
        )}
      </div>
    </div>
  )
}
export default MusicInfo
