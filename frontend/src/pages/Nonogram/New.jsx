import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import ColumnHints from '../../components/Hints/ColumnHints'

function New() {
  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)
  let gridData = []

  for (let i = 0; i < rows; i++) {
    gridData[i] = []
    for (let j = 0; j < cols; j++) {
      gridData[i][j] = false;
    }
  }

  console.log(gridData);

  let updatedGridData = gridData

  // const columnHintsData = Array.from(Array(cols).keys())
  const columnHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateGridData = (gridData) => {
    updatedGridData = gridData
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const nonogramData = {
      rows,
      cols,
      gridData: updatedGridData
    }

    dispatch(createNonogram(nonogramData))
    toast.success("Create successfully")
    setRows(5)
    setCols(5)
    navigate('/creation')
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <select value={rows} onChange={(e) => setRows(parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <select value={cols} onChange={(e) => setCols(parseInt(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <div>
            <ColumnHints
              hintsData={columnHintsData} />

            <Grid
              rows={rows}
              cols={cols}
              gridData={gridData}
              updateGridData={updateGridData}
            />
          </div>


        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <button className="btn btn-primary" type="submit">
            Create this nonogram
          </button>
        </div>
      </form>
    </section>
  )
}

export default New