import { trpc } from '@/drivers/views/hooks/trpc'

import TrackInfo from './TrackInfo'

const Playlist = () => {
  const { data: spotifyPlaylist } = trpc.spotify.spotifyPlaylist.useQuery({})
  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid gap-4">
        {spotifyPlaylist?.tracks?.map((track) => (
          <TrackInfo key={track.id} track={track} />
        ))}
        {!spotifyPlaylist?.tracks && <div>Error</div>}
      </div>
    </div>
  )
}

export default Playlist
