import checkIfItemsShouldBeSaved from "./checkIfItemsShouldBeSaved"
import BitMap from "../../../collections/BitMap/BitMap"
import TreeSet from "../../../collections/TreeSet/TreeSet"
import PatternVMSP from "../../PatternVMSP/PatternVMSP"
import patternVMSPComparator from "../../../collections/TreeSet/comparators/patternVMSPComparator"
import PrefixVMSP from "../../PrefixVMSP/PrefixVMSP"
import ItemSet from "../../ItemSet/ItemSet"

describe('checkIfItemsShouldBeSaved', () => {
    let bitmap: BitMap
    let maxPatterns: (TreeSet<PatternVMSP> | null)[]
    let patternsWithThreeItems: TreeSet<PatternVMSP>
    let patternsWithSixItems: TreeSet<PatternVMSP>

    beforeEach(() => {
        bitmap = new BitMap(42)
        bitmap.setSupport(2)

        maxPatterns = []
        maxPatterns.push(null)
        maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))
        maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))
        patternsWithThreeItems = new TreeSet<PatternVMSP>(patternVMSPComparator)
        maxPatterns.push(patternsWithThreeItems)
        maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))
        maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))
        patternsWithSixItems = new TreeSet<PatternVMSP>(patternVMSPComparator)
        maxPatterns.push(patternsWithSixItems)
    })

    it('should return true when items are not contained by any existing pattern', () => {
        let prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5])])
        let pattern = new PatternVMSP(prefix, bitmap.getSupport())
        patternsWithThreeItems.add(pattern)
        const items = new PrefixVMSP([new ItemSet([5]), new ItemSet([6, 7])])
        expect(checkIfItemsShouldBeSaved(items, bitmap, maxPatterns, 3)).toBeTruthy()
    })

    it('should return true when items are not contained by any existing pattern #2', () => {
        const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5, 6]), new ItemSet([7, 8])])
        const pattern = new PatternVMSP(prefix, bitmap.getSupport())
        patternsWithSixItems.add(pattern)
        const items = new PrefixVMSP([new ItemSet([3, 4, 5])])
        expect(checkIfItemsShouldBeSaved(items, bitmap, maxPatterns, 3)).toBeTruthy()
    })

    it('should return false when items are already contained by an existing pattern', () => {
        const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5, 6]), new ItemSet([7, 8])])
        const pattern = new PatternVMSP(prefix, bitmap.getSupport())
        patternsWithSixItems.add(pattern)
        const items = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([8])])
        expect(checkIfItemsShouldBeSaved(items, bitmap, maxPatterns, 3)).toBeFalsy()
    })

    it('returns true if maxgap is undefined and container support > containee support, regardless of actual containment (support prevails)', () => {
        const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5, 6]), new ItemSet([7, 8])])
        const pattern = new PatternVMSP(prefix, 3)
        patternsWithSixItems.add(pattern)
        const items = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([8])])
        expect(checkIfItemsShouldBeSaved(items, bitmap, maxPatterns, 3)).toBeTruthy()
    })

    it('returns false if maxgap is set and container support > containee support', () => {
        const prefix = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([5, 6]), new ItemSet([7, 8])])
        const pattern = new PatternVMSP(prefix, 3)
        patternsWithSixItems.add(pattern)
        const items = new PrefixVMSP([new ItemSet([3, 4]), new ItemSet([8])])
        expect(checkIfItemsShouldBeSaved(items, bitmap, maxPatterns, 3,1)).toBeFalsy()
    })
})
