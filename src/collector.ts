
import store from './store'
import { addExtraInfo } from './utils'
import { Msg, RecordType } from './interface/Typings'

export const dispatch = (data: Msg, type: RecordType): Msg[] | undefined => {

  addExtraInfo(data, type)

  store.push(data)

  const value = store.value

  // 是否需要发送数据
  if (value.length >= 10) {
    return value
  }
}