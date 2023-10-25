import TreeSet from "./TreeSet"
import patternVMSPComparator from "./comparators/patternVMSPComparator"
import PatternVMSP from "../../AlgoVMSP/PatternVMSP/PatternVMSP"
import PrefixVMSP from "../../AlgoVMSP/PrefixVMSP/PrefixVMSP"
import ItemSet from "../../AlgoVMSP/ItemSet/ItemSet"

describe('TreeSet', () => {
    describe('add', () => {
        it('should add an element to the sorted list', () => {
            const numberComparator = (a: number, b: number) => a - b
            const treeSet = new TreeSet<number>(numberComparator)
            treeSet.add(4)
            treeSet.add(6)
            treeSet.add(2)
            treeSet.add(5)
            expect(treeSet.getElements()).toEqual([2, 4, 5, 6])
        })
    })

    describe('remove', () => {
        it('should remove an element from the sorted list', () => {
            const numberComparator = (a: number, b: number) => a - b
            const treeSet = new TreeSet<number>(numberComparator)
            treeSet.add(4)
            treeSet.add(6)
            treeSet.add(2)
            treeSet.add(5)
            expect(treeSet.getElements()).toEqual([2, 4, 5, 6])
            treeSet.remove(2)
            expect(treeSet.getElements()).toEqual([2, 4, 6])
        })
    })

    describe('patternVMSPComparator', () => {
        it('should sort patterns depending on the sum of the items', () => {
            const treeSet = new TreeSet<PatternVMSP>(patternVMSPComparator)
            const prefix1 = new PrefixVMSP()
            prefix1.addItemSet(new ItemSet([1]))
            prefix1.addItemSet(new ItemSet([2]))
            prefix1.sumOfEvenItems = 2
            prefix1.sumOfOddItems = 1
            const pattern1 = new PatternVMSP(prefix1, 2)
            treeSet.add(pattern1)
            const prefix2 = new PrefixVMSP()
            prefix2.addItemSet(new ItemSet([3]))
            prefix2.addItemSet(new ItemSet([9]))
            prefix2.sumOfEvenItems = 0
            prefix2.sumOfOddItems = 12
            const pattern2 = new PatternVMSP(prefix2, 2)
            treeSet.add(pattern2)

            expect(treeSet.getElements().length).toEqual(2)
            expect(treeSet.getElements()[0].prefix.getItemsets()).toEqual([{"items": [3]}, {"items": [9]}])
        })
    })
})
