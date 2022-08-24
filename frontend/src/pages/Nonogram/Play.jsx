import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import Spinner from '../../components/Spinner'
import CompleteDialog from '../../components/CompleteDialog'
import Timer from '../../components/Timer/Timer'
import { FaLightbulb } from 'react-icons/fa'
import { GiTrophy } from 'react-icons/gi'
import { useMemo } from 'react'
var timeBegin;

function Play() {
  const location = useLocation()
  const gridId = location.pathname.substring(3)

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleCloseDialog = useCallback(() => setIsOpen(false), []);
  const handleOpenDialog = () => setIsOpen(true);

  const { user } = useSelector((state) => state.auth)
  const { nonogram, isLoading, isError, message } = useSelector(
    (state) => state.nonograms
  )

  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(5)
  const [showedHints, setShowedHints] = useState(0)
  const [isPlayComplete, setIsPlayComplete] = useState(false)
  const [isLose, setIsLose] = useState(false)
  const [health, setHealth] = useState(4)
  const [timeResult, setTimeResult] = useState({
    minutes: 0,
    seconds: 0,
    miliseconds: 0
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    timeBegin = new Date();
  }, [])

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
  useEffect(() => {
    if (health < 1) {
      setIsLose(true)
      handleOpenDialog()
    }
  }, [health])
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
      setIsPlayComplete(true)
      handleOpenDialog()
    }
  }

  const handleShowHint = () => {
    setShowedHints(prevState => prevState + 1)
  }
  const handleRestart = () => {
    setIsPlayComplete(false);
    setIsLose(false);
    setHealth(4);
    setShowedHints(0);
    timeBegin = new Date();
  }

  if (isLoading) {
    return <Spinner />
  }
console.log(nonogram)
  return (
    <div style={{
      maxWidth: `calc(90px + 2*60px*${cols})`,
      margin: '0 auto',
      border: '10px solid rgb(136, 128, 152)',
      overflowX: `scroll`,
      positon: 'relative'
    }}>
      <CompleteDialog
        modalIsOpen={modalIsOpen}
        handleCloseDialog={handleCloseDialog}
        gridId={gridId}
        timeResult={timeResult}
        isLose={isLose}
        handleRestart={handleRestart}
      />

      <Timer getTimeResult={setTimeResult} timeBegin={timeBegin} isLose={isLose} check={isPlayComplete} />
      <div style={{
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
      }}>
        <GiTrophy style={{
          fontSize: '30px',
          color: '#fede00',  
        }} />
        <span style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color:'green'
        }}>BEST TIME: {nonogram?.meta?.bestPlayTime?.value}s</span>
      </div>
      <Grid
        rows={rows}
        cols={cols}
        mode="play"
        showedHints={showedHints}
        updateGridData={updateGridData}
        isPlayComplete={isPlayComplete}
        handleHealth={setHealth}
      />

      {/* Action */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',

      }}>


        <p style={{
          height: '70px',
          width: '70px',
          borderRadius: '50%',
          border: 'solid 1px rgba(0,0,0,0.1)',
          backgroundColor: '#f65ac3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          position: 'relative',
          cursor: isPlayComplete ? '' : 'pointer',
        }}>
          <FaLightbulb style={{
            color: '#fede00',
            fontSize: '30px',
            transform: 'rotate(-20deg)'
          }} onClick={(isPlayComplete || (5 - showedHints) == 0) ? undefined : handleShowHint} />
          <span style={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#700f4c',

            // boxShadow: 'inset -2px 13px 93px -9px rgba(250,0,250,1)',
            top: '0',
            right: '0',
            color: 'white'
          }}>{5 - showedHints}</span>
        </p>



      </div>



    </div>
  )
}

export default Play