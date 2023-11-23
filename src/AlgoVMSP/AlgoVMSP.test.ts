import AlgoVMSP, { VMSPOptions } from "./AlgoVMSP"


describe('Maximal patterns', () => {
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

describe('Closed patterns', () => {
  it('returns the expected patterns - prefixSpan dataset', () => {
    const options: VMSPOptions = {
      minPatternLength: 1,
      maxPatternLength: 8,
      patternType: 'closed'
    }
    const minsup = 0.5
    const algo: AlgoVMSP = new AlgoVMSP(options)
    const [patterns, intersections, executionTime] =
      algo.runFromSpmfFile('data/prefixSpan.txt', minsup)
    let cpt = 0
    expect(patterns.length).toStrictEqual(17)
    expect(intersections).toStrictEqual(121)
    expect(patterns[0].support).toBe(4)
    expect(patterns[1].support).toBe(4)
    expect(patterns[2].support).toBe(3)
    expect(patterns[3].support).toBe(3)
    expect(patterns[4].support).toBe(3)
    expect(patterns[5].support).toBe(3)
    expect(patterns[6].support).toBe(3)
    expect(patterns[7].support).toBe(3)
    expect(patterns[8].support).toBe(2)
    expect(patterns[9].support).toBe(2)
    expect(patterns[10].support).toBe(2)
    expect(patterns[11].support).toBe(2)
    expect(patterns[12].support).toBe(2)
    expect(patterns[13].support).toBe(2)
    expect(patterns[14].support).toBe(2)
    expect(patterns[15].support).toBe(2)
    expect(patterns[16].support).toBe(2)
    expect(patterns[0].itemSets).toStrictEqual([[1], [3]])
    expect(patterns[1].itemSets).toStrictEqual([[1], [2]])
    expect(patterns[2].itemSets).toStrictEqual([[6]])
    expect(patterns[3].itemSets).toStrictEqual([[5]])
    expect(patterns[4].itemSets).toStrictEqual([[4], [3]])
    expect(patterns[5].itemSets).toStrictEqual([[2], [3]])
    expect(patterns[6].itemSets).toStrictEqual([[1], [3], [3]])
    expect(patterns[7].itemSets).toStrictEqual([[1], [3], [2]])
    expect(patterns[8].itemSets).toStrictEqual([[6], [2], [3]])
    expect(patterns[9].itemSets).toStrictEqual([[5], [2], [3]])
    expect(patterns[10].itemSets).toStrictEqual([[4], [3], [2]])
    expect(patterns[11].itemSets).toStrictEqual([[1, 2], [6]])
    expect(patterns[12].itemSets).toStrictEqual([[1], [2], [3]])
    expect(patterns[13].itemSets).toStrictEqual([[5], [6], [3], [2]])
    expect(patterns[14].itemSets).toStrictEqual([[5], [1], [3], [2]])
    expect(patterns[15].itemSets).toStrictEqual([[1, 2], [4], [3]])
    expect(patterns[16].itemSets).toStrictEqual([[1], [2, 3], [1]])
  })

  it('returns the expected patterns - dataset from the VMSP article', () => {
    const options: VMSPOptions = {
      patternType: 'closed',
      minPatternLength: 1,
      maxPatternLength: 5,
      debug: true
    }
    const minsup = 0.3
    const algo = new AlgoVMSP(options)
    const [patterns, intersections, executionTime] =
      algo.runFromSpmfFile('data/dataVMSP_sequencesFromPaper.txt', minsup)
    let cpt = 0
    expect(intersections).toStrictEqual(34)
    expect(patterns.length).toStrictEqual(12)
    expect(patterns[0].support).toBe(4)
    expect(patterns[1].support).toBe(3)
    expect(patterns[2].support).toBe(3)
    expect(patterns[3].support).toBe(3)
    expect(patterns[4].support).toBe(3)
    expect(patterns[5].support).toBe(2)
    expect(patterns[6].support).toBe(2)
    expect(patterns[7].support).toBe(2)
    expect(patterns[8].support).toBe(2)
    expect(patterns[9].support).toBe(2)
    expect(patterns[10].support).toBe(2)
    expect(patterns[11].support).toBe(2)
    expect(patterns[0].itemSets).toStrictEqual([[2], [6]])
    expect(patterns[1].itemSets).toStrictEqual([[2], [5]])
    expect(patterns[2].itemSets).toStrictEqual([[1], [6]])
    expect(patterns[3].itemSets).toStrictEqual([[1], [5]])
    expect(patterns[4].itemSets).toStrictEqual([[2], [6, 7]])
    expect(patterns[5].itemSets).toStrictEqual([[1, 2]])
    expect(patterns[6].itemSets).toStrictEqual([[1], [3], [6]])
    expect(patterns[7].itemSets).toStrictEqual([[1], [2], [6]])
    expect(patterns[8].itemSets).toStrictEqual([[1], [3], [5]])
    expect(patterns[9].itemSets).toStrictEqual([[1], [2], [5]])
    expect(patterns[10].itemSets).toStrictEqual([[2], [6, 7], [5]])
    expect(patterns[11].itemSets).toStrictEqual([[1], [6, 7], [5]])
  })

  it('stops at execution time threshold and returns the obtains patterns so far', () => {
    const options: VMSPOptions = {
      minPatternLength: 1,
      maxPatternLength: 8,
      patternType: "closed",
      executionTimeThresholdInSeconds: 2
    }
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
})
