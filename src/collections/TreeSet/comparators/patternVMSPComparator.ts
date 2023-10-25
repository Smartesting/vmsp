import PatternVMSP from "../../../AlgoVMSP/PatternVMSP/PatternVMSP"

export default function patternVMSPComparator(p1: PatternVMSP, p2: PatternVMSP): number {
    if (p1 === p2) return 0

    const result = p2.prefix.sumOfEvenItems! + p2.prefix.sumOfOddItems!
        - p1.prefix.sumOfEvenItems! - p1.prefix.sumOfOddItems!

    if(result === 0) return 1

    return result
}
