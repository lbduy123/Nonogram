import React from 'react'

function RowHints({ hintsData, hidden }) {
  return (
    <div style={{
      margin: "0px 20px",
      display: "grid",
      gridTemplateRows: `repeat(${hintsData.length}, auto)`,
      justifyItems: "end",
      visibility: hidden ? "hidden" : ""
    }}>
      {[...hintsData].map((row, rowIndex) => {
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