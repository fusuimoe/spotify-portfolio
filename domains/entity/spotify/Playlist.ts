import { SpotifyTrack } from './common'

/**
 * コンポーネントで使うプレイリスト情報
 */
export interface SpotifyPlaylist {
  name: string
  tracks?: SpotifyTrack[]
}
