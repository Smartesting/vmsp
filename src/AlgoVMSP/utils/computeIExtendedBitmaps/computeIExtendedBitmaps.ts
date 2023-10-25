import BitMap from "../../../collections/BitMap/BitMap"

export default function computeIExtendedBitmaps(_in: number[],
                                                prefixBitmap: BitMap,
                                                mapSupportItemsEquals: Map<number, number> | undefined,
                                                verticalDB: Map<number, BitMap>,
                                                sequencesSize: number[],
                                                hasToBeGreaterThanForIStep: number,
                                                minSup: number,
                                                useCMAPPruning: boolean) {
    const iTemp: number[] = []
    const iTempBitmaps: BitMap[] = []
    for (const i of _in) {
        if (i > hasToBeGreaterThanForIStep) {
            if (useCMAPPruning) {
                if (!mapSupportItemsEquals) {
                    continue
                }
                const support = mapSupportItemsEquals.get(i);
                if (support == null || support < minSup) {
                    continue
                }
            }

            BitMap.INTERSECTION_COUNT++
            const newBitmap = prefixBitmap.createNewBitmapIStep(verticalDB.get(i)!, sequencesSize)
            if (newBitmap.getSupport() >= minSup) {
                iTemp.push(i)
                iTempBitmaps.push(newBitmap)
            }
        }
    }
    return {iTemp, iTempBitmaps}
}
