type CpuProps = {
    stoneProbabilities: (number | null)[];
    boardSize: number;
    nextStoneProbability: number;
}


const CpuNextHand = ({ stoneProbabilities, boardSize, nextStoneProbability }: CpuProps): number => {

    const stoneProbabilitiesGrid = Array.from({ length: boardSize }, (_, i) =>
        stoneProbabilities.slice(i * boardSize, (i + 1) * boardSize)
    );

    // 隣接している空白マスの集合を取得
    const neighbors = new Set<{ i: number, j: number }>();
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (stoneProbabilitiesGrid[i][j] !== null) {
                for (const [di, dj] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                    const ni = i + di;
                    const nj = j + dj;
                    if (
                        0 <= ni && ni < boardSize &&
                        0 <= nj && nj < boardSize &&
                        stoneProbabilitiesGrid[ni][nj] === null
                    ) {
                        neighbors.add({ i: ni, j: nj });
                    }
                }
            }
        }
    }

    const maxEvaluationValues = Array(6).fill(-1);
    const maxPositions = Array(6).fill(-1);
    const nextNextStoneProbability = nextStoneProbability === 10 ? 70 : 90;

    const evaluattonValuesGrid = Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => -1)
    );

    for (const neighbor of neighbors) {
        const i = neighbor.i;
        const j = neighbor.j;
        let maxEvaluationValue = -1;
        for (const [di, dj] of [[0, 1], [1, 0], [1, 1], [1, -1],]) {
            const line: number[] = [];
            let centerIdx = -1;
            for (let num = -4; num <= 4; num++) {
                const ni = i + di * num;
                const nj = j + dj * num;
                if (num === 0) {
                    line.push(nextStoneProbability);
                    centerIdx = line.length - 1;
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
                let cpuWinEvaluateValue = 1;
                let playerWinEvaluateValue = 1;
                for (let idx = 0; idx < line.length; idx++) {
                    const l = line[idx];
                    D.push(l);
                    cpuWinEvaluateValue *= 100 - l;
                    playerWinEvaluateValue *= centerIdx === idx ? nextNextStoneProbability : l;
                    if (idx < 5) continue;
                    if (maxEvaluationValue < cpuWinEvaluateValue + playerWinEvaluateValue) {
                        maxEvaluationValue = cpuWinEvaluateValue + playerWinEvaluateValue;
                    }
                    if (maxEvaluationValues[5] < cpuWinEvaluateValue + playerWinEvaluateValue) {
                        maxEvaluationValues[5] = cpuWinEvaluateValue + playerWinEvaluateValue;
                        maxPositions[5] = i * boardSize + j;
                    }
                    cpuWinEvaluateValue /= 100 - D.shift()!;
                    playerWinEvaluateValue /= D.shift()!;
                }
            } else {
                let cpuWinEvaluateValue = 100 - nextStoneProbability;
                let playerWinEvaluateValue = nextNextStoneProbability;
                for (const l of line) {
                    cpuWinEvaluateValue *= 100 - l;
                    playerWinEvaluateValue *= l;
                }
                if (maxEvaluationValue < cpuWinEvaluateValue + playerWinEvaluateValue) {
                    maxEvaluationValue = cpuWinEvaluateValue + playerWinEvaluateValue;
                }
                if (maxEvaluationValues[line.length] < cpuWinEvaluateValue + playerWinEvaluateValue) {
                    maxEvaluationValues[line.length] = cpuWinEvaluateValue + playerWinEvaluateValue;
                    maxPositions[line.length] = i * boardSize + j;
                }

            }
        }
        evaluattonValuesGrid[i][j] = maxEvaluationValue;
    }

    console.log(evaluattonValuesGrid);

    for (let i = 5; i >= 0; i--) {
        if (maxPositions[i] !== -1) {
            return maxPositions[i];
        }
    }
    return -1;
}

export default CpuNextHand;
