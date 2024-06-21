import { SpotifyCurrentlyPlaying } from '@/domains/entity/spotify/CurrentlyPlaying'
import { SpotifyLibrary } from '@/domains/entity/spotify/Library'
import { SpotifyPlaylist } from '@/domains/entity/spotify/Playlist'
import { SpotifyTokens } from '@/domains/entity/spotify/Tokens'

import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput'
import { GetSpotifyPlaylistInput } from '@/application/interfaces/inputs/GetSpotifyPlaylistInput'
import { UpdateSpotifyTokenInput } from '@/application/interfaces/inputs/UpdateSpotifyTokenInput'
import { SpotifyTokenResponseJSON } from '@/application/interfaces/json/spotify/Token'

/**
 * SpotifyAPIの仕様変更に対応できるようインターフェースを定義
 * **注意: 返り値の型はAPIバージョンに依存してはいけない**
 */
export interface ISpotifyAPI {
  refreshAccessToken(refreshToken?: string): Promise<SpotifyTokenResponseJSON>
  getTokens(): Promise<SpotifyTokens | null>
  updateTokens(input: UpdateSpotifyTokenInput): Promise<SpotifyTokens | null>

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
