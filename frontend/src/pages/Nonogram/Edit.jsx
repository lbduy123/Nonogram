import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNonogram, createNonogram, reset } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import ColumnHints from '../../components/Hints/ColumnHints'
import Spinner from '../../components/Spinner'

function Edit() {
  const location = useLocation()
  const gridId = location.pathname.substring(1)

  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)
  let updatedGridData = []

  // const columnHintsData = Array.from(Array(cols).keys())
  const columnHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

  const { user } = useSelector((state) => state.auth)
  const { nonogram, isLoading, isError, message } = useSelector(
    (state) => state.nonograms
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateGridData = (gridData) => {
    updatedGridData = gridData
  }

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

  if (isLoading) {
    return <Spinner />
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
              gridData={(nonogram ? nonogram.gridData : {})}
              updateGridData={updateGridData}
            />
          </div>


        </div>

        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Create this nonogram
          </button>
        </div>
      </form>
    </section>
  )
}

export default Edit