import PrefixVMSP from "./PrefixVMSP/PrefixVMSP"
import BitMap from "../collections/BitMap/BitMap"
import ItemSet from "./ItemSet/ItemSet"
import TreeSet from "../collections/TreeSet/TreeSet"
import PatternVMSP from "./PatternVMSP/PatternVMSP"
import patternVMSPComparator from "../collections/TreeSet/comparators/patternVMSPComparator"
import fs from "fs"
import computeSequencesSize from "./utils/computeSequencesSize/computeSequencesSize"
import computeFrequentItems from "./utils/computeFrequentItems/computeFrequentItems"
import sortFrequentItems from "./utils/sortFrequentItems/sortFrequentItems"
import computeVerticalDB from "./utils/computeVerticalDB/computeVerticalDB"
import computeCMaps from "./utils/computeCMaps/computeCMaps"
import checkIfItemShouldBeSaved from "./utils/checkIfItemShouldBeSaved/checkIfItemShouldBeSaved"
import checkIfItemsShouldBeSaved from "./utils/checkIfItemsShouldBeSaved/checkIfItemsShouldBeSaved"
import removeSavedPatternsContainedByNewItems
  from "./utils/removeSavedPatternsContainedByNewItems/removeSavedPatternsContainedByNewItems"
import computeSExtendedBitmaps from "./utils/computeSExtendedBitmaps/computeSExtendedBitmaps"
import computeIExtendedBitmaps from "./utils/computeIExtendedBitmaps/computeIExtendedBitmaps"
import { generateSessionBitmap } from "./utils/generateSessionBitMap"

export default class AlgoVMSP {
  private verticalDB
  private coocMapEquals: Map<number, Map<number, number>>
  private coocMapAfter: Map<number, Map<number, number>>
  private useCMAPPruning
  private minSup
  private sequencesSize: number[]
  private nbrSequences: number
  private lastBitIndex
  private useStrategyForwardExtensionChecking
  private patternCount: number
  private maxPatterns: (TreeSet<PatternVMSP> | null)[]
  private executionFlag: ExecutionFlag

  constructor(private readonly maxGap: number | undefined = undefined,
    private readonly minimumPatternLength = 3,
    private readonly maximumPatternLength = 8,
    private readonly outputSequenceIdentifiers = false,
    private readonly executionTimeThresholdInSeconds = 10,
    private readonly debug = false) {
    this.verticalDB = new Map<number, BitMap>()
    this.coocMapEquals = new Map<number, Map<number, number>>()
    this.coocMapAfter = new Map<number, Map<number, number>>()
    this.useCMAPPruning = true
    this.minSup = 0
    this.sequencesSize = []
    this.nbrSequences = 0
    this.lastBitIndex = 0
    this.useStrategyForwardExtensionChecking = true
    this.patternCount = 0
    this.maxPatterns = []
    this.executionFlag = new ExecutionFlag(executionTimeThresholdInSeconds)
  }

  public runFromSpmfFile(input: string, minsupRel: number) {
    const allFileContents = fs.readFileSync(input, 'utf8')
    const fileLines = allFileContents.split(/\r?\n/).filter((line: string) => line.length > 0)
    return this.run(fileLines, minsupRel)
  }

  public run(fileLines: string[], minsupRel: number) {
    this.patternCount = 0
    BitMap.INTERSECTION_COUNT = 0
    this.vmsp(fileLines, minsupRel)
    const patterns = this.maxPatterns.filter(Boolean)
      .map(obj => obj!.getElements())
      .reduce((acc, elmts) => {
        return acc.concat(elmts)
      }, [])
      .sort((a, b) => b.support - a.support)
    this.executionFlag.check()
    if (!this.executionFlag.shouldContinue) {
      console.warn('Stopped due to time threshold. Returning the patterns found so far.')
    }
    return [patterns, BitMap.INTERSECTION_COUNT, this.executionFlag.getExecutionTime()] as const
  }

