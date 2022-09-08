import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { useState } from 'react'
import { AiFillStar, AiTwotoneCrown, AiFillLike, AiOutlineClockCircle, AiOutlineHome } from 'react-icons/ai'
import { MdRestartAlt } from 'react-icons/md'
import { useSelector } from 'react-redux';
import nonogramService from '../../features/nonograms/nonogramService';
import styles from './CompleteDialog.module.css'
import { convertTimeToMSM, convertToMiliSecond } from '../Timer/TimeHelper';

const customStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '18%',
    height: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    background: 'rgba( 255, 255, 255, 0.75 )',
    boxShadow: ' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 4px )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
    position: 'relative'
  },
};

Modal.setAppElement('#root');

function CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult, isLose, handleRestart, yourBestTime, isLiked }) {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(modalIsOpen);
  const [isLike, setIsLike] = useState(isLiked)
  React.useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen])

  React.useEffect(() => {setIsLike(isLiked)},[isLiked])
  const navigate = useNavigate()

  function afterOpenModal() {
    if (isLose === false) {
      const timeResultConvert = convertToMiliSecond('minute',timeResult.minutes) + convertToMiliSecond('second',timeResult.seconds) + timeResult.miliseconds
      nonogramService.updateNonogramPlayed({ nonogramId: gridId, bestTime: timeResultConvert }, user.token);
    }
  }

  const closeModal = () => {
    handleCloseDialog();
  }

  const handleLike = () => {
    if (user) {
      nonogramService.updateNonogramVotes(gridId, user.token)
      setIsLike(!isLike)
    }
  }

  const returnHome = () => {
    navigate('/')
  }

  const tryAgain = () => {
    handleRestart()
    handleCloseDialog();
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={customStyles}
      contentLabel="Complete dialog"
    >
      <span className={styles['closeButton']} onClick={closeModal} >x</span>
      <h1 style={{
        marginBottom: '0'
      }}>{isLose ? 'Loser' : 'Winner'}</h1>
      <div className={styles['scoreRating']}>
        <AiFillStar className={styles['starIcon--active']} />
        <AiFillStar style={{ transform: 'translateY(-12px)' }} className={styles['starIcon--active']} />
        <AiFillStar className={styles['starIcon--nonActive']} />
      </div>

      <div className={styles['playingTimeInner']}>
        <div className={styles['playingTimeIcon']}>
          <AiOutlineClockCircle className={styles['clockIcon']} />
        </div>
        <h1>{timeResult?.minutes}:{timeResult?.seconds}:{timeResult?.miliseconds}</h1>
      </div>

      {isNaN(yourBestTime) ? "" : <div className={styles['yourBestTimeInner']}>
        <h3>YOUR BEST TIME</h3>
        <p >{convertTimeToMSM('minute',yourBestTime)}:{convertTimeToMSM('second',yourBestTime)}:{convertTimeToMSM('milisecond',yourBestTime)}</p>
        <AiTwotoneCrown className={styles['CrownIcon']} />

      </div>}
      <div className={styles['actionInner']}>
        <span onClick={handleLike} className={`${styles['vote']} ${isLike ? `${styles['active']}` : ``}`}><AiFillLike  className={styles['likeIcon']} /></span>
        <span onClick={returnHome} className={styles['backToHome']}><AiOutlineHome /></span>
        <span onClick={tryAgain} className={styles['returnIcon']}><MdRestartAlt /></span>
      </div>
    </Modal>
  )
}

export default React.memo(CompleteDialog)