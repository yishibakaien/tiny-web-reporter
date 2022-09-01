
export default class Store<T = any> {
  value: any[]
  constructor(initValue: T) {
    this.push(initValue)
  }

  push(data: T): void {
    this.value.push(data)
  }

  get() {
    return this.value
  }

  clear(): void {
    this.value = []
  }
}