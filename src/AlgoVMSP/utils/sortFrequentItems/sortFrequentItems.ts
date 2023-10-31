import BitMap from "../../../collections/BitMap/BitMap"

export default function sortFrequentItems(frequentItems: number[], verticalDB: Map<number, BitMap>) {
  frequentItems.sort((arg0, arg1) => {
    return verticalDB.get(arg0)!.getSupport() - verticalDB.get(arg1)!.getSupport()
  })
  // console.log(" == Order of items ==")
  // console.log(frequentItems)
  // console.log(" ====================")
}
