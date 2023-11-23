import strictlyContains from "../strictlyContains/strictlyContains"
import PrefixVMSP from "../../PrefixVMSP/PrefixVMSP"
import BitMap from "../../../collections/BitMap/BitMap"
import TreeSet from "../../../collections/TreeSet/TreeSet"
import PatternVMSP from "../../PatternVMSP/PatternVMSP"
import { PatternType } from "../../AlgoVMSP"

export default function removeSavedPatternsContainedByNewItems(
  prefix: PrefixVMSP,
  bitmap: BitMap,
  maxPatterns: (TreeSet<PatternVMSP> | null)[],
  length: number,
  patternType: PatternType,
  maxGap?: number | undefined) {
  let removedPatternsNumber = 0
  for (let i = 1; i < length && i < maxPatterns.length; i++) {
    for (let j = maxPatterns[i]!.size() - 1; j >= 0; j--) {
      const pPrime = maxPatterns[i]!.get(j)
      if (pPrime.prefix.sumOfOddItems + pPrime.prefix.sumOfEvenItems >= prefix.sumOfOddItems + prefix.sumOfEvenItems) {
        break;
      }
      if (prefix.sumOfEvenItems >= pPrime.prefix.sumOfEvenItems &&
        prefix.sumOfOddItems >= pPrime.prefix.sumOfOddItems &&
        (maxGap || (!maxGap && bitmap.getSupport() <= pPrime.support))
      ) {
        if ((patternType === "maximal" || bitmap.getSupport() === pPrime.support) &&
          strictlyContains(prefix, pPrime.prefix)) {
          removedPatternsNumber++
          maxPatterns[i]!.remove(j)
        }
      }
    }
  }
  return removedPatternsNumber
}
