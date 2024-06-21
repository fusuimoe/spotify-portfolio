import { markdownRouter } from './markdown'
import { spotifyRouter } from './spotify'
import { router } from '../trpc'

export const appRouter = router({
  markdown: markdownRouter,
  spotify: spotifyRouter,
})

export type AppRouter = typeof appRouter
