import BitSet from "bitset"
import { binarySearch } from "../../AlgoVMSP/utils/binarySearch"

export default class BitMap {
  public static INTERSECTION_COUNT = 0
  private lastSID = -1
  private support = 0
  private firstItemSetID = -1
  private supportWithoutGapTotal = 0
  private sequenceIndexSum = 0
  private readonly bitSet: BitSet
  private readonly WORD_LENGTH = 32
  private readonly ADDRESS_BITS_PER_WORD = 5 // 32 bits per word = 5 address bits
  private readonly WORD_MASK = 0xffffffff

  constructor(private readonly lastIndexBit: number) {
    this.bitSet = new BitSet()
  }

  public registerBit(sequenceIndex: number, itemSetIndex: number, sequencesSize: number[]): void {
    const pos = sequencesSize[sequenceIndex] + itemSetIndex

    this.bitSet.set(pos, 1)

    if (sequenceIndex != this.lastSID) {
      this.support++
      this.sequenceIndexSum += sequenceIndex
    }

    if (this.firstItemSetID === -1 || itemSetIndex < this.firstItemSetID) {
      this.firstItemSetID = itemSetIndex;
    }

    this.lastSID = sequenceIndex;
  }

  public getBitSet(): BitSet {
    return this.bitSet
  }

  public getSupport(): number {
    return this.support
  }

  public setSupport(support: number) {
    this.support = support
  }

  public nextSetBit(fromIndex: number): number {
    if (fromIndex < 0)
      throw new Error('bit index cannot be negative')
    let wordIndex = this.getWordIndex(fromIndex)
    if (wordIndex >= (this.bitSet as any).data.length) {
      return -1
    }
    // On filtre le mot courant pour ne garder que les bits après fromIndex
    let word = (this.bitSet as any).data[wordIndex] & (this.WORD_MASK << fromIndex)

    while (true) {
      // Si un bit est set dans le mot courant
      if (word !== 0) {
        return wordIndex * this.WORD_LENGTH + this.getTrailingZeros(word)
      }
      if (++wordIndex === (this.bitSet as any).data.length) {
        return -1
      }
      // Sinon on passe au mot suivant (qu'on peut considérer en entier)
      word = (this.bitSet as any).data[wordIndex]
    }
  }

  // Copy of Java's Long.numberOfTrailingZeros
  private getTrailingZeros(intval: number): number {
    let x, y
    if (intval == 0) return 64
    let n = 63
    y = intval;
    if (y != 0) {
      n = n - 32;
      x = y;
    } else x = intval >>> 32;
    y = x << 16;
    if (y != 0) {
      n = n - 16;
      x = y;
    }
    y = x << 8;
    if (y != 0) {
      n = n - 8;
      x = y;
    }
    y = x << 4;
    if (y != 0) {
      n = n - 4;
      x = y;
    }
    y = x << 2;
    if (y != 0) {
      n = n - 2;
      x = y;
    }
    return n - ((x << 1) >>> 31);
  }

  private getWordIndex(bitIndex: number): number {
    return bitIndex >> this.ADDRESS_BITS_PER_WORD
  }

