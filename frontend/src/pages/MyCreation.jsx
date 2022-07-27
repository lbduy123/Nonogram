import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getNonograms, reset } from '../features/nonograms/nonogramSlice'
import NonogramItem from '../components/NonogramItem'

function MyCreation() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.auth)
	const { nonograms, isLoading, isError, message } = useSelector(
		(state) => state.nonograms
	)

	const handleCreate = (e) => {
		e.preventDefault()
		navigate('/new')
	}

	useEffect(() => {
		if (isError) {
			console.log(message)
		}

		if (!user) {
			navigate('/login')
		}

		dispatch(getNonograms())

		return () => {
			dispatch(reset())
		}
	}, [user, navigate, isError, message, dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className="heading">
				<h1>{user.name}'s Creation</h1>
			</section>

			<section className="content">
				{nonograms.length > 0 ? (
					<div className="goals">
						{nonograms.map((nonogram) => (
							<NonogramItem key={nonogram._id} nonogram={nonogram} isEditShown={true} />
						))}
					</div>
				) : (<h3>Currently have no creation</h3>)}
			</section>

			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
				<button onClick={handleCreate} className="btn btn-primary">Create new nonogram</button>
			</div>
		</>
	)
}

export default MyCreation