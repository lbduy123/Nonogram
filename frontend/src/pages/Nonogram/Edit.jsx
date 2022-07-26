import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNonogram, updateNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import Spinner from '../../components/Spinner'

function Edit() {
  const location = useLocation()
  const gridId = location.pathname.substring(3)

  const { user } = useSelector((state) => state.auth)
  const { nonogram, isLoading, isError, message } = useSelector(
    (state) => state.nonograms
  )

  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      console.log(message)
      toast.error(message)
      navigate('/')
    }

    if (!user) {
      navigate('/login')
    }

    if (nonogram.author && nonogram.author !== user._id) {
      toast.error("Not authorized")
      navigate("/")
    }

    dispatch(getNonogram(gridId))
    setRows(nonogram.rows)
    setCols(nonogram.cols)

  }, [user, navigate, isError, message, dispatch, gridId, nonogram._id, nonogram.author, nonogram.rows, nonogram.cols])

  let updatedGridData

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

  const handleClickBack = (e) => {
    e.preventDefault()
    navigate('/creation')
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

          <Grid
            rows={rows}
            cols={cols}
            mode="edit"
            updateGridData={updateGridData}
          />

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', gap: '20px' }}>
          <button className="btn btn-primary" onClick={handleClickBack}>
            Back
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  )
}

export default Edit