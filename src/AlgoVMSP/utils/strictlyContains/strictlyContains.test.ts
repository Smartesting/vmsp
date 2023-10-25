import PrefixVMSP from "../../PrefixVMSP/PrefixVMSP"
import ItemSet from "../../ItemSet/ItemSet"
import strictlyContains from "./strictlyContains"

describe('strictlyContains', () => {
    let prefix1: PrefixVMSP
    let prefix2: PrefixVMSP

    beforeEach(() => {
        prefix1 = new PrefixVMSP()
        prefix2 = new PrefixVMSP()
    })

    it('should return true if the items are contained in the same item set', () => {
        prefix1.addItemSet(new ItemSet([2, 3]))
        prefix1.addItemSet(new ItemSet([5, 7]))
        prefix2.addItemSet(new ItemSet([2, 3]))
        prefix2.addItemSet(new ItemSet([7]))
        expect(strictlyContains(prefix1, prefix2)).toBeTruthy()
    })

    it('should return true if the items are contained in the same item set #2', () => {
        prefix1.addItemSet(new ItemSet([1, 2, 3, 5]))
        prefix2.addItemSet(new ItemSet([2, 3]))
        expect(strictlyContains(prefix1, prefix2)).toBeTruthy()
    })

    it('should return false if the items are not in the same item set', () => {
        prefix1.addItemSet(new ItemSet([2, 3]))
        prefix2.addItemSet(new ItemSet([2]))
        prefix2.addItemSet(new ItemSet([3]))
        expect(strictlyContains(prefix1, prefix2)).toBeFalsy()
    })
})
