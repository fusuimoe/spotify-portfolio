import { SpotifyCurrentlyPlaying } from '@/domains/entity/spotify/CurrentlyPlaying'
import { SpotifyLibrary } from '@/domains/entity/spotify/Library'
import { SpotifyPlaylist } from '@/domains/entity/spotify/Playlist'

import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput'
import { GetSpotifyPlaylistInput } from '@/application/interfaces/inputs/GetSpotifyPlaylistInput'

export interface ISpotifyRepository {
  /**
   * 現在の曲を取得
   */
  getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlaying | null>

  /**
   * ライブラリを取得
   */
  getLibrary(input: GetSpotifyLibraryInput): Promise<SpotifyLibrary | null>

  /**
   * プレイリストを取得
   */
  getPlaylist(input: GetSpotifyPlaylistInput): Promise<SpotifyPlaylist | null>
}
