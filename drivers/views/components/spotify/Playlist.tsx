import { trpc } from '@/drivers/views/hooks/trpc'

import TrackInfo from './TrackInfo'

/**
 * FIXME: Bad Gatewayになる
 */
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
      <p>Playlist name: {spotifyPlaylist?.name}</p>
    </div>
  )
}

export default Playlist
