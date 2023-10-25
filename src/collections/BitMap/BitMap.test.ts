import BitSet from "bitset"
import BitMap from "./BitMap"

describe('BitMap', () => {
  let bitmap: BitMap
  let sequencesSize: number[]

  beforeEach(() => {
    bitmap = new BitMap(6)
    sequencesSize = [0, 2, 4]
  })

  describe('registerBit', () => {
    it('should not increment the support of an item more than once per line', () => {
      bitmap.registerBit(0, 0, sequencesSize)
      bitmap.registerBit(2, 2, sequencesSize)

      expect(bitmap.getBitSet().get(0)).toStrictEqual(1)
      expect(bitmap.getBitSet().get(1)).toStrictEqual(0)
      expect(bitmap.getBitSet().get(2)).toStrictEqual(0)
      expect(bitmap.getBitSet().get(3)).toStrictEqual(0)
      expect(bitmap.getBitSet().get(4)).toStrictEqual(0)
      expect(bitmap.getBitSet().get(5)).toStrictEqual(0)
      expect(bitmap.getBitSet().get(6)).toStrictEqual(1)

      expect(bitmap.getSupport()).toStrictEqual(2)
    })
  })

  describe('nextSetBit', () => {
    it('returns next set bit given a bit index and multiple words', () => {
      bitmap = new BitMap(260)
      sequencesSize = [0, 34, 69, 145, 210]
      bitmap.registerBit(0, 1, sequencesSize)
      bitmap.registerBit(0, 33, sequencesSize)
      bitmap.registerBit(2, 31, sequencesSize)
      bitmap.registerBit(3, 54, sequencesSize)
      bitmap.registerBit(4, 49, sequencesSize)

      expect(bitmap.nextSetBit(0)).toStrictEqual(1)
      expect(bitmap.nextSetBit(1)).toStrictEqual(1)
      expect(bitmap.nextSetBit(2)).toStrictEqual(33)
      expect(bitmap.nextSetBit(32)).toStrictEqual(33)
      expect(bitmap.nextSetBit(33)).toStrictEqual(33)
      expect(bitmap.nextSetBit(34)).toStrictEqual(100)
      expect(bitmap.nextSetBit(65)).toStrictEqual(100)
      expect(bitmap.nextSetBit(99)).toStrictEqual(100)
      expect(bitmap.nextSetBit(100)).toStrictEqual(100)
      expect(bitmap.nextSetBit(101)).toStrictEqual(199)
      expect(bitmap.nextSetBit(127)).toStrictEqual(199)
      expect(bitmap.nextSetBit(128)).toStrictEqual(199)
      expect(bitmap.nextSetBit(129)).toStrictEqual(199)
      expect(bitmap.nextSetBit(198)).toStrictEqual(199)
      expect(bitmap.nextSetBit(199)).toStrictEqual(199)
      expect(bitmap.nextSetBit(200)).toStrictEqual(259)
      expect(bitmap.nextSetBit(210)).toStrictEqual(259)
      expect(bitmap.nextSetBit(258)).toStrictEqual(259)
      expect(bitmap.nextSetBit(259)).toStrictEqual(259)
      expect(bitmap.nextSetBit(260)).toStrictEqual(-1)

      expect(bitmap.getSupport()).toStrictEqual(4)
    })
  })

  describe('getTrailingZeros', () => {
    it('returns the number of trailing zeros of a number in bits', () => {
      expect(bitmap['getTrailingZeros'](8)).toStrictEqual(3)
      expect(bitmap['getTrailingZeros'](9)).toStrictEqual(0)
      expect(bitmap['getTrailingZeros'](1847363700)).toStrictEqual(2)
      expect(bitmap['getTrailingZeros'](1018500738)).toStrictEqual(1)
    })
  })

  describe('bitToSequenceIndex', () => {
    it('returns the index of the sequence containing the bit', () => {
      bitmap.registerBit(0, 0, sequencesSize)
      bitmap.registerBit(2, 2, sequencesSize)

      expect(bitmap.bitToSequenceIndex(0, sequencesSize)).toStrictEqual(0)
      expect(bitmap.bitToSequenceIndex(1, sequencesSize)).toStrictEqual(0)
      expect(bitmap.bitToSequenceIndex(2, sequencesSize)).toStrictEqual(1)
      expect(bitmap.bitToSequenceIndex(3, sequencesSize)).toStrictEqual(1)
      expect(bitmap.bitToSequenceIndex(4, sequencesSize)).toStrictEqual(2)
      expect(bitmap.bitToSequenceIndex(5, sequencesSize)).toStrictEqual(2)
      expect(bitmap.bitToSequenceIndex(6, sequencesSize)).toStrictEqual(2)
    })

    it('returns -1 if the bit is out of the left bound', () => {
      bitmap.registerBit(0, 0, sequencesSize)
      bitmap.registerBit(2, 2, sequencesSize)

      expect(bitmap.bitToSequenceIndex(-1, sequencesSize)).toStrictEqual(-1)
    })

    it('returns -1 regardless of input when the bitmap is freshly created', () => {
      const andBitmap: BitMap = new BitMap(20617)
      expect(bitmap.nextSetBit(0)).toStrictEqual(-1)
      expect(bitmap.nextSetBit(100)).toStrictEqual(-1)
      expect(bitmap.nextSetBit(1000)).toStrictEqual(-1)
      expect(bitmap.nextSetBit(10000)).toStrictEqual(-1)
      expect(bitmap.nextSetBit(20617)).toStrictEqual(-1)
      expect(bitmap.nextSetBit(20618)).toStrictEqual(-1)
    })

    it('returns the last sequence index if the bit is out of the right bound', () => {
      bitmap.registerBit(0, 0, sequencesSize)
      bitmap.registerBit(2, 2, sequencesSize)

      expect(bitmap.bitToSequenceIndex(100, sequencesSize)).toStrictEqual(2)
    })
  })

  describe('lastBitOfSequence', () => {
    it('returns the last bit of the sequence corresponding to the index', () => {
      bitmap.registerBit(0, 0, sequencesSize)
      bitmap.registerBit(2, 2, sequencesSize)

      expect(bitmap.lastBitOfSequence(0, sequencesSize, 5)).toStrictEqual(1)
      expect(bitmap.lastBitOfSequence(1, sequencesSize, 5)).toStrictEqual(3)
      expect(bitmap.lastBitOfSequence(2, sequencesSize, 5)).toStrictEqual(5)
      expect(bitmap.lastBitOfSequence(3, sequencesSize, 5)).toStrictEqual(5)
    })
  })

  describe('createNewBitmapSStep', () => {
    let bitmap2: BitMap

    beforeEach(() => {
      bitmap2 = new BitMap(14)
      sequencesSize = [0, 5, 9, 13]

      // 1 0 0 0 0 | 1 0 0 0 | 1 0 0 0 | 0 0
      bitmap.registerBit(0, 0, sequencesSize)
      bitmap.registerBit(1, 0, sequencesSize)
      bitmap.registerBit(2, 0, sequencesSize)

      // 0 0 0 0 1 | 0 0 0 1 | 0 0 0 0 | 0 1
      bitmap2.registerBit(0, 4, sequencesSize)
      bitmap2.registerBit(1, 3, sequencesSize)
      bitmap2.registerBit(3, 1, sequencesSize)

    })

    it('returns the S-map of a bitmap without max gap defined', () => {
      const bitmapAnd = bitmap.createNewBitmapSStep(bitmap2, sequencesSize)

      // oracle: 0 0 0 0 1 | 0 0 0 1 | 0 0 0 0 | 0 0
      expect(bitmapAnd?.getBitSet().get(0)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(1)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(2)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(3)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(4)).toEqual(1)

      expect(bitmapAnd?.getBitSet().get(5)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(6)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(7)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(8)).toEqual(1)

      expect(bitmapAnd?.getBitSet().get(9)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(10)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(11)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(12)).toEqual(0)

      expect(bitmapAnd?.getBitSet().get(13)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(14)).toEqual(0)

      expect(bitmapAnd?.getSupportWithoutGapTotal()).toEqual(2)
      expect(bitmapAnd?.getSupport()).toEqual(2)
    })

    it('returns the S-map of a bitmap with max gap set to 2', () => {
      const bitmapAnd = bitmap.createNewBitmapSStep(bitmap2, sequencesSize, 3)

      // oracle: 0 0 0 0 0 | 0 0 0 1 | 0 0 0 0 | 0 0
      expect(bitmapAnd?.getBitSet().get(0)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(1)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(2)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(3)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(4)).toEqual(0)

      expect(bitmapAnd?.getBitSet().get(5)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(6)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(7)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(8)).toEqual(1)

      expect(bitmapAnd?.getBitSet().get(9)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(10)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(11)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(12)).toEqual(0)

      expect(bitmapAnd?.getBitSet().get(13)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(14)).toEqual(0)

      expect(bitmapAnd?.getSupportWithoutGapTotal()).toEqual(2)
      expect(bitmapAnd?.getSupport()).toEqual(1)
    })
  })

  describe('createNewBitmapIStep', () => {
    let bitmap2: BitMap

    beforeEach(() => {
      bitmap = new BitMap(14)
      bitmap2 = new BitMap(14)
      sequencesSize = [0, 5, 9, 13]

      // 1 0 0 0 1 | 1 0 0 1 | 1 0 0 0 | 0 0
      bitmap.registerBit(0, 0, sequencesSize)
      bitmap.registerBit(0, 4, sequencesSize)
      bitmap.registerBit(1, 0, sequencesSize)
      bitmap.registerBit(1, 3, sequencesSize)
      bitmap.registerBit(2, 0, sequencesSize)

      // 0 0 0 0 1 | 0 0 0 1 | 0 0 0 1 | 0 0
      bitmap2.registerBit(0, 4, sequencesSize)
      bitmap2.registerBit(1, 3, sequencesSize)
      bitmap2.registerBit(2, 3, sequencesSize)

    })

    it('returns the I-map of a bitmap', () => {
      const bitmapAnd = bitmap.createNewBitmapIStep(bitmap2, sequencesSize)

      // oracle: 0 0 0 0 1 | 0 0 0 1 | 0 0 0 0 | 0 0
      expect(bitmapAnd?.getBitSet().get(0)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(1)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(2)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(3)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(4)).toEqual(1)

      expect(bitmapAnd?.getBitSet().get(5)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(6)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(7)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(8)).toEqual(1)

      expect(bitmapAnd?.getBitSet().get(9)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(10)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(11)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(12)).toEqual(0)

      expect(bitmapAnd?.getBitSet().get(13)).toEqual(0)
      expect(bitmapAnd?.getBitSet().get(14)).toEqual(0)

      expect(bitmapAnd?.getSupport()).toEqual(2)
      // result: 0 1 1 1 1 | 0 0 0 1 | 0 0 0 1 | 0 0
    })
  })
})
