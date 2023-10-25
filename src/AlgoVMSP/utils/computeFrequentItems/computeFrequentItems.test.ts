import computeSequencesSize from "../computeSequencesSize/computeSequencesSize"
import * as fs from "fs"
import computeVerticalDB from "../computeVerticalDB/computeVerticalDB"
import BitMap from "../../../collections/BitMap/BitMap"
import computeFrequentItems from "./computeFrequentItems"

describe('computeFrequentItems', () => {
    const allFileContents = fs.readFileSync('data/dataVMSP_sequencesFromPaper.txt', 'utf8')
    const fileLines = allFileContents.split(/\r?\n/).filter((line) => line.length > 0)
    const {sequencesSize, lastBitIndex} = computeSequencesSize(fileLines, [])

    it('should return items with support greater than or equal to that specified', () => {
        const verticalDB: Map<number, BitMap> = computeVerticalDB(fileLines, sequencesSize, lastBitIndex)
        expect(computeFrequentItems(verticalDB, 3)).toEqual([1, 2, 5, 6, 7])
        expect(computeFrequentItems(verticalDB, 4)).toEqual([2, 6])
    })

    it('should remove items with support less than specified from vertical database', () => {
        const verticalDB: Map<number, BitMap> = computeVerticalDB(fileLines, sequencesSize, lastBitIndex)
        expect(verticalDB.size).toEqual(7)
        expect(computeFrequentItems(verticalDB, 4)).toEqual([2, 6])
        expect(verticalDB.size).toEqual(2)
    })
})
