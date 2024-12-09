import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../PlaygroundContext'
import { FileNameItem } from './FileNameItem'
import styles from './index.module.scss'
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from '../../../files'

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    setSelectedFileName,
    addFile,
    removeFile,
    updateFileName,
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    // 根据 files 的 key 设置 tabs
    setTabs(Object.keys(files))
  }, [files])

  const handleEditComplete = (name: string, prevName: string) => {
    // 修改文件名
    updateFileName(prevName, name)
    // 切换为新的文件名
    setSelectedFileName(name)

    setCreating(false)
  }

  // 创建状态
  const [creating, setCreating] = useState(false)

  const addTab = () => {
    addFile('Comp' + Math.random().toString().slice(2, 6) + '.tsx')
    setCreating(true)
  }

  const handleRemove = (name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ]

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          readonly={readonlyFileNames.includes(item)}
          creating={creating && index === arr.length - 1}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          onRemove={() => handleRemove(item)}
        ></FileNameItem>
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  )
}
