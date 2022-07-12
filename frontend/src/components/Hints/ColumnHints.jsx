import React from 'react'

function ColumnHints({ hintsData }) {

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${hintsData.length}, auto)`,
      alignItems: "end",
      justifyContent: "center",
      margin: "10px 0px"
    }}>
      {[...hintsData].map((col, colIndex) => {
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