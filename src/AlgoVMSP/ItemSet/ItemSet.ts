export default class ItemSet {
    private items: number[] = []

    constructor(items?: number[]) {
        if (!items) return
        for (const item of items) {
            this.addItem(item)
        }
    }

    public addItem(value: number) {
        if (!this.items.includes(value)) {
            this.items.push(value)
        }
    }

    public getItems() {
        return this.items
    }

    public get(index: number) {
        return this.items[index]
    }

    public size() {
        return this.items.length
    }

    public cloneItemSet() {
        const itemSet = new ItemSet()
        itemSet.items = [...this.items]
        return itemSet;
    }
}
