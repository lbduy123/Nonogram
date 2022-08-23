import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNonogram } from '../../features/nonograms/nonogramSlice'
import Grid from '../../components/Grid/Grid'
import Spinner from '../../components/Spinner'
import CompleteDialog from '../../components/CompleteDialog'
import Timer from '../../components/Timer/Timer'
import { FcIdea } from 'react-icons/fc'
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
  const [isPlayComplete, setIsPlayComplete] = useState(false)
  const [timeResult, setTimeResult] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [hint,isShowHint] = useState(1)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    timeBegin = new Date();
  }, [])
 
  
  const resultArray = useMemo(()=>{
    let array = []
    nonogram?.gridData?.forEach((dataX,rowIndex)=>{
      dataX.forEach((dataY,colIndedx)=>{
        if(dataY==true){
          array.push({
            row:rowIndex,
            col:colIndedx
          })
        }
        
      })
    })

    return array
  },[nonogram.gridData])
 
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
    // setRows(nonogram.rows)
    // setCols(nonogram.cols)

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
      setIsPlayComplete(true)
      handleOpenDialog()
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      border: '10px solid rgb(136, 128, 152)',
    }}>
      <CompleteDialog
        modalIsOpen={modalIsOpen}
        handleCloseDialog={handleCloseDialog}
        gridId={gridId}
        timeResult={timeResult}
      />

      <Timer getTimeResult={setTimeResult} timeBegin={timeBegin} check={isPlayComplete} />

      <Grid
        rows={rows}
        cols={cols}
        mode="play"
        updateGridData={updateGridData}
        isPlayComplete={isPlayComplete}
        resultArray={resultArray}
      />

      {/* Action */}
      <div style={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        marginBottom: '50px',
        paddingRight: '150px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginRight: '70px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '50px',
            backgroundColor: '#e7edf6',
            marginRight: '10px',
            borderRadius: '50%',
            fontSize: 'xx-large',
            color: '#b3b9c3'
          }}>X</div>


          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#324963',
            borderRadius: '50%',
          }}></div>
        </div>
        <p style={{
          height: '50px',
          width: '50px',
          borderRadius: '50%',
          border: 'solid 1px rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '-.5px 1px #888888',
          position: 'relative',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: '30px' }}><FcIdea /></span>

        </p>

      </div>



    </div>
  )
}

export default Play