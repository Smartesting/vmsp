import ItemSet from "../ItemSet/ItemSet"

export class Prefix {
  itemSets: ItemSet[] = []

  constructor(itemSets?: ItemSet[]) {
    if (!itemSets) return

    this.itemSets = itemSets
  }

  public addItemSet(itemSet: ItemSet) {
    this.itemSets.push(itemSet);
  }

  public cloneSequence() {
    const sequence = new Prefix()
    for (const itemset of this.itemSets) {
      sequence.addItemSet(itemset.cloneItemSet())
    }
    return sequence
  }

  public getItemSetsArray(): number[][] {
    return this.itemSets.reduce(
      (allItems: number[][], itemset: ItemSet) =>
        [...allItems, itemset.getItems()],
      []
    )
  }

  public getFlatArrayOfItems() {
    return this.itemSets.reduce(
      (allItems: number[], itemset: ItemSet) =>
        allItems.concat(itemset.getItems()),
      []
    )
  }

  public getItemsets() {
    return this.itemSets
  }

  public get(index: number) {
    return this.itemSets[index]
  }

  public nbrOfItemSets() {
    return this.itemSets.length;
  }

  public nbrOfItems() {
    return this.itemSets.reduce((acc, val) => acc + val.size(), 0);
  }

  public containsItem(item: number): boolean {
    for (const itemSet of this.itemSets) {
      if (itemSet.getItems().includes(item)) {
        return true
      }
    }
    return false
  }

  public toString() {
    let r = ''
    for (const itemset of this.itemSets) {
      for (const item of itemset.getItems()) {
        r += `${item.toString()} `
      }
      r += '-1 '
    }
    return r
  }
}
