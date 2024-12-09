import { transform } from '@babel/standalone'
import { Files } from '../../PlaygroundContext'
import { ENTRY_FILE_NAME } from '../../files'
import type { PluginObj } from '@babel/core'
import type { EditorFile as File } from '../CodeEditor/Editor'

export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code
  const regexReact = /import\s+React/g
  if (
    (filename.endsWith('.jsx') || filename.endsWith('.tsx')) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react'; \n${code}`
  }
  return _code
}

export const babelTransform = (
  filename: string,
  code: string,
  files: Files
) => {
  // App.tsx 的 jsx 内容编译后变成了 React.createElement，但是我们并没有引入 React，这样运行会报错，所以需要在 babel 编译之前，判断下文件内容有没有 import React，没有就加上
  let _code = beforeTransformCode(filename, code)
  let result = ''
  try {
    // 编译
    result = transform(_code, {
      // 对 jsx 和 ts 语法做处理
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      // 编译后保持原有行列号不变
      retainLines: true,
    }).code!
  } catch (e) {
    console.error('编译出错', e)
  }
  return result
}

// 处理模块路径
const getModuleFile = (files: Files, modulePath: string) => {
  // 例：./App.css、./App
  let moduleName = modulePath.split('./').pop() || ''
  if (!moduleName.includes('.')) {
    // ./App 进入
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith('.ts') ||
          key.endsWith('.tsx') ||
          key.endsWith('.js') ||
          key.endsWith('.jsx')
        )
      })
      .find((key) => {
        return key.split('.').includes(moduleName)
      })
    if (realModuleName) {
      moduleName = realModuleName
    }
  }
  // ./App.css 直接返回
  return files[moduleName]
}

const json2Js = (file: File) => {
  // export 这个 json
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

const css2Js = (file: File) => {
  // 通过 js 代码把它添加到 head 里的 style 标签
  const randomId = new Date().getTime()
  // createTextNode 使用 `` 是因为 file.value 内部有换行
  const js = `
    (() => {
      const stylesheet = document.createElement('style') 
      stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
      document.head.appendChild(stylesheet)

      const styles = document.createTextNode(\`${file.value}\`)
      stylesheet.innerHTML = ''
      stylesheet.appendChild(styles)
    })()
  `
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        // 获取到 import 语句中 from 后面的路径或者保命
        const modulePath = path.node.source.value
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath)
          if (!file) {
            return
          }

          // 对 css、json、tsx、ts 等后缀名的 import 做替换
          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file)
          } else {
            // 将 file.value 也就是文件内容转换成对应的 blob url。ts 文件的处理就是用 babel 编译下，然后用 URL.createObjectURL 把编译后的文件内容作为 url。
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: 'application/javascript',
              })
            )
          }
        }
      },
    },
  }
}

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}

// 在 worker 线程向主线程 postMessage
self.addEventListener('message', async ({ data }) => {
  try {
    self.postMessage({
      type: 'COMPILED_CODE',
      data: compile(data),
    })
  } catch (e) {
    self.postMessage({ type: 'ERROR', error: e })
  }
})