  public vmsp(fileLines: string[], minsupRel: number) {
    this.executionFlag.start()
    const inMemoryDB: number[][] = []
    this.maxPatterns.push(null)
    this.maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))

    //STEP 0
    const res = computeSequencesSize(fileLines, inMemoryDB)
    this.sequencesSize = res.sequencesSize
    this.lastBitIndex = res.lastBitIndex
    this.nbrSequences = this.sequencesSize.length

    this.minSup = Math.ceil((minsupRel * this.sequencesSize.length))
    if (this.minSup === 0) {
      this.minSup = 1
    }

    //STEP 1
    this.verticalDB = computeVerticalDB(fileLines, this.sequencesSize, this.lastBitIndex)

    //STEP 2
    const frequentItems = computeFrequentItems(this.verticalDB, this.minSup)

    //STEP 2.1
    sortFrequentItems(frequentItems, this.verticalDB)

    //STEP 3.1
    const CMaps = computeCMaps(this.verticalDB, inMemoryDB, this.minSup)
    this.coocMapAfter = CMaps.coocMapAfter
    this.coocMapEquals = CMaps.coocMapEquals

    //STEP 3
    this.verticalDB.forEach((bitMap, item) => {
      if (this.debug) {
        console.log(item)
        console.log(bitMap.getBitSet().toArray())
      }
      const prefix = new PrefixVMSP([new ItemSet([item])])

      let hasExtension = false
      if (this.maximumPatternLength > 1) {
        hasExtension = this.dfsPruning(prefix, bitMap, frequentItems, frequentItems, item, 2, item)
      }
      if (!hasExtension && this.minimumPatternLength < 2) {
        this.savePatternSingleItem(item, bitMap)
      }
    })
  }

  private dfsPruning(prefix: PrefixVMSP,
    prefixBitmap: BitMap,
    sn: number[],
    _in: number[],
    hasToBeGreaterThanForIStep: number,
    m: number,
    lastAppendedItem: number) {

    let atLeastOneFrequentExtension = false

    if (this.debug) {
      console.log("PREFIX: " + prefix.toString() + "  sn=" + sn + " in=" + _in)
    }

    const { sTemp, sTempBitmaps } = computeSExtendedBitmaps(
      sn,
      prefixBitmap,
      this.coocMapAfter.get(lastAppendedItem),
      this.verticalDB,
      this.sequencesSize,
      this.minSup,
      this.maxGap,
      this.useCMAPPruning
    )

    for (let k = 0; k < sTemp.length; k++) {
      const newBitmap = sTempBitmaps[k]
      if (newBitmap.getSupport() >= this.minSup) {
        const item = sTemp[k]
        const prefixSStep = prefix.cloneSequence()
        prefixSStep.addItemSet(new ItemSet([item]))
        this.executionFlag.check()
        let hasFrequentExtension = false
        if (this.maximumPatternLength >= m && this.executionFlag.shouldContinue) {
          hasFrequentExtension = this.dfsPruning(prefixSStep, newBitmap, sTemp, sTemp, item, m + 1, item)
        }
        if (!hasFrequentExtension && this.minimumPatternLength <= m) {
          atLeastOneFrequentExtension = true
          this.savePatternMultipleItems(prefixSStep, newBitmap, m)
        }
      }
    }

    const { iTemp, iTempBitmaps } = computeIExtendedBitmaps(
      sn,
      prefixBitmap,
      this.coocMapEquals.get(lastAppendedItem),
      this.verticalDB,
      this.sequencesSize,
      hasToBeGreaterThanForIStep,
      this.minSup,
      this.useCMAPPruning
    )

    for (let k = 0; k < iTemp.length; k++) {
      const item = iTemp[k]
      const prefixIStep = prefix.cloneSequence()
      prefixIStep.addItem(item, prefixIStep.nbrOfItemSets() - 1)
      const newBitmap = iTempBitmaps[k]
      let hasFrequentExtension = false
      this.executionFlag.check()
      if (this.maximumPatternLength >= m && this.executionFlag.shouldContinue) {
        hasFrequentExtension = this.dfsPruning(prefixIStep, newBitmap, sTemp, iTemp, item, m + 1, item)
      }
      if (!hasFrequentExtension && this.minimumPatternLength <= m) {
        atLeastOneFrequentExtension = true
        this.savePatternMultipleItems(prefixIStep, newBitmap, m)
      }
    }

    return atLeastOneFrequentExtension || !this.useStrategyForwardExtensionChecking
  }

  private savePatternSingleItem(item: number, bitmap: BitMap) {
    if (this.debug) {
      console.log("Trying to save: " + item)
    }

    if (!checkIfItemShouldBeSaved(item, bitmap, this.maxPatterns)) {
      return
    }

    this.patternCount++
    const prefix = new PrefixVMSP([new ItemSet([item])])
    const pattern = new PatternVMSP(prefix, bitmap.getSupport(),)
    if (this.outputSequenceIdentifiers) {
      pattern.bitmap = bitmap
      pattern.sessionsBitMap = generateSessionBitmap(bitmap.getSIDs(this.sequencesSize), this.nbrSequences)
    }

    this.maxPatterns[1]!.add(pattern)
    if (this.debug) {
      console.log("saved")
    }
  }

  private savePatternMultipleItems(prefix: PrefixVMSP, bitmap: BitMap, length: number) {
    if (this.debug) {
      console.log("*Trying to save: " + prefix)
    }

    if (!checkIfItemsShouldBeSaved(prefix, bitmap, this.maxPatterns, length, this.maxGap)) {
      return
    }

    const removedPatternsNumber = removeSavedPatternsContainedByNewItems(prefix, bitmap, this.maxPatterns, length)
    this.patternCount -= removedPatternsNumber

    while (this.maxPatterns.length - 1 < length) {
      this.maxPatterns.push(new TreeSet<PatternVMSP>(patternVMSPComparator))
    }

    this.patternCount++
    const pattern = new PatternVMSP(prefix, bitmap.getSupport())
    if (this.outputSequenceIdentifiers) {
      pattern.bitmap = bitmap
      pattern.sessionsBitMap = generateSessionBitmap(bitmap.getSIDs(this.sequencesSize), this.nbrSequences)
    }

    this.maxPatterns[length]!.add(pattern)
    if (this.debug) {
      console.log("saved")
    }
  }

  public getSequencesSize(): number[] {
    return this.sequencesSize
  }

  public printResult(idToAction?: Map<number, string>) {
    let str = ''
    for (const tree of this.maxPatterns) {
      if (tree === null) continue
      for (const pattern of tree.getElements()) {
        for (const itemSet of pattern.prefix.getItemsets()) {
          for (const item of itemSet.getItems()) {
            if (idToAction) {
              str += `[${item}] ${idToAction.get(item)} \n`
            } else {
              str += `${item} `
            }
          }
          if (!idToAction) {
            str += '-1 '
          }
        }
        str += " #SUP: "
        str += pattern.support

        if (this.outputSequenceIdentifiers) {
          str += " #SID: "
          str += pattern.bitmap?.getSIDs(this.sequencesSize)
        }
        str += '\n'
        if (idToAction) {
          str += '\n'
        }
      }
    }
    console.log(str)
  }

  public getTop10Patterns(idToActionObject: Map<number, object>) {//minSize:number=this.minimumPatternLength) {
    const patterns = this.maxPatterns.filter(Boolean)
      .map(obj => obj!.getElements())
      .reduce((acc, elmts) => {
        //            elmts = elmts.filter(obj => obj.nbrOfItems() >= minSize);
        return acc.concat(elmts);
      }, [])
      .sort((a, b) => b.support - a.support)
      .slice(0, 10)
    return patterns.map((patt, index) => {
      return {
        name: `usage_${index + 1}`,
        actions: patt.prefix.itemSets.map(itm => itm.getItems())
          .reduce((itm1, itm2) => itm1.concat(itm2), [])
          .map(actionId => idToActionObject.get(actionId)),
        support: patt.support
      }
    })
  }
}

class ExecutionFlag {
  private startTime: number = 0
  private threshold: number
  private lastCheck: number = 0
  public shouldContinue: boolean = true

  constructor(thresholdInSeconds: number) {
    this.threshold = thresholdInSeconds * 1000
    this.start()
  }

  start() {
    this.startTime = Date.now()
    this.lastCheck = Date.now()
  }

  check() {
    this.lastCheck = Date.now() - this.startTime
    if (this.lastCheck > this.threshold) {
      this.shouldContinue = false
    }
  }

  getExecutionTime() {
    return this.lastCheck
  }
}
