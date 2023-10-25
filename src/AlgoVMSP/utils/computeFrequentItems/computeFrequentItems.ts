import BitMap from "../../../collections/BitMap/BitMap"

export default function computeFrequentItems(verticalDB: Map<number, BitMap>, minsup: number) {
    const frequentItems: number [] = []

    verticalDB.forEach((bs, item) => {
        if (bs.getSupport() < minsup) {
            verticalDB.delete(item)
        } else {
            frequentItems.push(item)
        }
    })

    return frequentItems
}
