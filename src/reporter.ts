
const sendBeacon = navigator.sendBeacon

const reporter = sendBeacon
? (url: string, data: any) => sendBeacon(url, JSON.stringify(data || {}))
: (url: string, data: any) => {
    const beacon = new Image()
    beacon.src = `${url}?v=${encodeURIComponent(JSON.stringify(data))}`
  }

export default reporter