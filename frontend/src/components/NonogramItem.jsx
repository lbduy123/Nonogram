import { useDispatch } from 'react-redux'
import { deleteNonogram, updateNonogramPlayed } from '../features/nonograms/nonogramSlice'
import { useNavigate } from 'react-router-dom'

function NonogramItem({ isEditShown, nonogram }) {
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
			<div>
				{new Date(nonogram.createdAt).toLocaleString('en-US')}
			</div>
			<h2>{nonogram.rows}x{nonogram.cols}</h2>
			<h3>Votes: {nonogram.meta.votes.length}</h3>
			<h3>Played: {nonogram.meta.played.quantity}</h3>
			{window.location.pathname !== '/' ?
				<button onClick={() => dispatch(deleteNonogram(nonogram._id))} className="close">x</button> :
				<></>}
			{isEditShown ? <button onClick={handleEdit} className="edit">Edit</button> : <></>}
			<button onClick={handlePlay} className="play">Play</button>
		</div>
	)
}

export default NonogramItem