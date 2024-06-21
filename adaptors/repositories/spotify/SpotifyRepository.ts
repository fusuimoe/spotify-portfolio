import { GetSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput'
import { GetSpotifyPlaylistInput } from '@/application/interfaces/inputs/GetSpotifyPlaylistInput'
import { ISpotifyAPI } from '@/application/interfaces/ISpotifyAPI'
import { ISpotifyRepository } from '@/application/interfaces/ISpotifyRepository'

/**
 * Spotifyリポジトリ APIを注入して使う
 */
export class SpotifyRepository implements ISpotifyRepository {
  private api: ISpotifyAPI

  constructor(api: ISpotifyAPI) {
    this.api = api
  }

  public getCurrentlyPlaying = async () => {
    return await this.api.getCurrentlyPlaying()
  }

  public getLibrary = async (input: GetSpotifyLibraryInput) => {
    return await this.api.getLibrary(input)
  }

  public getPlaylist = async (input: GetSpotifyPlaylistInput) => {
    return await this.api.getPlaylist(input)
  }
}
