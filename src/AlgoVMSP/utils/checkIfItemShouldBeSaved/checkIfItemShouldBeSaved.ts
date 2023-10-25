import BitMap from "../../../collections/BitMap/BitMap"
import TreeSet from "../../../collections/TreeSet/TreeSet"
import PatternVMSP from "../../PatternVMSP/PatternVMSP"

export default function checkIfItemShouldBeSaved(item: number, bitmap: BitMap, maxPatterns: (TreeSet<PatternVMSP> | null)[]) {
    return item % 2 === 0 ?
        checkIfEvenItemShouldBeSaved(item, bitmap, maxPatterns)
        :
        checkIfOddItemShouldBeSaved(item, bitmap, maxPatterns)
}

function checkIfEvenItemShouldBeSaved(item: number, bitmap: BitMap, maxPatterns: (TreeSet<PatternVMSP> | null)[]) {
    for (let i = maxPatterns.length - 1; i > 1; i--) {
        for (const pPrime of maxPatterns[i]!.getElements()) {
            if (pPrime.prefix.sumOfOddItems
                + pPrime.prefix.sumOfEvenItems < item) {
                break
            }

            if (pPrime.prefix.sumOfEvenItems >= item &&
                bitmap.getSupport() >= pPrime.support) {
                if (pPrime.prefix.containsItem(item)) {
                    return false
                }
            }
        }
    }
    return true
}

function checkIfOddItemShouldBeSaved(item: number, bitmap: BitMap, maxPatterns: (TreeSet<PatternVMSP> | null)[]) {
    for (let i = maxPatterns.length - 1; i > 1; i--) {
        for (const pPrime of maxPatterns[i]!.getElements()) {
            if (pPrime.prefix.sumOfOddItems
                + pPrime.prefix.sumOfEvenItems < item) {
                break
            }

            if (pPrime.prefix.sumOfOddItems >= item &&
                bitmap.getSupport() >= pPrime.support) {
                if (pPrime.prefix.containsItem(item)) {
                    return false
                }
            }
        }
    }
    return true
}
