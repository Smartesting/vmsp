import { Prefix } from "./Prefix"
import ItemSet from "../ItemSet/ItemSet"

describe('Prefix', () => {
  let prefix: Prefix

  beforeEach(() => {
    prefix = new Prefix()
    prefix.addItemSet(new ItemSet([1, 2, 4, 5]))
  })

  describe('constructor', () => {
    it('saves the specified item sets', () => {
      const newPrefix = new Prefix([
        new ItemSet([4, 5]),
        new ItemSet([2, 7])
      ])
      expect(newPrefix.getItemsets().length).toEqual(2)
      expect(newPrefix.getItemsets()[0]).toEqual({ "items": [4, 5] })
      expect(newPrefix.getItemsets()[1]).toEqual({ "items": [2, 7] })
    })
  })

  describe('Item and Itemset Sizes', () => {
    it('returns the number of itemsets', () => {
      const newPrefix = new Prefix([
        new ItemSet([4]),
        new ItemSet([2, 7]),
        new ItemSet([8, 2, 4, 5])
      ])
      expect(newPrefix.nbrOfItemSets()).toEqual(3)
      newPrefix.addItemSet(new ItemSet([9, 3]))
      expect(newPrefix.nbrOfItemSets()).toEqual(4)
    })

    it('returns the number of items', () => {
      const newPrefix = new Prefix([
        new ItemSet([4]),
        new ItemSet([2, 7]),
        new ItemSet([8, 2, 4, 5])
      ])
      expect(newPrefix.nbrOfItems()).toEqual(7)
      newPrefix.addItemSet(new ItemSet([9, 3]))
      expect(newPrefix.nbrOfItems()).toEqual(9)
    })
  })

  describe('cloneSequence', () => {
    it('makes a deep copy of the prefix', () => {
      const clone = prefix.cloneSequence()
      expect(prefix).not.toBe(clone)
      expect(prefix.getItemsets()).toEqual(clone.getItemsets())
      expect(prefix.getItemsets()).not.toBe(clone.getItemsets())
      expect(prefix.getItemsets()[0]).toEqual(clone.getItemsets()[0])
      expect(prefix.getItemsets()[0]).not.toBe(clone.getItemsets()[0])
    })
  })

  describe('getItemSetsArray', () => {
    it('returns a flat array of all items', () => {
      expect(prefix.getItemSetsArray()).toEqual([[1, 2, 4, 5]])
      prefix.addItemSet(new ItemSet([6]))
      prefix.addItemSet(new ItemSet([7, 8]))
      prefix.addItemSet(new ItemSet([9, 10, 11]))
      prefix.addItemSet(new ItemSet([12]))
      expect(prefix.getItemSetsArray()).toEqual([[1, 2, 4, 5], [6], [7, 8], [9, 10, 11], [12]])
    })
  })

  describe('getFlatArrayOfItems', () => {
    it('returns a flat array of all items', () => {
      expect(prefix.getFlatArrayOfItems()).toEqual([1, 2, 4, 5])
      prefix.addItemSet(new ItemSet([6]))
      prefix.addItemSet(new ItemSet([7, 8]))
      prefix.addItemSet(new ItemSet([9, 10, 11]))
      prefix.addItemSet(new ItemSet([12]))
      expect(prefix.getFlatArrayOfItems()).toEqual([1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    })
  })

  describe('containsItem', () => {
    it('returns true if the item is contained in the prefix', () => {
      expect(prefix.containsItem(1)).toBeTruthy()
    })

    it('returns false if the item is not contained in the prefix', () => {
      expect(prefix.containsItem(3)).toBeFalsy()
    })
  })
})
