const uniq = <T>(list: T[]) => {
  const map = new Map()
  list.forEach(item => {
    map.set(item, true)
  })
  return Array.from(map.keys()) as T[]
}

export default uniq
