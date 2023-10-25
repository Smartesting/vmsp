import computeCMaps from "./computeCMaps";
import computeVerticalDB from "../computeVerticalDB/computeVerticalDB";
import computeSequencesSize from "../computeSequencesSize/computeSequencesSize";
import BitMap from "../../../collections/BitMap/BitMap";
import assert from "assert";

describe('computeCMaps', () => {
    let inMemoryDB: number[][]
    let verticalDB: Map<number, BitMap>
    let minsup: number
    let sequences: string [] = [
        '1 2 -1 3 -1 6 7 -1 7 -1 5 -1 -2',
        '1 4 -1 3 -1 2 -1 1 2 5 6 -1 -2',
        '1 -1 2 -1 6 7 -1 5 -1 -2',
        '2 -1 6 7 -1 -2'
    ]

    beforeEach(() => {
        inMemoryDB = [];
        const result = computeSequencesSize(sequences, inMemoryDB)
        verticalDB = computeVerticalDB(sequences, result.sequencesSize, result.lastBitIndex)
        minsup = Math.ceil((0.5 * result.sequencesSize.length))
    })

    it('computes c-Map-I from the article sequence example', () => {
        const {coocMapEquals} = computeCMaps(verticalDB, inMemoryDB, minsup)

        expect(coocMapEquals.size).toEqual(4)

        let cMapI1 = coocMapEquals.get(1);
        assert(cMapI1)
        expect(cMapI1).toBeDefined()
        expect(cMapI1.size).toEqual(3)
        expect(cMapI1.get(2)).toEqual(2)
        expect(cMapI1.get(5)).toEqual(1)
        expect(cMapI1.get(6)).toEqual(1)

        let cMapI2 = coocMapEquals.get(2);
        assert(cMapI2)
        expect(cMapI2.size).toEqual(2)
        expect(cMapI2.get(5)).toEqual(1)
        expect(cMapI2.get(6)).toEqual(1)

        let cMapI5 = coocMapEquals.get(5);
        assert(cMapI5)
        expect(cMapI5.size).toEqual(1)
        expect(cMapI5.get(6)).toEqual(1)

        let CMapI6 = coocMapEquals.get(6);
        assert(CMapI6)
        expect(CMapI6.size).toEqual(1)
        expect(CMapI6.get(7)).toEqual(3)
    })

    it('computes c-Map-S from the article sequence example', () => {
        const {coocMapAfter} = computeCMaps(verticalDB, inMemoryDB, minsup)

        expect(coocMapAfter.size).toEqual(5)

        let cMapS1 = coocMapAfter.get(1);
        assert(cMapS1)
        expect(cMapS1.size).toEqual(6)
        expect(cMapS1.get(1)).toEqual(1)
        expect(cMapS1.get(2)).toEqual(2)
        expect(cMapS1.get(3)).toEqual(2)
        expect(cMapS1.get(5)).toEqual(3)
        expect(cMapS1.get(6)).toEqual(3)
        expect(cMapS1.get(7)).toEqual(2)

        let cMapS2 = coocMapAfter.get(2);
        assert(cMapS2)
        expect(cMapS2.size).toEqual(6)
        expect(cMapS2.get(1)).toEqual(1)
        expect(cMapS2.get(2)).toEqual(1)
        expect(cMapS2.get(3)).toEqual(1)
        expect(cMapS2.get(5)).toEqual(3)
        expect(cMapS2.get(6)).toEqual(4)
        expect(cMapS2.get(7)).toEqual(3)

        let cMapS3 = coocMapAfter.get(3);
        assert(cMapS3)
        expect(cMapS3.size).toEqual(5)
        expect(cMapS3.get(1)).toEqual(1)
        expect(cMapS3.get(2)).toEqual(1)
        expect(cMapS3.get(5)).toEqual(2)
        expect(cMapS3.get(6)).toEqual(2)
        expect(cMapS3.get(7)).toEqual(1)

        let CMapS6 = coocMapAfter.get(6);
        assert(CMapS6)
        expect(CMapS6.size).toEqual(2)
        expect(CMapS6.get(5)).toEqual(2)
        expect(CMapS6.get(7)).toEqual(1)

        let CMapS7 = coocMapAfter.get(7);
        assert(CMapS7)
        expect(CMapS7.size).toEqual(2)
        expect(CMapS7.get(5)).toEqual(2)
        expect(CMapS7.get(7)).toEqual(1)
    })
})
