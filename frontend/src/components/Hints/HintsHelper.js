import { new2dArray } from "../Grid/GridHelper"

export const getHints = (gridData) => {
  let rowHintsData = []
  let colHintsData = Array.from({ length: gridData[0].length }, () => [])
  let rowHintsCount = 0
  let colHintsCount = Array.from({ length: gridData[0].length }, () => 0)
  let rowHintsIndex = new2dArray(gridData.length, gridData[0].length, -1)
  let colHintsIndex = new2dArray(gridData.length, gridData[0].length, -1)

  for (let i = 0; i < gridData.length; i++) {
    rowHintsData.push([])
    for (let j = 0; j < gridData[i].length; j++) {
      if (gridData[i][j] === true) {
        rowHintsCount++
        colHintsCount[j]++
        rowHintsIndex[i][j] = rowHintsData[i].length
        colHintsIndex[i][j] = colHintsData[j].length
        if (j + 1 === gridData[i].length) {
          rowHintsData[i].push(rowHintsCount)
          rowHintsCount = 0;
        }
        if (i + 1 === gridData.length) {
          colHintsData[j].push(colHintsCount[j])
          colHintsCount[j] = 0;
        }
      } else {
        if (rowHintsCount !== 0) {
          rowHintsData[i].push(rowHintsCount)
          rowHintsCount = 0;
        }
        if (colHintsCount[j] !== 0) {
          colHintsData[j].push(colHintsCount[j])
          colHintsCount[j] = 0;
        }
      }
    }
  }

  return {
    rowData: rowHintsData,
    colData: colHintsData,
    rowIndex: rowHintsIndex,
    colIndex: colHintsIndex,
  }
}