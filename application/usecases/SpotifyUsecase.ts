import { SpotifyCurrentlyPlaying } from '@/domains/entity/spotify/CurrentlyPlaying'
import { SpotifyLibrary } from '@/domains/entity/spotify/Library'
import { SpotifyPlaylist } from '@/domains/entity/spotify/Playlist'

import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput'
import { GetSpotifyPlaylistInput } from '@/application/interfaces/inputs/GetSpotifyPlaylistInput'
import { ISpotifyRepository } from '@/application/interfaces/ISpotifyRepository'

/**
 * Spotify関連のメソッド tRPCで最終的に使う
 */
export class SpotifyUseCase {
  private repository: ISpotifyRepository

  constructor(repository: ISpotifyRepository) {
    this.repository = repository
  }

  public async getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlaying | null> {
    return await this.repository.getCurrentlyPlaying()
  }

  public async getLibrary(
    input: GetSpotifyLibraryInput
  ): Promise<SpotifyLibrary | null> {
    return await this.repository.getLibrary(input)
  }

  public async getPlaylist(
    input: GetSpotifyPlaylistInput
  ): Promise<SpotifyPlaylist | null> {
    return await this.repository.getPlaylist(input)
  }
}
