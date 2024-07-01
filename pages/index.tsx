import { createServerSideHelpers } from '@trpc/react-query/server'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import SuperJSON from 'superjson'

import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput'

import { serverEnv } from '@/drivers/env/ServerEnv'
import { NextPageWithLayout } from '@/drivers/next'
import { appRouter } from '@/drivers/trpc/routers/_app'
import { createContext } from '@/drivers/trpc/trpc'
import Copyright from '@/drivers/views/components/common/Copyright'
import { DESCRIPTION, SITE_NAME } from '@/drivers/views/components/const'
import DefaultLayout from '@/drivers/views/components/layout/DefaultLayout'
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
        <meta name="description" content={DESCRIPTION.replace('\n', '')}></meta>
      </Head>
      <div className="relative right-0 h-[2048px]">
        {/*
          max-width: 100% を無効化することでx座標を固定(でないとSpotifyとずれる)
          また、謎の縮小を防止するため通常のimgタグ
        */}
        <div className="absolute right-[5.5rem] top-[11rem] w-[240px] bg-black p-5 text-stone-100 sm:right-[11.5rem] dark:text-stone-200">
          <CurrentlyPlaying />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="再生中の音楽を表示したiPhoneとプレイリストを表示したノートを膝の上に置いている"
          src="/background.webp"
          width="1536"
          height="2048"
          className="absolute -right-40 top-0 h-[2048px] w-[1536px] !max-w-none object-none sm:-right-16 dark:invert"
        />
        <div className="absolute right-0 top-[70rem] z-20 h-[600px] w-[340px] overflow-y-scroll p-5 sm:right-20">
          <Playlist />
        </div>

        <div className="absolute left-0 top-[112rem] w-full p-4 lg:top-0 lg:p-8">
          <div className="mx-auto flex w-[340px] flex-col gap-8 lg:ml-0">
            <ExternalMarkdownRenderer input={mdInput} />
            <div className="lg:hidden">
              <Copyright />
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-[120rem] hidden max-w-[800px] p-4 lg:block lg:p-8">
          <Copyright />
        </div>
      </div>
    </>
  )
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default Home
