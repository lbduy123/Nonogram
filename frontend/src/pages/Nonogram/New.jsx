import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'

function New() {
  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)

  let updatedGridData = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateGridData = (gridData) => {
    updatedGridData = gridData
  }

  const handleChangeRows = (e) => {
    setRows(parseInt(e.target.value))
  }

  const handleChangeCols = (e) => {
    setCols(parseInt(e.target.value))
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
          <select value={rows} onChange={handleChangeRows}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <select value={cols} onChange={handleChangeCols}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <Grid
            rows={rows}
            cols={cols}
            mode="new"
            updateGridData={updateGridData}
          />

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