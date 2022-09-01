import Options from './interface/Options'

import performance from './modules/performance'
import store from './store'

export default function(options?: Options) {
  console.log(store)
  
  performance()
}
