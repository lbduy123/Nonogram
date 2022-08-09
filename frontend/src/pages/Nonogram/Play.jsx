import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import Spinner from '../../components/Spinner'
import Modal from 'react-modal';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import CompleteDialog from '../../components/CompleteDialog'

function Play() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleCloseDialog = useCallback(() => setIsOpen(false), []);
  const handleOpenDialog = useCallback(() => setIsOpen(true), []);

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

    dispatch(getNonogram(gridId))
    setRows(nonogram.rows)
    setCols(nonogram.cols)

  }, [user, navigate, isError, message, dispatch, gridId, nonogram.rows, nonogram.cols])

  let updatedGridData
  const resultGridData = (nonogram.gridData ?
    nonogram.gridData.map(Object.values) :
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))

  const compareGridData = (grid1, grid2) => {
    if (grid1.length !== grid2.length) return false;
    for (var i = 0, len = grid1.length; i < len; i++) {
      if (JSON.stringify(grid1[i]) !== JSON.stringify(grid2[i])) {
        return false;
      }
    }
    return true;
  }

  const updateGridData = (gridData) => {
    updatedGridData = gridData
    if (compareGridData(updatedGridData, resultGridData)) {
      handleOpenDialog()
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <CompleteDialog
        modalIsOpen={modalIsOpen}
        handleCloseDialog={handleCloseDialog}
      />

      <Grid
        rows={rows}
        cols={cols}
        mode="play"
        updateGridData={updateGridData}
      />
    </>

  )
}

export default Play