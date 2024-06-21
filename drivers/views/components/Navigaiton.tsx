import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io5'
import { twJoin } from 'tailwind-merge'

import {
  GITHUB_USERNAME,
  TWITTER_USERNAME,
} from '@/drivers/views/components/const'

import IconHoverButton from './common/IconHoverButton'

const Navigation = () => {
  return (
    <nav
      aria-label="ナビゲーション"
      className={twJoin([
        'fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-between gap-2 px-4 py-3',
        ' contrast-more:border-black',
        'border-t border-gray-300 bg-white/50 contrast-more:bg-white dark:bg-stone-900/50 dark:contrast-more:border-white dark:contrast-more:bg-black',
        'backdrop-blur-lg contrast-more:backdrop-blur-none',
      ])}
    >
      <div className="flex gap-2">
        <IconHoverButton
          href={`https://twitter.com/${TWITTER_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          aria-label="新しいタブでTwitterを開く"
        >
          <IoLogoTwitter />
        </IconHoverButton>
        <IconHoverButton
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          aria-label="新しいタブでGitHubを開く"
        >
          <IoLogoGithub />
        </IconHoverButton>
      </div>
      <div
        aria-label="キャッチコピー"
        className="flex h-full items-center border-l border-gray-300 pl-4 contrast-more:border-black dark:contrast-more:border-white"
      >
        {`© ${new Date().getFullYear()} Ryo Ando`}
      </div>
    </nav>
  )
}
export default Navigation
