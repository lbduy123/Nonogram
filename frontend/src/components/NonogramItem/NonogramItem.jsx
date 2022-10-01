import { useDispatch } from 'react-redux'
import { deleteNonogram, updateNonogramPlayed } from '../../features/nonograms/nonogramSlice';
import { useNavigate } from 'react-router-dom'
import styles from './NonogramItem.module.css'
import { MdPlayArrow } from "react-icons/md";

import { AiFillLike } from "react-icons/ai";
import { convertTimeToMSM } from '../Timer/TimeHelper';
import { memo } from 'react';
import { renderGameMode } from '../../Util/Setting';

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
		<>
			<div className={`${styles['container']}`}>
				<div className={`${styles['title']}`}>
					<h3>{nonogram.rows}x{nonogram.cols}</h3>
					<hr />
					<h4 className={`${styles['item__name']}`}>{nonogram.name}</h4>
					<hr />
					<h4 className={`${styles['item__mode']}`}>{renderGameMode(nonogram.rows,nonogram.cols)}</h4>
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
					{window.location.pathname !== '/' && window.location.pathname !== '/casual' ?
						<div className={`${styles['iconWrapper']}`}>
							<img className={`${styles['author__image']}`} src="https://i.pravatar.cc/150?u=12312" alt="author" />
							<p>Author</p>
						</div> :
						""
					}
					<div className={`${styles['iconWrapper']}`}>
						<MdPlayArrow className={`${styles['play']}`} />
						<p>{nonogram.meta.played.quantity}</p>
					</div>
					<div className={`${styles['iconWrapper']}`}>
						<AiFillLike className={nonogram.meta.votes.includes(userId) ? `${styles['like--active']}` : `${styles['like']}`} />
						<p>{nonogram.meta.votes.length}</p>
					</div>
				</div>
				<div className={`${styles['action']}`}>
					{window.location.pathname !== '/' && window.location.pathname !== '/workshop' && window.location.pathname !== '/casual' ?
						<span className={`${styles['removeButton']}`} onClick={() => dispatch(deleteNonogram(nonogram._id))} >x</span> :
						<></>}
					{isEditShown ? <span onClick={handleEdit} className={`${styles['playButton']}`}>Edit</span> : <span onClick={handlePlay} className={`${styles['playButton']}`}>Play</span>}
				</div>
			</div>
		</>
	)
}

export default memo(NonogramItem)