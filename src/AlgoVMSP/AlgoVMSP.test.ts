import AlgoVMSP, { VMSPOptions } from "./AlgoVMSP"


describe('Functional Tests', () => {
  it('returns the expected patterns - dataset from Java Implem', () => {
    const options: VMSPOptions = {
      maxGap: 1,
      minPatternLength: 1,
      maxPatternLength: 8
    }
    const minsup = 0.8
    const [patterns, intersections, executionTime] =
      new AlgoVMSP(options).runFromSpmfFile('data/dataVMSP.txt', minsup)
    expect(intersections).toStrictEqual(117)
    expect(patterns.length).toStrictEqual(5)
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
    const options: VMSPOptions = {
      maxGap: 3,
      minPatternLength: 1,
      maxPatternLength: 3
    }
    const minsup = 0.3
    const algo = new AlgoVMSP(options)
    const [patterns, intersections, executionTime] =
      algo.runFromSpmfFile('data/dataVMSP_sequencesFromPaper.txt', minsup)
    for (const pattern of patterns) {
      console.log(JSON.stringify(pattern))
    }
    expect(intersections).toStrictEqual(34)
    expect(patterns.length).toStrictEqual(7)
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

  it('stops at execution time threshold and returns the obtains patterns so far', () => {
    const options: VMSPOptions = {
      minPatternLength: 1,
      maxPatternLength: 8,
      executionTimeThresholdInSeconds: 2
    }
    const maximumPatternLength = 8
    const minsup = 0.002
    const algo = new AlgoVMSP(options)
    const startTime = Date.now()
    const [patterns, intersections, executionTime] =
      algo.runFromSpmfFile('data/dataVMSP_large.txt', minsup)
    const endTime = Date.now() - startTime
    console.log("Execution time: " + endTime)
    console.log("Nbr of Patterns: " + patterns.length)
    expect(endTime).toBeGreaterThan(2000)
    expect(endTime).toBeLessThan(4300)
  })

  it.skip('long sessions', () => {
    const options: VMSPOptions = {
      maxPatternLength: 8,
      executionTimeThresholdInSeconds: 4
    }
    const maximumPatternLength = 8
    const minsup = 0.001
    const algo = new AlgoVMSP(options)
    const startTime = Date.now()
    const [patterns, intersections, executionTime] =
      algo.runFromSpmfFile('data/long_sessions.txt', minsup)
    const endTime = Date.now() - startTime
    console.log("Execution time: " + endTime)
    console.log("Nbr of Patterns: " + patterns.length)
    expect(endTime).toBeGreaterThan(4000)
    expect(endTime).toBeLessThan(6500)
  })
})
