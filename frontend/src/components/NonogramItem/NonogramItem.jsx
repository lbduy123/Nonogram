import { useDispatch } from 'react-redux'
import { deleteNonogram, updateNonogramPlayed } from '../../features/nonograms/nonogramSlice';
import { useNavigate } from 'react-router-dom'
import styles from './NonogramItem.module.css'
import { MdPlayArrow } from "react-icons/md";

import { AiFillLike } from "react-icons/ai";
import { convertTimeToMSM } from '../Timer/TimeHelper';

function NonogramItem({ isEditShown, nonogram, userId, isPlayed, bestTime }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleEdit = (e) => {
		e.preventDefault()
		navigate('/e/' + nonogram._id)
	}

	const handlePlay = (e) => {
		e.preventDefault()
		dispatch(updateNonogramPlayed(nonogram._id));
		navigate('/p/' + nonogram._id)
	}


	return (
		<div className="goal">
			{/* <div>
				{new Date(nonogram.createdAt).toLocaleString('en-US')}
			</div>
			<h2>{nonogram.rows}x{nonogram.cols}</h2>
			<h3>Votes: {nonogram.meta.votes.length}</h3>
			<h3>Played: {nonogram.meta.played.quantity}</h3>
			{window.location.pathname !== '/' ?
				<button onClick={() => dispatch(deleteNonogram(nonogram._id))} className="close">x</button> :
				<></>}
			{isEditShown ? <button onClick={handleEdit} className="edit">Edit</button> : <></>}
			<button onClick={handlePlay} className="play">Play</button> */}
			<div className={`${styles['container']}`}>
				<div className={`${styles['title']}`}>
					<h3>{nonogram.rows}x{nonogram.cols}</h3>
					<hr />
					<h4>{(nonogram.rows > 5 || nonogram.cols > 5) ? ((nonogram.rows > 10 || nonogram.cols > 10) ? ((nonogram.rows > 15 || nonogram.cols > 15) ? "Super Hard" : "Hard") : "Normal") : "Easy"}</h4>
					<hr />
					<h4>Social Mode</h4>
				</div>
				<div className={`${styles['matchingPicture']}`}>
					{!isPlayed ?
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 5 5" shapeRendering="crispEdges"><path stroke="#000" d="M1 0h3M3 1h1M2 2h1M2 4h1" /></svg>
						:
						<>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="IconChangeColor" style={{ width: '50px', height: '50px' }}><path d="M223.7 130.8L149.1 7.77C147.1 2.949 141.9 0 136.3 0H16.03c-12.95 0-20.53 14.58-13.1 25.18l111.3 158.9C143.9 156.4 181.7 137.3 223.7 130.8zM256 160c-97.25 0-176 78.75-176 176S158.8 512 256 512s176-78.75 176-176S353.3 160 256 160zM348.5 317.3l-37.88 37l8.875 52.25c1.625 9.25-8.25 16.5-16.63 12l-46.88-24.62L209.1 418.5c-8.375 4.5-18.25-2.75-16.63-12l8.875-52.25l-37.88-37C156.6 310.6 160.5 299 169.9 297.6l52.38-7.625L245.7 242.5c2-4.25 6.125-6.375 10.25-6.375S264.2 238.3 266.2 242.5l23.5 47.5l52.38 7.625C351.6 299 355.4 310.6 348.5 317.3zM495.1 0H375.7c-5.621 0-10.83 2.949-13.72 7.77l-73.76 122.1c42 6.5 79.88 25.62 109.5 53.38l111.3-158.9C516.5 14.58 508.9 0 495.1 0z" id="mainIconPathAttribute" fill="#FEE101" /></svg>
							<p className={styles['bestTime']}>{convertTimeToMSM('minute', bestTime)}:{convertTimeToMSM('second', bestTime)}:{convertTimeToMSM('milisecond', bestTime)}</p>
						</>}
				</div>
				<div className={`${styles['socialIcon']}`}>
					<MdPlayArrow className={`${styles['play']}`} /> <span>{nonogram.meta.played.quantity}</span>
					<AiFillLike className={nonogram.meta.votes.includes(userId) ? `${styles['like--active']}` : `${styles['like']}`} /> <span>{nonogram.meta.votes.length}</span>
				</div>
				<div className={`${styles['action']}`}>
					{window.location.pathname !== '/' ?
						<span className={`${styles['removeButton']}`} onClick={() => dispatch(deleteNonogram(nonogram._id))} >x</span> :
						<></>}
					{isEditShown ? <span onClick={handleEdit} className={`${styles['playButton']}`}>Edit</span> : <span onClick={handlePlay} className={`${styles['playButton']}`}>Play</span>}
				</div>
			</div>
		</div>
	)
}

export default NonogramItem