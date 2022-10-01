import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import Spinner from '../../components/Spinner/Spinner'
import CompleteDialog from '../../components/CompleteDialog/CompleteDialog'
import Timer from '../../components/Timer/Timer'
import { FaLightbulb } from 'react-icons/fa'
import { GiTrophy } from 'react-icons/gi'
import { MdRestartAlt } from 'react-icons/md'
import { compareGridData, new2dArray } from '../../components/Grid/GridHelper'
import { convertTimeToMSM } from '../../components/Timer/TimeHelper'
import styles from './Play.module.css'
let timeBegin;
const MAXIMUM_HINTS = 5
function Play() {
  const location = useLocation()
  const gridId = location.pathname.substring(3)

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleCloseDialog = useCallback(() => setIsOpen(false), []);
  const handleOpenDialog = () => setIsOpen(true);

  const { user } = useSelector((state) => state.auth)
  const { nonogram, isError, message, isSuccess } = useSelector(
    (state) => state.nonograms
  )
  
  const [rows, setRows] = useState()
  const [cols, setCols] = useState()
  const [showedHints, setShowedHints] = useState(0)
  const [isPlayComplete, setIsPlayComplete] = useState(false)
  const [isLose, setIsLose] = useState(false)
  const [health, setHealth] = useState(4)
  const [isRestart, setIsRestart] = useState(false)
  const [timeResult, setTimeResult] = useState({
    minutes: 0,
    seconds: 0,
    miliseconds: 0
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(isSuccess){
      timeBegin = new Date();
    }
   
  }, [isSuccess])

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

  }, [user, navigate, isError, message, dispatch, gridId, nonogram.rows, nonogram.cols, isRestart])

  useEffect(() => {
    if (health < 1) {
      setIsLose(true)
      handleOpenDialog()
    }
  }, [health])

  let updatedGridData
  const resultGridData = (nonogram.gridData ?
    nonogram.gridData.map(Object.values) :
    new2dArray(rows, cols, false))

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
    setIsRestart(!isRestart);
    timeBegin = new Date();
  }


  const yourBestTime = nonogram?.meta?.played?.by.find((player) => player.id === user._id)?.bestTime
  const matchBestTime = nonogram?.meta?.bestPlayTime?.value
  const isDisableShowHint = isPlayComplete || isLose || MAXIMUM_HINTS - showedHints === 0
  const hindRemain = MAXIMUM_HINTS - showedHints
  const isLiked = nonogram?.meta?.votes.includes(user._id)

  return (
    <>
    {rows!==undefined && cols!==undefined?<div style={{
      maxWidth: `calc(90px + 2*60px*${cols})`,
    }}
      className={styles['playSection']}
    >
      <CompleteDialog
        modalIsOpen={modalIsOpen}
        handleCloseDialog={handleCloseDialog}
        gridId={gridId}
        timeResult={timeResult}
        isLose={isLose}
        isLiked ={isLiked}
        handleRestart={handleRestart}
        yourBestTime={yourBestTime}
      />

      <Timer getTimeResult={setTimeResult} timeBegin={timeBegin} isLose={isLose} check={isPlayComplete} />

      <div className={styles['bestTimeWrapper']}>
        {matchBestTime !== undefined ? <GiTrophy className={styles['bestTimeIcon']} /> : ""}
        {matchBestTime !== undefined ? <span className={styles['bestTimeNumber']}>BEST TIME: {convertTimeToMSM('minute', matchBestTime)}:{convertTimeToMSM('second', matchBestTime)}:{convertTimeToMSM('milisecond', matchBestTime)}</span> : ""}
      </div>

      <Grid
        rows={rows}
        cols={cols}
        mode="play"
        showedHints={showedHints}
        updateGridData={updateGridData}
        isPlayComplete={isPlayComplete}
        isLose={isLose}
        isRestart={isRestart}
        handleHealth={setHealth}
      />

      {/* Action */}
      <div className={styles['actionWrapper']}>
        <p
          style={{
            opacity: isDisableShowHint ? '0.8' : '1',
            cursor: isDisableShowHint ? '' : 'pointer',
          }}
          className={styles['innerAction']}>
          <FaLightbulb className={styles['showHintIcon']} onClick={isDisableShowHint ? undefined : handleShowHint} />
          <span className={styles['hintNumber']}>{hindRemain}</span>
        </p>
        <p className={styles['innerAction']}>
          <MdRestartAlt className={styles['restarIcon']} onClick={handleRestart} />
        </p>
        
      </div>
    </div>:<Spinner/> }
    </>
    
  )
}

export default Play