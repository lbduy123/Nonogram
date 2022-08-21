import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import nonogramService from '../features/nonograms/nonogramService';

const customStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '20%',
    height: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
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
      <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Complete</h1>
      <p>{timeResult?.hours}:{timeResult?.minutes}:{timeResult?.seconds}</p>
      <div style={{ fontSize: 50 }}>
        <AiFillStar /><AiFillStar /><AiOutlineStar />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-primary" onClick={closeModal}>Close</button>
        <button className="btn btn-primary" onClick={returnHome}>Homepage</button>
      </div>
    </Modal>
  )
}

export default React.memo(CompleteDialog)