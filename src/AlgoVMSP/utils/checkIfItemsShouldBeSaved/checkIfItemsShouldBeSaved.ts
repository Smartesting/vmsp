import BitMap from "../../../collections/BitMap/BitMap"
import TreeSet from "../../../collections/TreeSet/TreeSet"
import PatternVMSP from "../../PatternVMSP/PatternVMSP"
import strictlyContains from "../strictlyContains/strictlyContains"
import PrefixVMSP from "../../PrefixVMSP/PrefixVMSP"

export default function checkIfItemsShouldBeSaved(prefix: PrefixVMSP, 
                                                  bitmap: BitMap, 
                                                  maxPatterns: (TreeSet<PatternVMSP> | null)[],
                                                  length: number,
                                                  maxGap?: number|undefined) {
    for (let i = maxPatterns.length - 1; i > length; i--) {
        for (const pPrime of maxPatterns[i]!.getElements()) {
            if (pPrime.prefix.sumOfOddItems + pPrime.prefix.sumOfEvenItems < prefix.sumOfOddItems + prefix.sumOfEvenItems) {
                break
            }
            if (prefix.sumOfEvenItems <= pPrime.prefix.sumOfEvenItems &&
                prefix.sumOfOddItems <= pPrime.prefix.sumOfOddItems &&
                (maxGap || (!maxGap && bitmap.getSupport() >= pPrime.support)) &&
                strictlyContains(pPrime.prefix, prefix)) {
                return false
            }
        }
    }
    return true
}
