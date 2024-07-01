import { trpc } from '@/drivers/views/hooks/trpc'

import AlbumArt from './AlbumArt'
import MusicInfo from './MusicInfo'
import ProgressBar from './ProgressBar'

const CurrentlyPlaying = () => {
  const query = trpc.spotify.spotifyCurrentlyPlaying.useQuery(undefined, {
    // これはミリ秒単位なので注意しろ
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: true,
  })

  const { data: result, error, refetch } = query
  return (
    <div className="flex flex-col gap-y-3">
      <div className="mx-auto h-full grow-0 overflow-hidden rounded-xl">
        <AlbumArt
          track={result?.track ?? null}
          hasError={error !== null}
          width={200}
        />
      </div>
      <div className="text-sm font-black">{`${
        result?.isPlaying ? 'Playing' : 'Last played'
      } ${result?.track?.is_local ? 'locally' : 'on Spotify'}:`}</div>
      <div className="relative flex w-full grow flex-col items-start gap-4">
        <MusicInfo track={result?.track ?? null} hasError={error !== null} />
        <ProgressBar
          refetch={refetch}
          result={result}
          hasError={error !== null}
        />
      </div>
    </div>
  )
}
export default CurrentlyPlaying
