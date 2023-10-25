import {Prefix} from "../Prefix/Prefix"
import ItemSet from "../ItemSet/ItemSet"
import assert from "assert"

export default class PrefixVMSP extends Prefix {
    sumOfEvenItems = 0
    sumOfOddItems = 0

    constructor(itemSets?: ItemSet[]) {
        super(itemSets)
        if (!itemSets) return
        this.computeSums(itemSets)
    }

    public addItemSet(itemSet: ItemSet) {
        super.addItemSet(itemSet)
        this.computeSums([itemSet])
    }

    public addItem(item: number, itemSetIndex: number) {
        assert(this.itemSets[itemSetIndex])
        this.itemSets[itemSetIndex].addItem(item)
        this.incrementSum(item)
    }

    public cloneSequence() {
        return new PrefixVMSP(this.itemSets.map(itemSet => itemSet.cloneItemSet()))
    }

    private computeSums(itemSets: ItemSet[]) {
        for (const itemSet of itemSets) {
            for (const item of itemSet.getItems()) {
                this.incrementSum(item)
            }
        }
    }

    private incrementSum(item: number) {
        if (item % 2 === 0) {
            this.sumOfEvenItems += item
        } else {
            this.sumOfOddItems += item
        }
    }
}
