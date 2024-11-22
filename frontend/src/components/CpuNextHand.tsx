type CpuProps = {
    stoneProbabilities: (number | null)[];
    boardSize: number;
    nextStoneProbability: number;
}

const CpuNextHand = ({ stoneProbabilities, boardSize, nextStoneProbability }: CpuProps): number => {

    const stoneProbabilitiesGrid = Array.from({ length: boardSize }, (_, i) =>
        stoneProbabilities.slice(i * boardSize, (i + 1) * boardSize)
    );

    const neighbors = new Set<string>();
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (stoneProbabilitiesGrid[i][j] !== null) {
                for (const [di, dj] of [
                    [0, 1],
                    [1, 0],
                    [0, -1],
                    [-1, 0],
                ]) {
                    const ni = i + di;
                    const nj = j + dj;
                    if (
                        0 <= ni &&
                        ni < boardSize &&
                        0 <= nj &&
                        nj < boardSize &&
                        stoneProbabilitiesGrid[ni][nj] === null
                    ) {
                        neighbors.add(`${ni},${nj}`);
                    }
                }
            }
        }
    }

    console.log(`neighbors=${JSON.stringify(Array.from(neighbors))}`);

    const max_val = Array(6).fill(-1);
    const res_num = Array(6).fill(-1);

    for (const neighbor of neighbors) {
        const [i, j] = neighbor.split(",").map(Number);
        for (const [di, dj] of [[0, 1], [1, 0], [1, 1], [1, -1],]) {
            const line: number[] = [];
            for (let num = -4; num <= 4; num++) {
                const ni = i + di * num;
                const nj = j + dj * num;
                if (num === 0) {
                    line.push(nextStoneProbability);
                    continue;
                }
                if (0 <= ni && ni < boardSize && 0 <= nj && nj < boardSize) {
                    if (stoneProbabilitiesGrid[ni][nj] === null) {
                        if (num < 0) {
                            line.length = 0;
                        } else {
                            break;
                        }
                    } else {
                        line.push(stoneProbabilitiesGrid[ni][nj]);
                    }
                }
            }
            if (line.length >= 5) {
                const D: number[] = [];
                let cur = 1;
                for (let idx = 0; idx < line.length; idx++) {
                    const l = line[idx];
                    D.push(100 - l);
                    cur *= 100 - l;
                    if (idx < 5) continue;
                    if (max_val[5] < cur) {
                        max_val[5] = cur;
                        res_num[5] = i * boardSize + j;
                    }
                    cur /= D.shift()!;
                }
            } else {
                let cur = 1;
                for (const l of line) {
                    cur *= 100 - l;
                }
                if (max_val[line.length] < cur) {
                    max_val[line.length] = cur;
                    res_num[line.length] = i * boardSize + j;
                }
            }
        }
    }

    console.log(`max_val=${JSON.stringify(max_val)}`);
    console.log(`res_num=${JSON.stringify(res_num)}`);

    for (let i = 5; i >= 0; i--) {
        if (res_num[i] !== -1) {
            return res_num[i];
        }
    }
    return -1;
}

export default CpuNextHand;
