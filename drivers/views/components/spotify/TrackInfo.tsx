import { twJoin } from 'tailwind-merge'

import { SpotifyTrack } from '@/domains/entity/spotify/common'

import AlbumArt from './AlbumArt'
import ArtistList from './ArtistList'

const TrackInfo = ({ track }: { track: SpotifyTrack }) => {
  /** APIv1現在、ローカルファイルはライブラリに出ないので「検索する」はまず出ないはず */
  const action = track.spotifyUrl ? 'Spotifyで聴く' : '検索する'
  const spotifyUrlOrSearch =
    track.spotifyUrl ?? `https://www.google.com/search?q=${track?.name}`
  return (
    <div className="flex w-full flex-row-reverse items-stretch justify-between overflow-hidden rounded-xl shadow-xl">
      {/*
        画像より曲のテキストを先に書かないと、読み上げの順番が不親切 https://accessible-usable.net/2022/11/entry_221129.html
      */}
      <div
        className={twJoin(
          'flex grow flex-col justify-between gap-3',
          'bg-white/80 p-3 contrast-more:bg-white dark:bg-black/80 dark:contrast-more:bg-black'
        )}
      >
        <div>
          <a
            href={spotifyUrlOrSearch}
            target="_blank"
            className="mb-2 block text-xl font-bold underline"
            rel="noreferrer"
            aria-label={`${track.name}を${action}`}
            title={`${track.name}を${action}`}
          >
            {track.name}
          </a>
          <ArtistList artists={track.artists} />
        </div>
      </div>
      <div className="flex items-center bg-black">
        <AlbumArt width={100} track={track} hasError={false} />
      </div>
    </div>
  )
}

export default TrackInfo
