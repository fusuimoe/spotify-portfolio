import { createServerSideHelpers } from '@trpc/react-query/server'
import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import SuperJSON from 'superjson'

import { NextPageWithLayout } from '@/drivers/next'
import { appRouter } from '@/drivers/trpc/routers/_app'
import { createContext } from '@/drivers/trpc/trpc'
import UserInfoSmall from '@/drivers/views/components/auth/UserInfoSmall'
import { SITE_NAME } from '@/drivers/views/components/const'
import RevalidateForm from '@/drivers/views/components/form/RevalidateForm'
import DashboardLayout from '@/drivers/views/components/layout/DashboardLayout'

export const getServerSideProps = async () => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
  })
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>
const DashboardPage: NextPageWithLayout<Props> = () => {
  return (
    <div>
      <Head>
        {/*
          テンプレートリテラルを使わないと複数の子要素になって警告される
          @see https://github.com/vercel/next.js/discussions/38256
        */}
        <title>{`${SITE_NAME} dashboard`}</title>
      </Head>
      <UserInfoSmall />
      <RevalidateForm />
    </div>
  )
}

DashboardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default DashboardPage
