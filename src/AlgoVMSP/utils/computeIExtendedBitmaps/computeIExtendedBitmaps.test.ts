import BitMap from "../../../collections/BitMap/BitMap"
import fs from "fs"
import computeSequencesSize from "../computeSequencesSize/computeSequencesSize"
import computeVerticalDB from "../computeVerticalDB/computeVerticalDB"
import computeFrequentItems from "../computeFrequentItems/computeFrequentItems"
import computeCMaps from "../computeCMaps/computeCMaps"
import computeIExtendedBitmaps from "./computeIExtendedBitmaps"

describe('computeIExtendedBitmaps', () => {
    const allFileContents = fs.readFileSync('data/dataVMSP_sequencesFromPaper.txt', 'utf8')
    const fileLines = allFileContents.split(/\r?\n/).filter((line) => line.length > 0)
    let sequencesSize: number[]
    let lastBitIndex: number
    let verticalDB: Map<number, BitMap>
    const minSup = 1
    let frequentItems: number[]
    let CMaps: { coocMapEquals: Map<number, Map<number, number>>, coocMapAfter: Map<number, Map<number, number>> }

    beforeEach(() => {
        const inMemoryDB: number[][] = []
        const res = computeSequencesSize(fileLines, inMemoryDB)
        sequencesSize = res.sequencesSize
        lastBitIndex = res.lastBitIndex
        verticalDB = computeVerticalDB(fileLines, sequencesSize, lastBitIndex)
        frequentItems = computeFrequentItems(verticalDB, minSup)
        CMaps = computeCMaps(verticalDB, inMemoryDB, minSup)
    })

    it('should return a bitmap for each i-extension', () => {
        const item = 1
        const sExtendedBitmaps = computeIExtendedBitmaps(frequentItems, verticalDB.get(item)!, CMaps.coocMapEquals.get(item), verticalDB, sequencesSize, item, minSup, true)
        // 1 is followed by 2 in the same item set at index 0 and 8
        expect(sExtendedBitmaps.iTemp[0]).toEqual(2)
        expect(sExtendedBitmaps.iTempBitmaps[0].getBitSet().toArray()).toEqual([0, 8])
        // 1 is followed by 4 in the same item set at index 5
        expect(sExtendedBitmaps.iTemp[1]).toEqual(4)
        expect(sExtendedBitmaps.iTempBitmaps[1].getBitSet().toArray()).toEqual([5])
        // 1 is followed by 5 in the same item set at index 8
        expect(sExtendedBitmaps.iTemp[2]).toEqual(5)
        expect(sExtendedBitmaps.iTempBitmaps[2].getBitSet().toArray()).toEqual([8])
        // 1 is followed by 6 in the same item set at index 8
        expect(sExtendedBitmaps.iTemp[3]).toEqual(6)
        expect(sExtendedBitmaps.iTempBitmaps[3].getBitSet().toArray()).toEqual([8])
    })

    it('should respect specified hasToBeGreaterThanForIStep', () => {
        const item = 1
        const hasToBeGreaterThanForIStep = 4
        const sExtendedBitmaps = computeIExtendedBitmaps(frequentItems, verticalDB.get(item)!, CMaps.coocMapEquals.get(item), verticalDB, sequencesSize, hasToBeGreaterThanForIStep, minSup, true)
        // 1 is followed by 5 in the same item set at index 8
        expect(sExtendedBitmaps.iTemp[0]).toEqual(5)
        expect(sExtendedBitmaps.iTempBitmaps[0].getBitSet().toArray()).toEqual([8])
        // 1 is followed by 6 in the same item set at index 8
        expect(sExtendedBitmaps.iTemp[1]).toEqual(6)
        expect(sExtendedBitmaps.iTempBitmaps[1].getBitSet().toArray()).toEqual([8])
    })
})
