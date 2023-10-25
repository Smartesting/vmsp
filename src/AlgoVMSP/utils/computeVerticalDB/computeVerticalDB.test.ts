import computeSequencesSize from "../computeSequencesSize/computeSequencesSize"
import * as fs from "fs"
import computeVerticalDB from "./computeVerticalDB"
import BitMap from "../../../collections/BitMap/BitMap"

describe('computeVerticalDB', () => {
    const allFileContents = fs.readFileSync('data/dataVMSP_sequencesFromPaper.txt', 'utf8')
    const fileLines = allFileContents.split(/\r?\n/).filter((line) => line.length > 0)
    const {sequencesSize, lastBitIndex} = computeSequencesSize(fileLines, [])

    it('should compute the different index of each item', () => {
        const verticalDB: Map<number, BitMap> = computeVerticalDB(fileLines, sequencesSize, lastBitIndex)
        //index of item 1
        expect(verticalDB.get(1)!.getBitSet().toArray()).toEqual([0, 5, 8, 9])
        //index of item 2
        expect(verticalDB.get(2)!.getBitSet().toArray()).toEqual([0, 7, 8, 10, 13])
    })

    it('should return a map sorted from smallest to bigger item', () => {
        const verticalDB: Map<number, BitMap> = computeVerticalDB(fileLines, sequencesSize, lastBitIndex)
        expect(Array.from(verticalDB.keys())).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
})
