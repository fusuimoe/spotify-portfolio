import { z } from 'zod'

/**
 * SpotifyのプレイリストAPIのパラメータ
 */
export const getSpotifyPlaylistInput = z.object({})

export type GetSpotifyPlaylistInput = z.infer<typeof getSpotifyPlaylistInput>
