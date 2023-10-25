export default function computeSequencesSize(fileLines: string[], inMemoryDB: number[][]): { sequencesSize: number[], lastBitIndex: number } {
    const sequencesSize: number[] = []
    let bitIndex = 0

    fileLines.forEach((line: string) => {
        sequencesSize.push(bitIndex)

        const tokens: string[] = line.split(' ')
        const transactionArray: number[] = [];
        inMemoryDB.push(transactionArray);

        for (let i = 0; i < tokens.length; i++) {
            const item = parseInt(tokens[i])
            transactionArray[i] = item
            if (item === -1) {
                bitIndex++
            }
        }
    })
    return {sequencesSize, lastBitIndex: bitIndex - 1}
}

