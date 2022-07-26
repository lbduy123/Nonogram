import { useDispatch } from 'react-redux'
import { deleteNonogram } from '../features/nonograms/nonogramSlice'
import { useNavigate } from 'react-router-dom'

function NonogramItem({ nonogram }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleEdit = (e) => {
		e.preventDefault()
		navigate('/e/' + nonogram._id)
	}

	const handlePlay = (e) => {
		e.preventDefault()
		navigate('/p/' + nonogram._id)
	}

	return (
		<div className="goal">
			<div>
				{new Date(nonogram.createdAt).toLocaleString('en-US')}
			</div>
			<h2>{nonogram.rows}x{nonogram.cols}</h2>
			<button onClick={() => dispatch(deleteNonogram(nonogram._id))} className="close">x</button>
			<button onClick={handleEdit} className="edit">Edit</button>
			<button onClick={handlePlay} className="play">Play</button>
		</div>
	)
}

export default NonogramItem