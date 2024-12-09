import { useContext } from 'react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from './components/Header'
import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview'
import { PlaygroundContext } from './PlaygroundContext'
import './index.scss'

export default function ReactPlayground() {
  const { theme, setTheme } = useContext(PlaygroundContext)

  return (
    <div className={theme} style={{ height: '100vh' }}>
      <Header />
      {/* defaultSizes 指定 100、100 也就是按照 1:1 的比例展示 */}
      <div style={{ height: 'calc(100% - 50px)' }}>
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={0}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}
