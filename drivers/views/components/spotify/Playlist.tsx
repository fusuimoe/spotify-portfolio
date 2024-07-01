import { trpc } from '@/drivers/views/hooks/trpc'

import TrackInfo from './TrackInfo'

const Playlist = () => {
  const { data: spotifyPlaylist } = trpc.spotify.spotifyPlaylist.useQuery({})
  return (
    <div className="flex w-full flex-col gap-y-4">
      {spotifyPlaylist?.tracks?.map((track) => (
        <TrackInfo key={track.id} track={track} />
      ))}
      {!spotifyPlaylist?.tracks && <div>Error</div>}
    </div>
  )
}

export default Playlist
