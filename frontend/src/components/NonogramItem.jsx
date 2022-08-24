import { useDispatch } from 'react-redux'
import { deleteNonogram, updateNonogramPlayed } from '../features/nonograms/nonogramSlice'
import { useNavigate } from 'react-router-dom'
import styles from './NonogramItem.module.css'
import { MdPlayArrow } from "react-icons/md";

import { AiFillLike } from "react-icons/ai";

function NonogramItem({ isEditShown, nonogram, userId }) {
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
					<h4>{(nonogram.rows>5||nonogram.cols>5)?((nonogram.rows>10||nonogram.cols>10)?((nonogram.rows>15||nonogram.cols>15)?"Super Hard":"Hard"):"Normal"):"Easy"}</h4>
					<hr />
					<h4>Social Mode</h4>
				</div>
				<div className={`${styles['matchingPicture']}`}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 5 5" shapeRendering="crispEdges"><path stroke="#000" d="M1 0h3M3 1h1M2 2h1M2 4h1" /></svg>

				</div>
				<div className={`${styles['socialIcon']}`}>
					<MdPlayArrow className={`${styles['play']}`} /> <span>{nonogram.meta.played.quantity}</span>
					<AiFillLike className={nonogram.meta.votes.includes(userId)?`${styles['like--active']}`:`${styles['like']}`} /> <span>{nonogram.meta.votes.length}</span>
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