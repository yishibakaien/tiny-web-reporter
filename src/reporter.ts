
import  store from './store'

export default function(url: string): void {
  document.addEventListener('visibilitychange', () => {
    const params = JSON.stringify({ data: store.value })
    if (document.visibilityState === 'hidden') {
      console.log('123', params)
      navigator.sendBeacon(url, params )
      store.clear()
    }
  })
}