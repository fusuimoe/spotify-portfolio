import { getSpotifyLibraryInput } from '@/application/interfaces/inputs/GetSpotifyLibraryInput'
import { getSpotifyPlaylistInput } from '@/application/interfaces/inputs/GetSpotifyPlaylistInput'
import { SpotifyUseCase } from '@/application/usecases/SpotifyUsecase'

import { SpotifyRepository } from '@/adaptors/repositories/spotify/SpotifyRepository'

import { SpotifyApiV1 } from '@/drivers/api/spotify/SpotfyAPIv1'
import { RedisConnection } from '@/drivers/databases/RedisConnection'
import { EncrypterAES256CBC } from '@/drivers/encrypters/EncrypterAES256CBC'
import { procedure, router } from '@/drivers/trpc/trpc'

const encrypter = new EncrypterAES256CBC()
const connection = new RedisConnection(encrypter)
const api = new SpotifyApiV1(connection)
const repository = new SpotifyRepository(api)
const useCase = new SpotifyUseCase(repository)

export const spotifyRouter = router({
  spotifyCurrentlyPlaying: procedure.query(async () => {
    return await useCase.getCurrentlyPlaying()
  }),
  spotifyLibrary: procedure
    .input(getSpotifyLibraryInput)
    .query(async ({ input }) => {
      return await useCase.getLibrary(input)
    }),
  spotifyPlaylist: procedure
    .input(getSpotifyPlaylistInput)
    .query(async ({ input }) => {
      return await useCase.getPlaylist(input)
    }),
})
