import checkIfItemShouldBeSaved from "./checkIfItemShouldBeSaved"
import BitMap from "../../../collections/BitMap/BitMap"
import TreeSet from "../../../collections/TreeSet/TreeSet"
import PatternVMSP from "../../PatternVMSP/PatternVMSP"
import patternVMSPComparator from "../../../collections/TreeSet/comparators/patternVMSPComparator"
import PrefixVMSP from "../../PrefixVMSP/PrefixVMSP"
import ItemSet from "../../ItemSet/ItemSet"
import { PatternType } from "../../AlgoVMSP"

describe('checkIfItemShouldBeSaved', () => {
  let bitmap: BitMap
  let bitmap2: BitMap
  let maxPatterns: (TreeSet<PatternVMSP> | null)[]
  let patternsWithTwoItems: TreeSet<PatternVMSP>
  let patternsWithThreeItems: TreeSet<PatternVMSP>

  beforeEach(() => {
    bitmap = new BitMap(42)
    bitmap.setSupport(2)
    bitmap2 = new BitMap(42)
    bitmap2.setSupport(4)

    maxPatterns = []
    maxPatterns.push(null)
    maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))
    patternsWithTwoItems = new TreeSet<PatternVMSP>(patternVMSPComparator)
    maxPatterns.push(patternsWithTwoItems)
    patternsWithThreeItems = new TreeSet<PatternVMSP>(patternVMSPComparator)
    maxPatterns.push(patternsWithThreeItems)
  })

  describe('Maximal patterns -- when item is even', () => {
    const item = 4
    const patternType: PatternType = 'maximal'

    it('should return true when item is not contained by any existing pattern', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeTruthy()
    })

    it('should return false when item is already contained by an existing pattern', () => {
      const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5])])
      const pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithThreeItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeFalsy()
    })
  })

  describe('Maximal patterns -- when item is odd', () => {
    const item = 5
    const patternType: PatternType = 'maximal'

    it('should return true when item is not contained by any existing pattern', () => {
      const prefix = new PrefixVMSP([new ItemSet([3, 4])])
      const pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeTruthy()
    })

    it('should return false when item is already contained by an existing pattern', () => {
      const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5])])
      const pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithThreeItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeFalsy()
    })
  })

  describe('closed patterns -- when item is even', () => {
    const item = 4
    const patternType: PatternType = 'closed'

    it('should return true when item is not contained by any existing pattern with same support', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeTruthy()
    })

    it('should return true when item is contained by any existing pattern with lower support', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap2, maxPatterns, patternType)).toBeTruthy()
    })

    it('should return false when item is already contained by an existing pattern with same support', () => {
      const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5])])
      const pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithThreeItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeFalsy()
    })
  })

  describe('Closed patterns -- when item is odd', () => {
    const item = 5
    const patternType: PatternType = 'closed'

    it('should return true when item is already contained by any existing pattern with same support', () => {
      const prefix = new PrefixVMSP([new ItemSet([3, 4])])
      const pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeTruthy()
    })

    it('should return true when item is contained by any existing pattern with lower support', () => {
      const prefix = new PrefixVMSP([new ItemSet([3, 4])])
      const pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap2, maxPatterns, patternType)).toBeTruthy()
    })

    it('should return false when item is not contained by an existing pattern with same support', () => {
      const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5])])
      const pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithThreeItems.add(pattern)
      expect(checkIfItemShouldBeSaved(item, bitmap, maxPatterns, patternType)).toBeFalsy()
    })
  })
})
