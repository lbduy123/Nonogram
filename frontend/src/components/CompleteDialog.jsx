import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { useState } from 'react'
import { AiFillStar, AiOutlineStar, AiTwotoneCrown, AiOutlineLike, AiOutlineClockCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import nonogramService from '../features/nonograms/nonogramService';
import styles from './CompleteDialog.module.css'


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
    border: '1px solid rgba( 255, 255, 255, 0.18 )'
  },
};

Modal.setAppElement('#root');
let subtitle;

function CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult }) {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(modalIsOpen);

  React.useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen])
  const navigate = useNavigate()

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    nonogramService.updateNonogramPlayed({ nonogramId: gridId, bestTime: timeResult.seconds }, user.token);
    subtitle.style.color = '#000';
  }

  const closeModal = () => {
    if (user) {
      nonogramService.updateNonogramVotes(gridId, user.token)
    }
    handleCloseDialog();
  }

  const returnHome = () => {
    navigate('/')
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
      {/* <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Complete</h1>
      <p>{timeResult?.minutes}:{timeResult?.seconds}:{timeResult?.miliseconds}</p>
      <div style={{ fontSize: 50 }}>
        <AiFillStar /><AiFillStar /><AiOutlineStar />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-primary" onClick={closeModal}>Close</button>
        <button className="btn btn-primary" onClick={returnHome}>Homepage</button>
      </div> */}
      <h1 style={{
        marginBottom:'0'
      }}>Complete</h1>
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

      <div className={styles['yourBestTimeInner']}>
        <h3>YOUR BEST TIME</h3>
        <p >0:1:980</p>
        <AiTwotoneCrown className={styles['CrownIcon']} />

      </div>
      <div className={styles['actionInner']}>
        <span  onClick={closeModal} className={styles['vote']}><AiOutlineLike className={styles['likeIcon']} /></span>
        <span  onClick={returnHome} className={styles['backToHome']}>BACK TO HOME</span>
      </div>

    </Modal>
  )
}

export default React.memo(CompleteDialog)