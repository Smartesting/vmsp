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

  // it.skip('returns the expected patterns - Gravity Femto dataset - 1 item per itemset ', () => {
  //   const maxGap = 5
  //   const maximumPatternLength = 8
  //   const minsup = 0.12
  //   const algo = new AlgoVMSP(maxGap, 1, maximumPatternLength)
  //   const [maxPatterns, intersections, patternCount] =
  //     algo.runFromSpmfFile('data/dataVMSP_gravity_femto_size1itemsets.txt', minsup)
  //   algo.printResult()
  //   expect(intersections).toStrictEqual(207)
  //   expect(patternCount).toStrictEqual(16)
  //   expect(maxPatterns[1]!['elements'].length).toStrictEqual(4)
  //   let obtainedPatterns: String[] = new Array(4)
  //   for (let i = 0; i < 4; i++) {
  //     obtainedPatterns[i] = maxPatterns[1]!['elements'][i].prefix.toString()
  //   }
  //   let expectedPatterns: string[] = ['42 -1 ',
  //     '37 -1 ',
  //     '22 -1 ',
  //     '12 -1 ']
  //   expect(maxPatterns[2]!['elements'].length).toStrictEqual(0)
  //
  //   expect(maxPatterns[3]!['elements'].length).toStrictEqual(3)
  //   obtainedPatterns = new Array(3)
  //   for (var i = 0; i < 3; i++) {
  //     obtainedPatterns[i] = maxPatterns[3]!['elements'][i].prefix.toString()
  //   }
  //   expectedPatterns = ['45 -1 46 -1 36 -1 ',
  //     '8 -1 46 -1 10 -1 ',
  //     '18 -1 19 -1 2 -1 ']
  //   expect(expectedPatterns.sort()).toEqual(obtainedPatterns.sort())
  //
  //   expect(maxPatterns[4]!['elements'].length).toStrictEqual(5)
  //   obtainedPatterns = new Array(5)
  //   for (var i = 0; i < 5; i++) {
  //     obtainedPatterns[i] = maxPatterns[4]!['elements'][i].prefix.toString()
  //   }
  //   expectedPatterns = ['45 -1 46 -1 10 -1 47 -1 ',
  //     '45 -1 46 -1 1 -1 47 -1 ',
  //     '45 -1 46 -1 10 -1 36 -1 ',
  //     '8 -1 45 -1 46 -1 10 -1 ',
  //     '8 -1 46 -1 1 -1 10 -1 ']
  //   expect(expectedPatterns.sort()).toEqual(obtainedPatterns.sort())
  //
  //   expect(maxPatterns[5]!['elements'].length).toStrictEqual(3)
  //   obtainedPatterns = new Array(3)
  //   for (var i = 0; i < 3; i++) {
  //     obtainedPatterns[i] = maxPatterns[5]!['elements'][i].prefix.toString()
  //   }
  //   expectedPatterns = ['45 -1 46 -1 1 -1 10 -1 47 -1 ',
  //     '45 -1 46 -1 1 -1 10 -1 36 -1 ',
  //     '8 -1 45 -1 46 -1 1 -1 10 -1 ']
  //   expect(expectedPatterns.sort()).toEqual(obtainedPatterns.sort())
  //
  //   expect(maxPatterns[6]!['elements'].length).toStrictEqual(1)
  //   expect(maxPatterns[6]!['elements'][0].prefix.toString()).toEqual('45 -1 46 -1 45 -1 1 -1 10 -1 1 -1 ')
  // })
  //
  // it.skip('returns the expected patterns - Gravity Femto dataset - web page itemsets', () => {
  //   const maxGap = 5
  //   const minimumPatternLength = 3
  //   const maximumPatternLength = 8
  //   const minsup = 0.12
  //   const algo = new AlgoVMSP(maxGap, minimumPatternLength, maximumPatternLength)
  //   const [maxPatterns, intersections, patternCount] =
  //     algo.runFromSpmfFile('data/dataVMSP_gravity_femto_webpageitemsets.txt', minsup)
  //   algo.printResult()
  //   expect(intersections).toStrictEqual(76)
  //   expect(patternCount).toStrictEqual(11)
  //   expect(maxPatterns[1]!['elements'].length).toStrictEqual(4)
  //   let obtainedPatterns: String[] = new Array(4)
  //   for (let i = 0; i < 4; i++) {
  //     obtainedPatterns[i] = maxPatterns[1]!['elements'][i].prefix.toString()
  //   }
  //   let expectedPatterns: string[] = ['42 -1 ',
  //     '22 -1 ',
  //     '19 -1 ',
  //     '12 -1 ']
  //
  //   expect(maxPatterns[2]!['elements'].length).toStrictEqual(1)
  //   expect(maxPatterns[2]!['elements'][0].prefix.toString()).toEqual('18 -1 1 -1 ')
  //
  //   expect(maxPatterns[3]!['elements'].length).toStrictEqual(2)
  //   obtainedPatterns = new Array(2)
  //   for (var i = 0; i < 2; i++) {
  //     obtainedPatterns[i] = maxPatterns[3]!['elements'][i].prefix.toString()
  //   }
  //   expectedPatterns = ['1 10 37 -1 ',
  //     '2 18 19 -1 ']
  //   expect(expectedPatterns.sort()).toEqual(obtainedPatterns.sort())
  //
  //   expect(maxPatterns[4]!['elements'].length).toStrictEqual(1)
  //   expect(maxPatterns[4]!['elements'][0].prefix.toString()).toEqual('1 10 36 47 -1 ')
  //
  //   expect(maxPatterns[5]!['elements'].length).toStrictEqual(3)
  //   obtainedPatterns = new Array(2)
  //   for (var i = 0; i < 2; i++) {
  //     obtainedPatterns[i] = maxPatterns[5]!['elements'][i].prefix.toString()
  //   }
  //   expectedPatterns = ['1 10 45 46 47 -1 ',
  //     '1 10 36 45 46 -1 ']
  //   expect(expectedPatterns.sort()).toEqual(obtainedPatterns.sort())
  //
  //   expect(maxPatterns[6]!['elements'].length).toStrictEqual(1)
  //   expect(maxPatterns[6]!['elements'][0].prefix.toString()).toEqual('8 -1 1 10 45 46 -1 ')
  // })
})
