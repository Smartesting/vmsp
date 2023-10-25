import ItemSet from "./ItemSet"

describe('Itemset', () => {
    describe('addItem', () => {
        it('should not add an existing item', () => {
            const itemSet = new ItemSet()
            itemSet.addItem(5)
            expect(itemSet.size()).toEqual(1)
            itemSet.addItem(5)
            expect(itemSet.size()).toEqual(1)
        })
    })

    describe('cloneItemSet', () => {
        it('should copy the values but not the reference', () => {
            const itemSet = new ItemSet()
            itemSet.addItem(5)
            const clone = itemSet.cloneItemSet()
            expect(itemSet.getItems()).toEqual(clone.getItems())
            expect(itemSet).not.toBe(clone)
            expect(itemSet.getItems()).not.toBe(clone.getItems())
            clone.addItem(3)
            expect(itemSet.getItems()).toEqual([5])
            expect(clone.getItems()).toEqual([5,3])
        })
    })
})
