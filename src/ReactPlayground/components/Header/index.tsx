import { useContext } from 'react'
import { PlaygroundContext } from '../../PlaygroundContext'
import Sun from '../Icon/Sun'
import Moon from '../Icon/Moon'
import styles from './index.module.scss'

// vite 内部做了处理，引入 .svg 会返回它的路径。
import logoSvg from './icons/logo.svg'

export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext)

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="logo" />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
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
      </div>
    </div>
  )
}
