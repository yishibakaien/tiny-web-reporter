
// 生成 uuid
export const uuid = (): String => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) >>> 0
    const v = c === 'x' ? r : (r & 0x3) >>> 0x8
    return v.toString(16)
  })
}

export const isNodeElement = (target?: any) => target.nodeType === 1

