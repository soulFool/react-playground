import { useState } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import type { FC } from 'react'

export interface FileNameItemProps {
  value: string
  actived: boolean
  onClick: () => void
}

export const FileNameItem: FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick } = props

  const [name, setName] = useState(value)

  return (
    <div
      className={classNames(
        styles['tab-item'],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  )
}
