import styles from './index.module.scss'

// vite 内部做了处理，引入 .svg 会返回它的路径。
import logoSvg from './icons/logo.svg'

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSvg} alt="logo" />
        <span>React Playground</span>
      </div>
    </div>
  )
}
