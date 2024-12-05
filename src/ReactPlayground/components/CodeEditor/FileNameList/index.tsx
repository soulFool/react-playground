import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../PlaygroundContext'
import { FileNameItem } from './FileNameItem'
import styled from './index.module.scss'

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

  return (
    <div className={styled.tabs}>
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
        ></FileNameItem>
      ))}
    </div>
  )
}
