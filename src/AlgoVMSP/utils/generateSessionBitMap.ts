export function generateSessionBitmap(sid: number[], bitmapSize: number) {
  let bitmap = Array<number>(bitmapSize).fill(0)
  for (let i = 0; i < sid.length; i++) {
    bitmap[sid[i]] = 1
  }
  return bitmap
}

