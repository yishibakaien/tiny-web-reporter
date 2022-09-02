
import  store from './store'

export default function(url: string): void {
  document.addEventListener('visibilitychange', () => {

    if (document.visibilityState === 'hidden') {
      if (!store.value.length) return
      const params = JSON.stringify(store.value)
      console.log('1234', params)
      navigator.sendBeacon(url, params)
      store.clear()
    }
  })
}