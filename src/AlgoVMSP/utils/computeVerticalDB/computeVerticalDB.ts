import BitMap from "../../../collections/BitMap/BitMap"

export default function computeVerticalDB(fileLines: string[], sequencesSize: number[], lastIndexBit: number): Map<number, BitMap> {
    const verticalDB = new Map<number, BitMap>()

    let sid = 0
    let tid = 0
    fileLines.forEach((line: string) => {
        const tokens: string[] = line.split(' ')
        for (const token of tokens) {
            if (token === "-1") {
                tid++;
            } else if (token === "-2") {
                sid++;
                tid = 0;
            } else {
                const item = parseInt(token);
                let bitmapItem = verticalDB.get(item);
                if (bitmapItem == null) {
                    bitmapItem = new BitMap(lastIndexBit)
                    verticalDB.set(item, bitmapItem);
                }
                bitmapItem.registerBit(sid, tid, sequencesSize)
            }
        }
    })
    return new Map([...verticalDB.entries()].sort())
}
