import { useDispatch } from 'react-redux'
import { deleteNonogram, getNonogram } from '../features/nonograms/nonogramSlice'
import { useNavigate } from 'react-router-dom'

function NonogramItem({ nonogram }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleEdit = (e) => {
		e.preventDefault()
		// dispatch(getNonogram(nonogram._id))
		navigate('/' + nonogram._id)
	}

	return (
		<div className="goal">
			<div>
				{new Date(nonogram.createdAt).toLocaleString('en-US')}
			</div>
			<h2>{nonogram.rows}x{nonogram.cols}</h2>
			<button onClick={() => dispatch(deleteNonogram(nonogram._id))} className="close"></button>
			<button onClick={handleEdit} className="edit">Edit</button>
			<button onClick={() => dispatch(deleteNonogram(nonogram._id))} className="play">Play</button>
		</div>
	)
}

export default NonogramItem