import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import { compareGridData, new2dArray } from '../../components/Grid/GridHelper'

function New() {
  const { user } = useSelector((state) => state.auth)

  const [type, setType] = useState('workshop')
  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)
  const [nonogramName, setNonogramName] = useState('')

  const [updatedGridData, setUpdatedGridData] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateGridData = (gridData) => {
    setUpdatedGridData(gridData)
  }

  const handleChangeRows = (e) => {
    setRows(parseInt(e.target.value))
  }

  const handleChangeCols = (e) => {
    setCols(parseInt(e.target.value))
  }

  const handleChangeName = (e) => {
    setNonogramName(e.target.value)
  }

  const handleChangeType = (e) => {
    setType(e.target.value)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault()

    const blankGrid = new2dArray(rows, cols, false)
    if (compareGridData(updatedGridData, blankGrid)) {
      toast.error("Nonogram cannot be empty")
    } else {
      const nonogramData = {
        name: nonogramName,
        type,
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
  }

  return (
    <section className="form" style={{marginTop:'80px'}}>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <div className="form-input">
            <input type="text"
              className="form-control"
              placeholder="name"
              value={nonogramName}
              onChange={handleChangeName} />
            {user.roleLevel ?
              <select value={type} onChange={handleChangeType}>
                <option value={'workshop'}>Workshop</option>
                <option value={'casual'}>Casual</option>
              </select> :
              <></>}
          </div>

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