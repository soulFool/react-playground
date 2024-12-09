import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import type { FC } from 'react'

export interface FileNameItemProps {
  value: string
  actived: boolean
  readonly: boolean
  creating: boolean
  onClick: () => void
  onRemove: () => void
  onEditComplete: (name: string) => void
}

export const FileNameItem: FC<FileNameItemProps> = (props) => {
  const {
    value,
    actived = false,
    readonly,
    creating,
    onClick,
    onRemove,
    onEditComplete,
  } = props

  const [name, setName] = useState(value)
  // 记录编辑状态
  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus()
    }
  }, [creating])

  const handleInputBlur = () => {
    setEditing(false)
    onEditComplete(name)
  }

  return (
    <div
      className={classNames(
        styles['tab-item'],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles['tabs-item-input']}
          value={name}
          onBlur={handleInputBlur}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <span
              style={{ marginLeft: 5, display: 'flex' }}
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          ) : null}
        </>
      )}
    </div>
  )
}
