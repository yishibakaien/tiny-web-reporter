import { Options } from './interface/Typings'

import performance from './modules/performance'
import reporter from './reporter'

export default function(options?: Options) {
  const {
    key,
    url,
    isPerformance
  } = options

  if (!key) {
    throw new Error('params error: `key` is required')
  }

  if (!url) {
    throw new Error('params error: `url` is required')
  }

  reporter(url)

  if (isPerformance) {
    performance()
  }
}
