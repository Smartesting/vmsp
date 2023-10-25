import AlgoVMSP from "./AlgoVMSP"


describe('Functional Tests', () => {
  it('returns the expected patterns - dataset from Java Implem', () => {
    const maxGap = 1
    const maximumPatternLength = 8
    const minsup = 0.8
    const [patterns, intersections, patternCount] =
      new AlgoVMSP(maxGap, 1, maximumPatternLength).runFromSpmfFile('data/dataVMSP.txt', minsup)
    expect(intersections).toStrictEqual(117)
    expect(patternCount).toStrictEqual(5)
    expect(patterns[0].support).toBe(9)
    expect(patterns[1].support).toBe(8)
    expect(patterns[2].support).toBe(8)
    expect(patterns[3].support).toBe(8)
    expect(patterns[4].support).toBe(8)
    expect(patterns[0].itemSets).toStrictEqual([[2464358], [2552547], [2552548]])
    expect(patterns[1].itemSets).toStrictEqual([[2552552]])
    expect(patterns[2].itemSets).toStrictEqual([[2552567], [2464548]])
    expect(patterns[3].itemSets).toStrictEqual([[2464608], [2464609], [2556015]])
    expect(patterns[4].itemSets).toStrictEqual([[2464503], [2464505], [2552507]])
  })

  it('returns the expected patterns - dataset from the article', () => {
    const maxGap = 3
    const maximumPatternLength = 3
    const minsup = 0.3
    const algo = new AlgoVMSP(maxGap, 1, maximumPatternLength)
    const [patterns, intersections, patternCount] =
      algo.runFromSpmfFile('data/dataVMSP_sequencesFromPaper.txt', minsup)
    for (const pattern of patterns) {
      console.log(JSON.stringify(pattern))
    }
    expect(intersections).toStrictEqual(34)
    expect(patternCount).toStrictEqual(7)
    expect(patterns[0].support).toBe(2)
    expect(patterns[1].support).toBe(2)
    expect(patterns[2].support).toBe(2)
    expect(patterns[3].support).toBe(2)
    expect(patterns[4].support).toBe(2)
    expect(patterns[5].support).toBe(2)
    expect(patterns[6].support).toBe(2)
    expect(patterns[0].itemSets).toStrictEqual([[1, 2]])
    expect(patterns[1].itemSets).toStrictEqual([[1], [3], [6]])
    expect(patterns[2].itemSets).toStrictEqual([[1], [2], [6]])
    expect(patterns[3].itemSets).toStrictEqual([[1], [3], [5]])
    expect(patterns[4].itemSets).toStrictEqual([[1], [2], [5]])
    expect(patterns[5].itemSets).toStrictEqual([[2], [6, 7], [5]])
    expect(patterns[6].itemSets).toStrictEqual([[1], [6, 7], [5]])
  })
})
