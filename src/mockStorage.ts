export function mockStorage(map?: Map<string, string>): Storage {
  return new Proxy(new MockStorage(map), { get, set }) as MockedStorage
}

type MockedStorage =
  MockStorage &
  { [index: number]: string } &
  { [key: string]: string }

class MockStorage {
  public map: Map<string, string>
  public length: number

  constructor(map?: Map<string, string>) {
    this.map = map || new Map<string, string>()
    this.updateLength()
  }

  public clear(): void {
    this.map.clear()
    this.updateLength()
  }

  public setItem(key: string, value: string) {
    this.map.set(key, value)
    this.updateLength()
  }

  public getItem(key: string): string | null {
    return this.map.get(key) || null
  }

  public key(index: number): string | null {
    const values = Array.from(this.map.values())

    return values[index] || null
  }

  public removeItem(key: string) {
    this.map.delete(key)
    this.updateLength()
  }

  private updateLength() {
    this.length = this.map.size
  }
}

function get(target: MockStorage, property: string) {
  if ((target as any)[property])
    return (target as any)[property]

  const int = parseInt(property.toString(), 10)

  if (!Number.isNaN(int))
    return target.key(int)

  return target.getItem(property)
}

function set(target: MockStorage, property: PropertyKey, value: string) {
  let key = property.toString()
  const int = parseInt(key, 10)

  if (!Number.isNaN(int)) {
    const keys = Array.from(target.map.keys())

    if (keys[int])
      key = keys[int]
  }

  target.setItem(key, value)

  return true
}
