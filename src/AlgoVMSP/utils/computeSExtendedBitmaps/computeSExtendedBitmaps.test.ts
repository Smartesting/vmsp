import computeSExtendedBitmaps from "./computeSExtendedBitmaps"
import BitMap from "../../../collections/BitMap/BitMap"
import fs from "fs"
import computeSequencesSize from "../computeSequencesSize/computeSequencesSize"
import computeVerticalDB from "../computeVerticalDB/computeVerticalDB"
import computeFrequentItems from "../computeFrequentItems/computeFrequentItems"
import computeCMaps from "../computeCMaps/computeCMaps"

describe('computeSExtendedBitmaps', () => {
    const allFileContents = fs.readFileSync('data/dataVMSP_sequencesFromPaper.txt', 'utf8')
    const fileLines = allFileContents.split(/\r?\n/).filter((line) => line.length > 0)
    let sequencesSize: number[]
    let lastBitIndex: number
    let verticalDB: Map<number, BitMap>
    const minSup = 2
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

    it('should return a bitmap for each s-extension', () => {
        const item = 1
        const maxGap = 2
        const sExtendedBitmaps = computeSExtendedBitmaps(frequentItems, verticalDB.get(item)!, CMaps.coocMapAfter.get(item), verticalDB, sequencesSize, minSup, maxGap, true)
        // 1 is followed by 2 at index 7 and 10 (taking into account maxGap)
        expect(sExtendedBitmaps.sTemp[0]).toEqual(2)
        expect(sExtendedBitmaps.sTempBitmaps[0].getBitSet().toArray()).toEqual([7, 10])
        // 1 is followed by 3 at index 1 and 6 (taking into account maxGap)
        expect(sExtendedBitmaps.sTemp[1]).toEqual(3)
        expect(sExtendedBitmaps.sTempBitmaps[1].getBitSet().toArray()).toEqual([1, 6])
        // 1 is not followed by 5 (taking into account maxGap)
        expect(sExtendedBitmaps.sTemp[2]).toEqual(5)
        expect(sExtendedBitmaps.sTempBitmaps[2].getBitSet().toArray()).toEqual([])
        // 1 is followed by 6 at index 2 and 11 (taking into account maxGap)
        expect(sExtendedBitmaps.sTemp[3]).toEqual(6)
        expect(sExtendedBitmaps.sTempBitmaps[3].getBitSet().toArray()).toEqual([2, 11])
        // 1 is followed by 7 at index 2 and 11 (taking into account maxGap)
        expect(sExtendedBitmaps.sTemp[4]).toEqual(7)
        expect(sExtendedBitmaps.sTempBitmaps[4].getBitSet().toArray()).toEqual([2, 11])
    })

    it('should respect specified maxGap', () => {
        const item = 1
        const maxGap = 1
        const sExtendedBitmaps = computeSExtendedBitmaps(frequentItems, verticalDB.get(item)!, CMaps.coocMapAfter.get(item), verticalDB, sequencesSize, minSup, maxGap, true)
        // 1 is directly followed by 2 at index 10
        expect(sExtendedBitmaps.sTemp[0]).toEqual(2)
        expect(sExtendedBitmaps.sTempBitmaps[0].getBitSet().toArray()).toEqual([10])
        // 1 is directly followed by 3 at index 1 and 6
        expect(sExtendedBitmaps.sTemp[1]).toEqual(3)
        expect(sExtendedBitmaps.sTempBitmaps[1].getBitSet().toArray()).toEqual([1, 6])
        // 1 is not directly followed by 5
        expect(sExtendedBitmaps.sTemp[2]).toEqual(5)
        expect(sExtendedBitmaps.sTempBitmaps[2].getBitSet().toArray()).toEqual([])
        // 1 is not directly followed by 6
        expect(sExtendedBitmaps.sTemp[3]).toEqual(6)
        expect(sExtendedBitmaps.sTempBitmaps[3].getBitSet().toArray()).toEqual([])
        // 1 is not directly followed by 7
        expect(sExtendedBitmaps.sTemp[4]).toEqual(7)
        expect(sExtendedBitmaps.sTempBitmaps[4].getBitSet().toArray()).toEqual([])
    })
})
