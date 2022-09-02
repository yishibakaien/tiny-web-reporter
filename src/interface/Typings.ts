export interface BaseMsg {
  // 项目key
  key: string

  // 当前页面路径
  o: string

  ua: string

  // 浏览器语言
  ul: string

  // 网络类型
  ct: string

  // 浏览器宽高
  vp: string

  // 屏幕宽高
  sr: string

  // 表示当条记录的唯一值
  logId: string

  // 时间
  gmt: string

  // devicePixelRatio
  dpr: number

  // referer
  rf: string
}

export interface Performance {
  type: 'performance'
  fp: number // 首屏渲染时间 domLoading - navigationStart
  dlc: number // DOM加载完成 domContentLoadedEventEnd - navigationStart
  l: number // 图片、样式等外链资源加载完成 loadEventEnd - navigationStart
  dns: number // dns查询时间
  tcp: number // tcp连接耗时
  ttfb: number // 读取页面第一个字节的时间
  bt: number // 白屏时间
  dt: number // 解析dom树耗时
  drt: number // dom完成时间
  rt: number // request请求耗时
  lt: number // 页面完成时间
  nv: number //当前页面如何导航到此处
}

export interface ErrorMsg {
  type: 'error';
  // 错误种类
  st: string;
  // 错误文件
  file: string;
  // 错误栈
  // stack: string;
  // 错误信息
  msg: string;
}

//配置接口请求
export interface XMLType {
  type: 'interface';
  //接口请求地址
  url: string;
  //接口耗时
  tc: number;
  //状态码
  cd: number;
  //发送请求时间
  rq: string;
  //接受响应时间
  rp: string;
}

// 路由类型统计
export interface PvType {
  type: 'pv';
  //路由地址
  pathname: string;
  //上一个跳转地址
  from: string;
  //网页标题
  title: string;
  //持续时间
  stay: number;
}

export type ExtraMsg =
  | XMLType
  | Performance
  | ErrorMsg
  | PvType
  | {
      type: string;
      [propKey: string]: any;
    }

export type Merge<T, U, X = Pick<U, Exclude<keyof U, keyof T & keyof U>>> = Pick<
  T & X,
  keyof T | keyof X
>

export type Msg = BaseMsg | ExtraMsg | Performance
  
export interface Options {
  /* 上报项目key值 */
  key: string

  /* 上报地址 */
  url: string
  

  isDevice?: boolean // 是否显示设备信息

  /* 需要收集的字段key值 */
  gatherKeys?: (keyof BaseMsg)[]
  /* 上报频率默认10条 */
  frequency?: number
  /* 是否不上报数量不足的记录 */
  isDiscard?: boolean
  /* 是否监听路由信息 */
  isRoutes?: boolean
  /* 是否监听浏览器性能信息 */
  isPerformance?: boolean
  /* 是否监听promise错误 */
  isPromiseError?: boolean
  /* 是否监听页面资源错误 */
  isResourceError?: boolean
  /* 是否监听接口请求信息 */
  isRequest?: boolean
  /* 脚本初始化之前运行 */
  beforeInit?: () => void
  /* 返回的值会被合并到每一条上报数据中, 可以用于从接口中读取用户信息 */
  mergeMsg?: () => Record<string, any> | Promise<Record<string, any>>
  /* 上报数据之前，可以在此对数据进行加工 */
  beforeSendMsg?: (data: ExtraMsg & BaseMsg) => ExtraMsg & BaseMsg
  /* 是否需要打印日志 */
  isLog?: boolean
  /* 上报请求头, 页面卸载上报的时候无法设置请求头，可能会导致部分数据丢失 */
  headers?: Record<string, any>
}

export type RecordType = 'performance' | 'device' | 'request' | 'error'