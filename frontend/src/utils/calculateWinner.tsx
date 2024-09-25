// 愚直に全探索することで勝者を判定する関数
// TODO:酷い実装なので、五目の勝利判定のアルゴリzむを調べて実装し直す予定
export function calculateWinner(squares: Array<string | null>): string | null {
  const boardSize = 19;
  const lines = [];

  // 横方向
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize - 4; col++) {
      lines.push([row * boardSize + col, row * boardSize + col + 1, row * boardSize + col + 2, row * boardSize + col + 3, row * boardSize + col + 4]);
    }
  }

  // 縦方向
  for (let col = 0; col < boardSize; col++) {
    for (let row = 0; row < boardSize - 4; row++) {
      lines.push([row * boardSize + col, (row + 1) * boardSize + col, (row + 2) * boardSize + col, (row + 3) * boardSize + col, (row + 4) * boardSize + col]);
    }
  }

  // 斜め方向（下右）
  for (let row = 0; row < boardSize - 4; row++) {
    for (let col = 0; col < boardSize - 4; col++) {
      lines.push([row * boardSize + col, (row + 1) * boardSize + col + 1, (row + 2) * boardSize + col + 2, (row + 3) * boardSize + col + 3, (row + 4) * boardSize + col + 4]);
    }
  }

  // 斜め方向（上右）
  for (let row = 4; row < boardSize; row++) {
    for (let col = 0; col < boardSize - 4; col++) {
      lines.push([row * boardSize + col, (row - 1) * boardSize + col + 1, (row - 2) * boardSize + col + 2, (row - 3) * boardSize + col + 3, (row - 4) * boardSize + col + 4]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }

  return null;
}
