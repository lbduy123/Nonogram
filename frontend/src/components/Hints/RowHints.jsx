import React, { useEffect, useState } from 'react'

function RowHints({ gridData, hidden }) {

  const [rowHints, setRowHints] = useState(Array.from({ length: 5 }, () => []))

  useEffect(() => {
    if (gridData && gridData.length) {
      let rowHintsData = []
      const convertedGrid = gridData.map(Object.values)
      let rowHintsCount = 0

      for (let i = 0; i < convertedGrid.length; i++) {
        rowHintsData.push([])
        for (let j = 0; j < convertedGrid[i].length; j++) {
          if (convertedGrid[i][j] === true) {
            rowHintsCount++
            if (j + 1 === convertedGrid[i].length) {
              rowHintsData[i].push(rowHintsCount)
              rowHintsCount = 0;
            }
          } else if (rowHintsCount !== 0) {
            rowHintsData[i].push(rowHintsCount)
            rowHintsCount = 0;
          }
        }
      }
      setRowHints(rowHintsData)
    }
  }, [gridData])

  return (
    <div style={{
      margin: "0px 20px",
      display: "grid",
      gridTemplateRows: `repeat(${rowHints.length}, auto)`,
      justifyItems: "end",
      visibility: hidden ? "hidden" : ""
    }}>
      {[...rowHints].map((row, rowIndex) => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${row.length}, auto)`,
              alignItems: "center",
              columnGap: "10px",
              height: "60px"
            }}
            key={rowIndex}>
            {[...row].map((hint, idx) => {
              return (
                <label key={idx}>{hint}</label>
              );
            })}
          </div>
        );
      })}
    </div>
  )
}

export default RowHints