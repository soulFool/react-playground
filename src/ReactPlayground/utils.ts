import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
import { Files } from './PlaygroundContext'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// 根据不同的后缀名返回 language
export const fileName2Language = (name: string) => {
  // name: App.tsx -> suffix: 'tsx'
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}

// atob、btoa 是二进制的 ASC 码和 base64 的字符串的转换
export function compress(data: string): string {
  // 把字符串转为字节数组
  const buffer = strToU8(data)
  // 压缩
  const zipped = zlibSync(buffer, { level: 9 })
  // 转为字符串
  const binary = strFromU8(zipped, true)
  // 把 base64 编码的字符串转为 asc 码
  return btoa(binary)
}

export function uncompress(base64: string): string {
  // 把 asc 码转为 base64 编码的字符串
  const binary = atob(base64)

  // 把字符串转为字节数组
  const buffer = strToU8(binary, true)
  // 解压
  const unzipped = unzlibSync(buffer)
  // 转为字符串
  return strFromU8(unzipped)
}

export async function downloadFiles(files: Files) {
  const zip = new JSZip()

  Object.keys(files).forEach((name) => {
    zip.file(name, files[name].value)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`)
}
