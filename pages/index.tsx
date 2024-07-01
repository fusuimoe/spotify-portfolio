import { createServerSideHelpers } from '@trpc/react-query/server'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import SuperJSON from 'superjson'

import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput'

import { serverEnv } from '@/drivers/env/ServerEnv'
import { NextPageWithLayout } from '@/drivers/next'
import { appRouter } from '@/drivers/trpc/routers/_app'
import { createContext } from '@/drivers/trpc/trpc'
import FloatingWindow from '@/drivers/views/components/common/FloatingWindow'
import { DESCRIPTION, SITE_NAME } from '@/drivers/views/components/const'
import DefaultLayout from '@/drivers/views/components/layout/DefaultLayout'
import Logo from '@/drivers/views/components/Logo'
import ExternalMarkdownRenderer from '@/drivers/views/components/markdown/ExternalMarkdownRenderer'
import CurrentlyPlaying from '@/drivers/views/components/spotify/CurrentlyPlaying'
import Library from '@/drivers/views/components/spotify/Library'
import Playlist from '@/drivers/views/components/spotify/Playlist'

/**
 * ファーストビューにでかでかと出す文章
 */
const mdInput: GetMarkdownContentInput = {
  source: 'github',
  owner: 'fusuimoe',
  repo: 'fusuimoe',
  branch: 'main',
}

export const getStaticProps = async () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
  })
  await ssg.markdown.getMarkdownHTML.prefetch(mdInput)
  await ssg.spotify.spotifyPlaylist.prefetch({})

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: serverEnv.REVALIDATE_SECONDS,
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPageWithLayout<Props> = () => {
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content={DESCRIPTION}></meta>
      </Head>
      {/* Spotifyの幅の都合で、gridがかなり複雑になっている */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <FloatingWindow title={`Notepad.exe`} className="col-span-full w-full">
          <ExternalMarkdownRenderer input={mdInput} />
        </FloatingWindow>
        <FloatingWindow
          title="WindowsTerminal.exe"
          className="col-span-full row-start-2"
        >
          <pre className="rounded-lg bg-black p-4 font-mono text-white">{`cd ~/repositories/fusuimoe/spotify-portfolio && pnpm start`}</pre>
        </FloatingWindow>
        <FloatingWindow
          title={`CSS Experiment.exe`}
          className="row-start-3 w-full sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"
          headerClassName="bg-pink-400/50 dark:bg-pink-800/50 contrast-more:bg-pink-400 dark:contrast-more:bg-pink-800"
        >
          <Logo />
        </FloatingWindow>
        <FloatingWindow
          title="Spotify.exe"
          className="col-span-1 row-start-4 sm:row-span-1 sm:row-start-4 md:col-span-1 md:row-span-1 md:row-start-4 md:w-full lg:col-start-3 lg:row-start-3 xl:col-span-1 xl:col-start-4 xl:row-span-1 xl:row-start-3"
          headerClassName="bg-green-400/50 dark:bg-green-800/50 contrast-more:bg-green-400 dark:contrast-more:bg-green-800"
          transparent={true}
        >
          <CurrentlyPlaying />
        </FloatingWindow>
        <FloatingWindow
          title={`My best playlist`}
          className="w-full sm:col-span-1 sm:row-span-2 sm:row-start-4 md:col-span-1 md:row-span-3 md:row-start-4 lg:col-span-3 lg:col-start-1 lg:row-span-1 lg:row-start-4 xl:col-span-2 xl:col-start-2 xl:row-start-3"
          headerClassName="bg-blue-400/50 dark:bg-blue-800/50 contrast-more:bg-blue-400 dark:contrast-more:dark:bg-blue-800"
        >
          <Playlist />
        </FloatingWindow>
      </div>
    </>
  )
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default Home