  public createNewBitmapSStep(bitmap: BitMap, sequencesSize: number[], maxGap?: number): BitMap {
    const andBitmap: BitMap = new BitMap(this.lastIndexBit)
    if (maxGap === undefined) {
      for (let bitCurrent = this.nextSetBit(0); bitCurrent >= 0; bitCurrent = this.nextSetBit(bitCurrent + 1)) {
        const sequenceIndex = this.bitToSequenceIndex(bitCurrent, sequencesSize)
        const lastBitOfSequence = this.lastBitOfSequence(sequenceIndex, sequencesSize, this.lastIndexBit)

        let match = false
        for (let bitParam = bitmap.nextSetBit(bitCurrent + 1);
          bitParam >= 0 && bitParam <= lastBitOfSequence;
          bitParam = bitmap.nextSetBit(bitParam + 1)) {

          andBitmap.getBitSet().set(bitParam)
          match = true

          const itemSetIndex = bitParam - sequencesSize[sequenceIndex]
          if (this.firstItemSetID == -1 || itemSetIndex < this.firstItemSetID) {
            this.firstItemSetID = itemSetIndex
          }
        }
        if (match) {
          if (sequenceIndex != andBitmap.lastSID) {
            andBitmap.support++
            andBitmap.supportWithoutGapTotal++
            andBitmap.sequenceIndexSum += sequenceIndex
            andBitmap.lastSID = sequenceIndex
          }
        }
        // SPAM OPTIMIZATION
        bitCurrent = lastBitOfSequence
      }
    } else {
      let previousSequenceIndex = -1

      for (let bitCurrent = this.nextSetBit(0); bitCurrent >= 0; bitCurrent = this.nextSetBit(bitCurrent + 1)) {
        const sequenceIndex = this.bitToSequenceIndex(bitCurrent, sequencesSize)

        let match = false
        let matchWithoutGap = false
        const lastBitOfSequence = this.lastBitOfSequence(sequenceIndex, sequencesSize, this.lastIndexBit)

        for (let bitParam = bitmap.nextSetBit(bitCurrent + 1);
          bitParam >= 0 && bitParam <= lastBitOfSequence;
          bitParam = bitmap.nextSetBit(bitParam + 1)) {
          matchWithoutGap = true

          if (bitParam - bitCurrent > maxGap) {
            break
          }

          andBitmap.bitSet.set(bitParam)
          match = true

          const itemSetIndex = bitParam - sequencesSize[sequenceIndex]
          if (this.firstItemSetID == -1 || itemSetIndex < this.firstItemSetID) {
            this.firstItemSetID = itemSetIndex
          }
        }

        if (matchWithoutGap && previousSequenceIndex != sequenceIndex) {
          andBitmap.supportWithoutGapTotal += 1
          previousSequenceIndex = sequenceIndex
        }

        if (match) {
          if (sequenceIndex != andBitmap.lastSID) {
            andBitmap.support++
            andBitmap.sequenceIndexSum += sequenceIndex
          }
          andBitmap.lastSID = sequenceIndex
        }
      }
    }
    return andBitmap
  }

  public createNewBitmapIStep(bitmap: BitMap, sequencesSize: number[]): BitMap {
    const newBitmap = new BitMap(this.lastIndexBit)

    for (let bitCurrent = this.nextSetBit(0); bitCurrent >= 0; bitCurrent = this.nextSetBit(bitCurrent + 1)) {
      if (bitmap.bitSet.get(bitCurrent) === 1) {
        newBitmap.bitSet.set(bitCurrent)
        const sequenceIndex = this.bitToSequenceIndex(bitCurrent, sequencesSize)

        if (sequenceIndex != newBitmap.lastSID) {
          newBitmap.sequenceIndexSum += sequenceIndex
          newBitmap.support++
        }
        newBitmap.lastSID = sequenceIndex

        const itemSetIndex = bitCurrent - sequencesSize[sequenceIndex]
        if (this.firstItemSetID == -1 || itemSetIndex < this.firstItemSetID) {
          this.firstItemSetID = itemSetIndex
        }
      }
    }
    return newBitmap
  }

  public bitToSequenceIndex(bitIndex: number, sequencesSize: number[]): number {
    const result = binarySearch(sequencesSize, bitIndex)
    if (result >= 0) return result
    return -result - 2
  }

  public lastBitOfSequence(sequenceIndex: number, sequencesSize: number[], lastBitIndex: number): number {
    if (sequenceIndex + 1 >= sequencesSize.length) {
      return lastBitIndex;
    } else {
      return sequencesSize[sequenceIndex + 1] - 1;
    }
  }

  public getSupportWithoutGapTotal(): number {
    return this.supportWithoutGapTotal;
  }

  public getSIDs(sequencesSize: number[]) {
    let sids: number[] = []
    let lastSidSeen = -1
    for (let bitK = this.nextSetBit(0); bitK >= 0; bitK = this.nextSetBit(bitK + 1)) {
      const sid = this.bitToSequenceIndex(bitK, sequencesSize)
      // if we did not see this sid already
      if (sid != lastSidSeen) {
        sids.push(sid)
        lastSidSeen = sid
      }
    }
    return sids
  }

  public getSIDsAsString(sequencesSize: number[]) {
    let builder = ''
    let lastSidSeen = -1
    for (let bitK = this.nextSetBit(0); bitK >= 0; bitK = this.nextSetBit(bitK + 1)) {
      const sid = this.bitToSequenceIndex(bitK, sequencesSize)
      // if we did not see this sid already
      if (sid != lastSidSeen) {
        if (lastSidSeen != -1) {
          builder += " "
        }
        builder += sid
        lastSidSeen = sid
      }
    }
    return builder.toString()
  }
}
