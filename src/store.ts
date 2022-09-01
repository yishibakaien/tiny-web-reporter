
class Store<T = any> {
  value: any[] = []

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

export default new Store()