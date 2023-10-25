import BitMap from "../../../collections/BitMap/BitMap"

export default function computeSExtendedBitmaps(sn: number[],
                                                prefixBitmap: BitMap,
                                                mapSupportItemsAfter: Map<number, number> | undefined,
                                                verticalDB: Map<number, BitMap>,
                                                sequencesSize: number[],
                                                minSup: number,
                                                maxGap: number|undefined,
                                                useCMAPPruning: boolean) {
    const sTemp: number[] = []
    const sTempBitmaps: BitMap[] = []
    for (const i of sn) {
        if (useCMAPPruning) {
            if (!mapSupportItemsAfter) {
                continue
            }
            const support = mapSupportItemsAfter.get(i)
            if (!support || support < minSup) {
                continue
            }
        }

        BitMap.INTERSECTION_COUNT++
        const newBitmap = prefixBitmap.createNewBitmapSStep(verticalDB.get(i)!, sequencesSize!, maxGap)
        if (newBitmap.getSupportWithoutGapTotal() >= minSup) {
            sTemp.push(i)
            sTempBitmaps.push(newBitmap)
        }
    }
    return {sTemp, sTempBitmaps}
}
