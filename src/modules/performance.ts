
import { dispatch } from '../collector'

const performance = (): PerformanceNavigationTiming => {

  const timing = window.performance.getEntriesByType('navigation')[0].toJSON()

  /**
   * domInteractive, // 页面可交互
   * domComplete, // DOM 加载完成
   * duration, // 页面加载完成
   * loadEventStart, // 文档开始加载
   * loadEventEnd, // 文档加载完毕
   * requestStart, // 第一个请求发起
   * responseStart, // 第一个字节响应
   */
  for (let key in timing) {
    if (typeof timing[key] === 'number') {
      timing[key] = Math.ceil(timing[key])
    }
  }

  return timing
}

// load 后延时收集
const task = () => 
  setTimeout(() => dispatch(performance(), 'performance'), 300)

export default () => {
  window.addEventListener('load', task, false)
}