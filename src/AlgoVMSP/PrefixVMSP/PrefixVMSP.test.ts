import ItemSet from "../ItemSet/ItemSet"
import PrefixVMSP from "./PrefixVMSP"

describe('PrefixVMSP', () => {
    let prefix: PrefixVMSP

    beforeEach(() => {
        prefix = new PrefixVMSP([new ItemSet([4, 5])])
    })

    describe('constructor', () => {
        it('should compute the sums of even and odd items', () => {
            expect(prefix.getItemsets().length).toEqual(1)
            expect(prefix.getItemsets()[0].getItems()).toEqual([4, 5])
            expect(prefix.sumOfEvenItems).toEqual(4)
            expect(prefix.sumOfOddItems).toEqual(5)
        })
    })

    describe('addItemset', () => {
        it('should increment the sums of even and odd items', () => {
            prefix.addItemSet(new ItemSet([2, 7]))
            expect(prefix.getItemsets().length).toEqual(2)
            expect(prefix.getItemsets()[1].getItems()).toEqual([2, 7])
            expect(prefix.sumOfEvenItems).toEqual(6)
            expect(prefix.sumOfOddItems).toEqual(12)
        })
    })

    describe('addItem', () => {
        it('should increment the sum of item type (even/odd)', () => {
            expect(prefix.getItemsets().length).toEqual(1)
            expect(prefix.getItemsets()[0].getItems()).toEqual([4, 5])
            prefix.addItem(9, 0)
            expect(prefix.getItemsets().length).toEqual(1)
            expect(prefix.getItemsets()[0].getItems()).toEqual([4, 5, 9])
            expect(prefix.sumOfEvenItems).toEqual(4)
            expect(prefix.sumOfOddItems).toEqual(14)
        })
    })

    describe('cloneSequence', () => {
        it('should make a deep copy of the prefix', () => {
            const clone = prefix.cloneSequence()
            expect(prefix).not.toBe(clone)
            expect(prefix.getItemsets()).toEqual(clone.getItemsets())
            expect(prefix.getItemsets()).not.toBe(clone.getItemsets())
            expect(prefix.getItemsets()[0]).toEqual(clone.getItemsets()[0])
            expect(prefix.getItemsets()[0]).not.toBe(clone.getItemsets()[0])
        })
    })
})
