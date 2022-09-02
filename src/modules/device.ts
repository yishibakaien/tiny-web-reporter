import { dispatch } from '../collector'

function device(): any {
  const { screen } = window
  const { clientWidth, clientHeight } = document.documentElement
  const { width, height, colorDepth, pixelDepth } = screen

  const map = {
    clientHeight, // 网页可见区高度
    clientWidth, // 网页可见区宽度
    colorDepth, // 显示屏幕调色板的比特深度
    pixelDepth, // 显示屏幕的颜色分辨率
    screenWidth: width, // 显示屏幕的宽度
    screenHeight: height, // 显示屏幕的高度
    
    language: navigator.language,
    userAgent: navigator.userAgent,
    vendor: navigator.vendor, // 浏览器名称
    platform: navigator.platform, // 浏览器平台的环境,不是电脑系统的x64这样的(浏览器平台的环境可能是x32)
  }

  // 这里简单判断是否是对象即可
  // if (typeof connection === 'object') {
  //   map.downlink = connection.downlink
  //   map.effectiveType = connection.effectiveType
  //   map.rtt = connection.rtt
  // }

  return map
}

export default () => {
  dispatch(device(), 'device')
}
