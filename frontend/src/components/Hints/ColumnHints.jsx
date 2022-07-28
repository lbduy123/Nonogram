import React, { useEffect, useState } from 'react'

function ColumnHints({ gridData }) {

  const [colHints, setColHints] = useState(Array.from({ length: 5 }, () => []))
  const [maxHints, setMaxHints] = useState(3) // Max number of hints per column

  useEffect(() => {
    if (gridData && gridData.length) {
      let colHintsData = []
      let colHintsCount = 0
      let convertedGrid = gridData.map(Object.values)

      for (let i = 0; i < convertedGrid[0].length; i++) {
        colHintsData.push([])
        for (let j = 0; j < convertedGrid.length; j++) {
          if (convertedGrid[j][i] === true) {
            colHintsCount++
            if (j + 1 === convertedGrid.length) {
              colHintsData[i].push(colHintsCount)
              colHintsCount = 0;
            }
          } else if (colHintsCount !== 0) {
            colHintsData[i].push(colHintsCount)
            colHintsCount = 0;
          }
        }
      }
      setMaxHints(Math.round(gridData.length / 2))
      setColHints(colHintsData)
    }

  }, [gridData])

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${colHints.length}, auto)`,
      alignItems: "end",
      justifyContent: "center",
      margin: "10px 0px",
      height: `calc(30px*${maxHints})`
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