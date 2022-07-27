import React, { useEffect, useState } from 'react'

function ColumnHints({ gridData }) {

  const [colHints, setColHints] = useState(Array.from({ length: 5 }, () => []))
  let colHintsData = []

  useEffect(() => {
    if (gridData && gridData.length) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      colHintsData = []
      let rotatedGrid = []
      let colHintsCount = 0
      let convertedGrid = gridData.map(Object.values)
      for (let i = 0; i < convertedGrid[0].length; i++) {
        rotatedGrid.push([])
        for (let j = 0; j < convertedGrid.length; j++) {
          rotatedGrid[i].push(convertedGrid[j][i])
        }
      }

      for (let i = 0; i < rotatedGrid.length; i++) {
        colHintsData.push([])
        for (let j = 0; j < rotatedGrid[i].length; j++) {
          if (rotatedGrid[i][j] === true) {
            colHintsCount++
            if (j + 1 === rotatedGrid[i].length) {
              colHintsData[i].push(colHintsCount)
              colHintsCount = 0;
            }
          } else if (colHintsCount !== 0) {
            colHintsData[i].push(colHintsCount)
            colHintsCount = 0;
          }
        }
      }
      setColHints(colHintsData)
    }

  }, [gridData])

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${colHints.length}, auto)`,
      alignItems: "end",
      justifyContent: "center",
      margin: "10px 0px"
    }}>
      {[...colHints].map((col, colIndex) => {
        return (
          <div
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${col.length}, auto)`,
              justifyItems: "center",
              width: "60px",
            }}
            key={colIndex}
          >
            {[...col].map((hint, idx) => {
              return (
                <label key={idx} >{hint}</label>
              )
            })}
          </div>
        );
      })}
    </div>
  )
}

export default ColumnHints