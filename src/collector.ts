
import store from './store'
import { ExtraMsg, Msg } from './interface/Typings'

export const saveData = (data: Msg): Msg[] | undefined => {

  store.push(data)

  const value = store.value

  // 是否需要发送数据
  if (value.length >= 10) {
    return value
  }
}