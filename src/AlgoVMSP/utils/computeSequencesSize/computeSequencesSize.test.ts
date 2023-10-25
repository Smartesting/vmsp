import computeSequencesSize from "./computeSequencesSize"
import * as fs from "fs"

describe('computeSequencesSize', () => {
    const allFileContents = fs.readFileSync('data/dataVMSP_sequencesFromPaper.txt', 'utf8')
    const fileLines = allFileContents.split(/\r?\n/).filter((line) => line.length > 0)

    it('should compute the starting index of each sequence', () => {
        expect(computeSequencesSize(fileLines, [])).toStrictEqual({
            sequencesSize: [0, 5, 9, 13],
            lastBitIndex: 14
        })
    })

    it('should fill the horizontal database', () => {
        const inMemoryDB: number[][] = []
        computeSequencesSize(fileLines, inMemoryDB)
        expect(inMemoryDB).toEqual([
            [1, 2, -1, 3, -1, 6, 7, -1, 7, -1, 5, -1, -2],
            [1, 4, -1, 3, -1, 2, -1, 1, 2, 5, 6, -1, -2],
            [1, -1, 2, -1, 6, 7, -1, 5, -1, -2],
            [2, -1, 6, 7, -1, -2]
        ])
    })
})
