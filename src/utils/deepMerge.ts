export default function deepMerge<T>(target: T, source: Partial<T>): T {
  for (const key in source) {
    if (source[key] instanceof Object && target[key]) {
      target[key] = deepMerge(target[key], source[key])
    } else if (source[key] !== undefined) {
      target[key] = source[key]
    }
  }
  return target
}
