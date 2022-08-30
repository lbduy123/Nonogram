// Check if an array element is in 2d array
const isElExistInArray = (el, array) => {
  return ((array.some(
    r => r.length === el.length &&
      r.every((value, index) => el[index] === value)
  )) ? true : false)
}

const getRemainingTrueCells = (rows, cols, playingGrid, gridData, showedHints) => {
  let remainingTrueCells = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (playingGrid[i][j] === false &&
        gridData[i][j] === true &&
        showedHints !== 0) {
        remainingTrueCells.push({ rowIndex: i, columnIndex: j })
      }
    }
  }
  return remainingTrueCells
}

const new2dArray = (rows, cols) => {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
}

const getRowBlur = (playingGrid, gridData, cols, rowIdx, blurArr, isActive) => {
  // Check if row is correct
  let rowCorrect = true
  for (let i = 0; i < cols; i++) {
    if (playingGrid[rowIdx][i] !== gridData[rowIdx][i]) {
      rowCorrect = false
      break;
    }
  }

  let isRowBlur = false
  let rowCellsToBlur = []
  if (rowCorrect === true && isActive) {
    isRowBlur = true

    // Add false row cells to array
    playingGrid[rowIdx].forEach((value, colIdx) => {
      if (playingGrid[rowIdx][colIdx] === false &&
        !isElExistInArray([rowIdx, colIdx], blurArr) &&
        (document.getElementById(`${rowIdx}-${colIdx}`)).className !== 'cell-invalid') {
        rowCellsToBlur.push([rowIdx, colIdx])
      }
    })
  }

  return { isRowBlur: isRowBlur, rowCellsToBlur: rowCellsToBlur }
}

const getColBlur = (playingGrid, gridData, rows, colIdx, blurArr, isActive) => {
  // Check if column is correct
  let colCorrect = true;
  for (let i = 0; i < rows; i++) {
    if (playingGrid[i][colIdx] !== gridData[i][colIdx]) {
      colCorrect = false
      break;
    }
  }

  let isColBlur = false
  let colCellsToBlur = []
  if (colCorrect === true && isActive) {
    isColBlur = true

    // Add false column cells to array
    playingGrid.forEach((value, rowIdx) => {
      if (playingGrid[rowIdx][colIdx] === false &&
        !isElExistInArray([rowIdx, colIdx], blurArr) &&
        (document.getElementById(`${rowIdx}-${colIdx}`)).className !== 'cell-invalid') {
        colCellsToBlur.push([rowIdx, colIdx])
      }
    })
  }

  return ({ isColBlur: isColBlur, colCellsToBlur: colCellsToBlur })
}

const compareGridData = (grid1, grid2) => {
  if (grid1.length !== grid2.length) return false;
  for (var i = 0, len = grid1.length; i < len; i++) {
    if (JSON.stringify(grid1[i]) !== JSON.stringify(grid2[i])) {
      return false;
    }
  }
  return true;
}

export {
  isElExistInArray,
  getRemainingTrueCells,
  new2dArray,
  getRowBlur,
  getColBlur,
  compareGridData
}