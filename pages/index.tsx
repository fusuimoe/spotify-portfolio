import { createServerSideHelpers } from '@trpc/react-query/server'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import SuperJSON from 'superjson'

import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput'

import { clientEnv } from '@/drivers/env/ClientEnv'
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
      <div className="fixed left-0 top-0 min-h-screen w-screen">
        <Logo />
      </div>
      {/* Spotifyの幅の都合で、gridがかなり複雑になっている */}
      <div className="grid grid-cols-1 gap-8 gap-y-12 py-[80svh] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <FloatingWindow
          title="WindowsTerminal.exe"
          className="col-span-full row-start-1"
        >
          <pre className="rounded-lg bg-black p-4 font-mono text-white">{`> git log -1 --pretty=format:"%s (%H)"\n${clientEnv.VERCEL_GIT_COMMIT_MESSAGE} (${clientEnv.VERCEL_GIT_COMMIT_SHA})`}</pre>
        </FloatingWindow>
        <FloatingWindow
          title={`Notepad.exe`}
          className="row-start-2 w-full sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1"
          headerClassName="bg-pink-400/50 dark:bg-pink-800/50 contrast-more:bg-pink-400 dark:contrast-more:bg-pink-800"
        >
          <ExternalMarkdownRenderer input={mdInput} />
        </FloatingWindow>
        <FloatingWindow
          title="Spotify.exe"
          className="col-span-1 row-start-3 sm:row-span-1 sm:row-start-3 md:col-span-1 md:row-span-1 md:row-start-3 md:w-full lg:col-start-3 lg:row-start-2 xl:col-span-1 xl:col-start-4 xl:row-span-1 xl:row-start-2"
          headerClassName="bg-green-400/50 dark:bg-green-800/50 contrast-more:bg-green-400 dark:contrast-more:bg-green-800"
          transparent={true}
        >
          <CurrentlyPlaying />
        </FloatingWindow>
        <FloatingWindow
          title={`My best playlist`}
          className="w-full sm:col-span-1 sm:row-span-2 sm:row-start-3 md:col-span-1 md:row-span-3 md:row-start-3 lg:col-span-3 lg:col-start-1 lg:row-span-1 lg:row-start-3 xl:col-span-2 xl:col-start-2 xl:row-start-2"
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
