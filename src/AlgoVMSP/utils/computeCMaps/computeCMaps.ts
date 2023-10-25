import BitMap from "../../../collections/BitMap/BitMap"

export default function computeCMaps(verticalDB: Map<number, BitMap>,
                                       memoryDB: ReadonlyArray<number[]>,
                                       minsup: number,
                                       useLastPositionPruning = false): {
    coocMapEquals: Map<number, Map<number, number>>
    coocMapAfter: Map<number, Map<number, number>>
} {
    const coocMapEquals: Map<number, Map<number, number>> = new Map<number, Map<number, number>>()
    const coocMapAfter: Map<number, Map<number, number>> = new Map<number, Map<number, number>>()
    const lastItemPositionMap: Map<number, number> = new Map<number, number>()

    for (const transaction of memoryDB) {
        let itemSetCount = 0
        const alreadyProcessed: Set<number> = new Set<number>()
        const equalProcessed: Map<number, Set<number>> = new Map<number, Set<number>>()

        loopI:
            for (let i = 0; i < transaction.length; i++) {
                const itemI = transaction[i]
                if (!equalProcessed.has(itemI)) equalProcessed.set(itemI, new Set<number>())
                let equalSet = equalProcessed.get(itemI)

                if (!equalSet) throw new Error('equalSet is not set')

                if (itemI < 0) {
                    itemSetCount++
                    continue
                }

                if (useLastPositionPruning) {
                    let last = lastItemPositionMap.get(itemI)
                    if (!last || last < itemSetCount) lastItemPositionMap.set(itemI, itemSetCount)
                }

                const bitmapOfItemI: BitMap | undefined = verticalDB.get(itemI)
                if (!bitmapOfItemI || bitmapOfItemI.getSupport() < minsup) continue

                const alreadyProcessedB: Set<number> = new Set<number>()
                let sameItemSet = true

                for (let j = i + 1; j < transaction.length; j++) {
                    const itemJ = transaction[j]

                    if (itemJ < 0) {
                        sameItemSet = false
                        continue
                    }

                    const bitmapOfItemJ: BitMap | undefined = verticalDB.get(itemJ)
                    if (!bitmapOfItemJ || bitmapOfItemJ.getSupport() < minsup) continue

                    let map: Map<number, number> | undefined

                    if (sameItemSet) {
                        if (!equalSet.has(itemJ)) {
                            map = coocMapEquals.get(itemI)
                            if (!map) {
                                map = new Map<number, number>()
                                coocMapEquals.set(itemI, map)
                            }
                            const support = map.get(itemJ)
                            if (!support) map.set(itemJ, 1)
                            else map.set(itemJ, support + 1)

                            equalSet.add(itemJ)
                        }
                    } else if (!alreadyProcessedB.has(itemJ)) {
                        if (alreadyProcessed.has(itemI)) continue loopI

                        map = coocMapAfter.get(itemI)
                        if (!map) {
                            map = new Map<number, number>()
                            coocMapAfter.set(itemI, map)
                        }
                        const support = map.get(itemJ)
                        if (!support) map.set(itemJ, 1)
                        else map.set(itemJ, support + 1)

                        alreadyProcessedB.add(itemJ)
                    }
                }
                alreadyProcessed.add(itemI)
            }
    }
    return {coocMapEquals, coocMapAfter}
}
