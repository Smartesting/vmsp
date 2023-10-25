import computeSequencesSize from "../computeSequencesSize/computeSequencesSize"
import * as fs from "fs"
import sortFrequentItems from "./sortFrequentItems"
import computeFrequentItems from "../computeFrequentItems/computeFrequentItems"
import computeVerticalDB from "../computeVerticalDB/computeVerticalDB"

describe('sortFrequentItems', () => {
    const allFileContents = fs.readFileSync('data/dataVMSP_sequencesFromPaper.txt', 'utf8')
    const fileLines = allFileContents.split(/\r?\n/).filter((line) => line.length > 0)
    const {sequencesSize, lastBitIndex} = computeSequencesSize(fileLines, [])
    const verticalDB = computeVerticalDB(fileLines, sequencesSize, lastBitIndex)
    const frequentItems = computeFrequentItems(verticalDB, 3)

    it('should sort frequent items by descending support', () => {
        expect(frequentItems).toEqual([1, 2, 5, 6, 7])
        sortFrequentItems(frequentItems, verticalDB)
        expect(frequentItems).toEqual([1, 5, 7, 2, 6])
        expect(verticalDB.get(1)!.getSupport() > verticalDB.get(7)!.getSupport())
    })
})
