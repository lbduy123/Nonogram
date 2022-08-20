import React, { useEffect, useState } from 'react'

function RowHints({ gridData, hidden }) {

  const [rowHints, setRowHints] = useState(Array.from({ length: 5 }, () => []))
  const [maxHints, setMaxHints] = useState(3) // Max number of hints per row

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
      setMaxHints(Math.round(gridData.length / 2))
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
            id={`rowHint-${rowIndex}`}
            className="rowHint"
            style={{
              display: "flex",
              // gridTemplateColumns: `repeat(${row.length}, auto)`,
              alignItems: "center",
              justifyContent:'end',
              // columnGap: "10px",
              
              // -------------------------properties changing---------
              height: "58px",
              margin:'1px 0', 
              width: `calc(30px*${maxHints})`,
             
              border:'1px solid rgba(0,0,0,0.2)',
              borderRadius:'8px'
            }}
            key={rowIndex}>
            {[...row].map((hint, idx) => {
              return (
                <div style={{
                  marginRight:'10px',
                  color:'#625e84',
                  fontWeight:'600'
                }} key={idx}>{hint}</div>
              );
            })}
          </div>
        );
      })}
    </div>
  )
}

export default RowHints