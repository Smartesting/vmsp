export default class TreeSet<T> {
    private elements: T[] = []
    private readonly comparator: (a: T, b: T) => number

    constructor(comparator: (a: T, b: T) => number) {
        this.comparator = comparator
    }

    public add(element: T) {
        let index = this.binarySearch(element)
        if (index < 0) {
            index = -index - 1
        }
        this.elements.splice(index, 0, element)
    }

    public size() {
        return this.elements.length
    }

    public get(index: number) {
        return this.elements[index]
    }

    public getElements() {
        return this.elements
    }

    public remove(index: number) {
        this.elements.splice(index, 1)
    }

    private binarySearch(value: T) {
        let low = 0;
        let high = this.elements.length - 1;

        while (low <= high) {
            const mid = (low + high) >>> 1;
            const midValue = this.elements[mid];
            const cmp = this.comparator(midValue, value);
            if (cmp < 0) {
                low = mid + 1;
            } else if (cmp > 0) {
                high = mid - 1;
            } else {
                return mid;
            }
        }

        return -(low + 1);
    }
}
