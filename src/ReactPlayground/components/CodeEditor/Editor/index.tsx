import MonacoEditor from '@monaco-editor/react'
import { createATA } from './ata'
import type { EditorProps, OnMount } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'

export interface EditorFile {
  name: string
  value: string
  language: string
}

interface Props {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
  const { file, onChange, options } = props

  // 修改编辑器的 tsconfig，onMount 也就是编辑器加载完的回调里，设置 ts 的默认 compilerOptions
  const handleEditorMount: OnMount = (editor, monaco) => {
    // 添加快捷键的交互（Ctrl + J 进行格式化）
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run()

      // monaco editor 的其他 action
      let actions = editor.getSupportedActions().map((a) => a.id)
      console.log(actions)
    })

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // 设置 jsx 为 preserve，也就是输入 <div> 输出 <div>，保留原样；如果设置为 react 会输出 React.createElement("div")
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      // 设置 esModuleInterop 会在编译的时候自动加上 default 属性，commonJS 的包是没有 default 属性的
      esModuleInterop: true,
    })

    // 获取类型之后用 addExtraLib 添加到 ts 里
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      )
    })

    // 内容改变之后获取一次类型
    editor.onDidChangeModelContent(() => {
      // editor.getValue() 获取的是编辑器中的内容
      ata(editor.getValue())
    })

    // 最开始获取一次类型
    ata(editor.getValue())
  }

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      options={{
        fontSize: 14,
        // 到了最后一行之后依然可以滚动一屏
        scrollBeyondLastLine: false,
        // 缩略图
        minimap: {
          enabled: false,
        },
        // 设置横向纵向滚动条宽度
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  )
}
