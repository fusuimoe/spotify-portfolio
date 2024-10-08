import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput'

import { trpc } from '@/drivers/views/hooks/trpc'

/**
 * Markdownを外部から取得して描画
 */
const ExternalMarkdownRenderer = ({
  input,
}: {
  /**
   * あらかじめページ側でインプットを定義することで
   * getStaticProps等でプリフェッチに使える
   */
  input: GetMarkdownContentInput
}) => {
  const { data, error } = trpc.markdown.getMarkdownHTML.useQuery(input, {
    refetchInterval: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  if (error) return <div>{error.message}</div>
  if (data)
    return (
      <div
        /**
         * - w-full: コンテナのpaddingを無視させないために必要
         */
        className="no-scrollbar readable-text prose w-full max-w-full overflow-x-scroll dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    )
  return null
}

export default ExternalMarkdownRenderer
