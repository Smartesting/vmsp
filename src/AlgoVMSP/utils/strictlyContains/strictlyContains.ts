import PrefixVMSP from "../../PrefixVMSP/PrefixVMSP"

export default function strictlyContains(prefix1: PrefixVMSP, prefix2: PrefixVMSP) {
    let i = 0
    let j = 0
    while (true) {
        if (containsAll(prefix1.get(j).getItems(), prefix2.get(i).getItems())) {
            i++
            if (i == prefix2.nbrOfItemSets()) {
                return true
            }
        }
        j++;
        if (j >= prefix1.nbrOfItemSets()) {
            return false
        }
        if ((prefix1.nbrOfItemSets() - j) < prefix2.nbrOfItemSets() - i) {
            return false
        }
    }
}

function containsAll(arr: number[], target: number[]) {
    return target.every(v => arr.includes(v))
}
