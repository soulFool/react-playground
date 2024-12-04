import Editor from './Editor'
import FileNameList from './FileNameList'

export default function CodeEditor() {
  const file = {
    name: 'sun.tsx',
    value: `import lodash from "lodash";\n\nconst a = <div>sun</div>`,
    language: 'typescript',
  }

  function onEditorChange() {
    console.log(...arguments)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  )
}
