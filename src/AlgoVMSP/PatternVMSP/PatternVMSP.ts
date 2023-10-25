import PrefixVMSP from "../PrefixVMSP/PrefixVMSP"
import BitMap from "../../collections/BitMap/BitMap"

export default class PatternVMSP {
  prefix: PrefixVMSP
  public support: number
  bitmap: BitMap | null = null
  sessionsBitMap: number[] | null = null

  constructor(prefix: PrefixVMSP, support: number) {
    this.prefix = prefix
    this.support = support
  }

  get itemSets(): number[][] {
    return this.prefix.getItemSetsArray()
  }

  toJSON() {
    return {
      support: this.support,
      itemsets: this.itemSets
    }
  }
}
