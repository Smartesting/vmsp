import BitMap from "../../../collections/BitMap/BitMap"
import TreeSet from "../../../collections/TreeSet/TreeSet"
import PatternVMSP from "../../PatternVMSP/PatternVMSP"
import patternVMSPComparator from "../../../collections/TreeSet/comparators/patternVMSPComparator"
import PrefixVMSP from "../../PrefixVMSP/PrefixVMSP"
import ItemSet from "../../ItemSet/ItemSet"
import removeSavedPatternsContainedByNewItems from "./removeSavedPatternsContainedByNewItems"
import { PatternType } from "../../AlgoVMSP"

describe('removeSavedPatternsContainedByNewItems', () => {
  let bitmap: BitMap
  let bitmap2: BitMap
  let maxPatterns: (TreeSet<PatternVMSP> | null)[]
  let patternsWithTwoItems: TreeSet<PatternVMSP>
  let patternsWithThreeItems: TreeSet<PatternVMSP>

  beforeEach(() => {
    bitmap = new BitMap(42)
    bitmap.setSupport(2)
    bitmap2 = new BitMap(41)
    bitmap2.setSupport(4)

    maxPatterns = []
    maxPatterns.push(null)
    maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))
    patternsWithTwoItems = new TreeSet<PatternVMSP>(patternVMSPComparator)
    maxPatterns.push(patternsWithTwoItems)
    patternsWithThreeItems = new TreeSet<PatternVMSP>(patternVMSPComparator)
    maxPatterns.push(patternsWithThreeItems)
  })

  describe('maximal matterns', () => {

    const patternType: PatternType = 'maximal'

    it('should remove existing patterns contained by items and return the number of deletions', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3]), new ItemSet([5]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap, maxPatterns, 4, patternType)).toEqual(1)
      expect(patternsWithTwoItems.size()).toEqual(0)
    })

    it('should remove existing patterns contained by items and return the number of deletions #2', () => {
      let prefix = new PrefixVMSP([new ItemSet([3, 4])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap, maxPatterns, 5, patternType)).toEqual(1)
      expect(patternsWithTwoItems.size()).toEqual(0)
    })

    it('should not do anything and return 0 if there is no pattern contained by items', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap, maxPatterns, 3, patternType)).toEqual(0)
      expect(patternsWithTwoItems.size()).toEqual(1)
    })
  })

  describe('closed matterns', () => {

    const patternType: PatternType = 'closed'

    it('Removes existing patterns contained by items with same support and return the number of deletions', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3]), new ItemSet([5]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap, maxPatterns, 4, patternType)).toEqual(1)
      expect(patternsWithTwoItems.size()).toEqual(0)
    })

    it('Do not remove existing patterns contained by items with higher support and return the number of deletions', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3]), new ItemSet([5]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap2, maxPatterns, 4, patternType)).toEqual(0)
      expect(patternsWithTwoItems.size()).toEqual(1)
    })

    it('Removes existing patterns contained by items and return the number of deletions #2', () => {
      let prefix = new PrefixVMSP([new ItemSet([3, 4])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap, maxPatterns, 5, patternType)).toEqual(1)
      expect(patternsWithTwoItems.size()).toEqual(0)
    })

    it('Do not remove existing patterns contained by items and return the number of deletions #2', () => {
      let prefix = new PrefixVMSP([new ItemSet([3, 4])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap2, maxPatterns, 5, patternType)).toEqual(0)
      expect(patternsWithTwoItems.size()).toEqual(1)
    })

    it('do not do anything and return 0 if there is no pattern contained by items', () => {
      let prefix = new PrefixVMSP([new ItemSet([3]), new ItemSet([5])])
      let pattern = new PatternVMSP(prefix, bitmap.getSupport())
      patternsWithTwoItems.add(pattern)
      expect(patternsWithTwoItems.size()).toEqual(1)
      const items = new PrefixVMSP([new ItemSet([3]), new ItemSet([6, 7])])
      expect(removeSavedPatternsContainedByNewItems(items, bitmap, maxPatterns, 3, patternType)).toEqual(0)
      expect(patternsWithTwoItems.size()).toEqual(1)
    })
  })

})
