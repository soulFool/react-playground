import { useContext } from 'react'
import copy from 'copy-to-clipboard'
import { PlaygroundContext } from '../../PlaygroundContext'
import Sun from '../Icon/Sun'
import Moon from '../Icon/Moon'
import Share from '../Icon/Share'
import Download from '../Icon/Download'
import styles from './index.module.scss'

// vite 内部做了处理，引入 .svg 会返回它的路径。
import logoSvg from './icons/logo.svg'
import { downloadFiles } from '../../utils'

export default function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext)

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="logo" />
        <span>React Playground</span>
      </div>
      <div
        className={styles.links}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {theme === 'light' && (
          <Moon
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => setTheme('dark')}
          />
        )}
        {theme === 'dark' && (
          <Sun
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme('light')}
          />
        )}
        <Share
          style={{ marginLeft: '10px' }}
          onClick={() => {
            copy(window.location.href)
            alert('分享链接已复制')
          }}
        />
        <Download
          style={{ marginLeft: '10px' }}
          onClick={async () => {
            await downloadFiles(files)
            alert('下载完成')
          }}
        />
      </div>
    </div>
  )
}
