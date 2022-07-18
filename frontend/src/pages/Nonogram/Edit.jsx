import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNonogram, updateNonogram, reset } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import ColumnHints from '../../components/Hints/ColumnHints'
import Spinner from '../../components/Spinner'

function Edit() {
  const location = useLocation()
  const gridId = location.pathname.substring(1)

  // const columnHintsData = Array.from(Array(cols).keys())
  const columnHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

  const { user } = useSelector((state) => state.auth)
  const { nonogram, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.nonograms
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getNonogram(gridId))

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch, gridId])

  const [rows, setRows] = useState(isSuccess ? nonogram.rows : 5)
  const [cols, setCols] = useState(isSuccess ? nonogram.cols : 5)

  let gridData = []
  function initGridData(rows, cols) {
    for (let i = 0; i < rows; i++) {
      gridData[i] = []
      for (let j = 0; j < cols; j++) {
        gridData[i][j] = false;
      }
    }
  }

  initGridData(rows, cols)

  if (nonogram.gridData) {
    gridData = nonogram.gridData.map((item) =>
      Object.assign({}, item, { selected: false })
    )
  }

  console.log(nonogram);

  let updatedGridData = gridData

  const updateGridData = (gridData) => {
    updatedGridData = gridData
  }

  if (isLoading) {
    return <Spinner />
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
      rows: rows,
      cols: cols,
      gridData: updatedGridData
    }

    dispatch(updateNonogram({ id: gridId, nonogramData: nonogramData }))
    toast.success("Save successfully")
    navigate('/creation')
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <select value={rows} onChange={(e) => (handleChangeRows(e))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <select value={cols} onChange={(e) => (handleChangeCols(e))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <div>
            <ColumnHints
              hintsData={columnHintsData} />

            <Grid
              rows={nonogram.rows}
              cols={nonogram.cols}
              gridData={nonogram.gridData}
              updateGridData={updateGridData}
            />
          </div>


        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  )
}

export default Edit