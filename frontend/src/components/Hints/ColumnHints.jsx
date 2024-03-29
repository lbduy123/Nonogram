import React, { useEffect, useState } from 'react'
import "./Hint.css"
import { getHints } from './HintsHelper'

function ColumnHints({ gridData }) {

  const [colHints, setColHints] = useState(Array.from({ length: 5 }, () => []))
  const [maxHints, setMaxHints] = useState(3) // Max number of hints per column

  useEffect(() => {
    if (gridData && gridData.length) {
      let colHintsData = getHints(gridData).colData
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
            id={`colHint-${colIndex}`}
            className="colHint"
            style={{
              display: "flex",
              flexDirection: "column",
              // gridTemplateRows: `repeat(${col.length}, auto)`,
              justifyContent: "end",
              // ---------------------Properties changing------------------
              alignItems: "center",
              width: "60px",
              // margin: '0 1px', 
              height: `calc(30px*${maxHints})`,

              border: '1px solid rgba(0,0,0,0)',
              borderRadius: '8px'
            }}
            key={colIndex}
          >
            {[...col].map((hint, idx) => {
              return (
                <div
                  id={`colHint-${colIndex}-${idx}`}
                  style={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center',
                    width: '100%',
                    color: '#625e84',
                    fontWeight: '600',
                  }}
                  key={idx} >{hint}
                </div>
              )
            })}
          </div>
        );
      })}
    </div>
  )
}

export default ColumnHints