import { generateSessionBitmap } from "./generateSessionBitMap"

describe('Bitmap Generator Function', () => {
  it('should generate a bitmap with all bits set to 0 if the input array is empty', () => {
    const sid: number[] = []
    const bitmapSize = 10
    const expectedBitmap = Array<number>(bitmapSize).fill(0)
    const result = generateSessionBitmap(sid, bitmapSize)
    expect(result).toStrictEqual(expectedBitmap)
  })

  it('should generate a bitmap with specified bits set to 1', () => {
    const sid = [1, 3, 5]
    const bitmapSize = 6
    const expectedBitmap = [0, 1, 0, 1, 0, 1]
    const result = generateSessionBitmap(sid, bitmapSize)
    expect(result).toStrictEqual(expectedBitmap)
  })

  it('should handle a large number of elements', () => {
    const sid = [10000, 20000, 30000]
    const bitmapSize = 50000
    const expectedBitmap = Array<number>(bitmapSize).fill(0)
    expectedBitmap[10000] = 1
    expectedBitmap[20000] = 1
    expectedBitmap[30000] = 1
    const result = generateSessionBitmap(sid, bitmapSize)
    expect(result).toStrictEqual(expectedBitmap)
  })

  it('should not modify the original array', () => {
    const sid = [1, 2, 3]
    const bitmapSize = 4
    const result = generateSessionBitmap(sid, bitmapSize)
    expect(sid).toStrictEqual([1, 2, 3]) // Ensure the original array is not modified
    expect(result).toStrictEqual([0, 1, 1, 1])
  })
})
