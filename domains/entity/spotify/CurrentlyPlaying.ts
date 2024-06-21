import { SpotifyTrack } from './common'

/**
 * コンポーネントで使う再生中の曲情報
 */
export interface SpotifyCurrentlyPlaying {
  isPlaying: boolean
  progressMilliSeconds: number | null
  track: SpotifyTrack | null
}
