import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createNonogram } from '../features/nonograms/nonogramSlice'
import Grid from './Grid/Grid'
import ColumnHints from './Hints/ColumnHints'

function NonogramForm() {
	const [rows, setRows] = useState(5)
	const [cols, setCols] = useState(5)
	let updatedGridData = []

	// const columnHintsData = Array.from(Array(cols).keys())
	const columnHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

	const { user } = useSelector((state) => state.auth)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const updateGridData = (gridData) => {
		updatedGridData = gridData
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const nonogramData = {
			rows,
			cols,
			gridData: updatedGridData
		}

		dispatch(createNonogram(nonogramData))
		toast.success("Create successfully")
		setRows(5)
		setCols(5)
		navigate('/creator/' + user._id)
	}

	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<select value={rows} onChange={(e) => setRows(parseInt(e.target.value))}>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={20}>20</option>
					</select>

					<select value={cols} onChange={(e) => setCols(parseInt(e.target.value))}>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={20}>20</option>
					</select>

					<div>
						<ColumnHints
							hintsData={columnHintsData} />

						<Grid
							rows={rows}
							cols={cols}
							updateGridData={updateGridData}
						/>
					</div>


				</div>

				<div className="form-group">
					<button className="btn btn-block" type="submit">
						Create this nonogram
					</button>
				</div>
			</form>
		</section>
	)
}

export default NonogramForm