export function slugGenerator(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/, '')
}