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
