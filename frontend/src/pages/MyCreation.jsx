import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import { getNonograms, reset } from '../features/nonograms/nonogramSlice'
import NonogramItem from '../components/NonogramItem/NonogramItem'
import styles from './MyCreation.module.css'

import { MdCreateNewFolder } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

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
		<section className={styles['myCreation']}>
			<div className={styles['container']}>
				<div className={styles['header']}>
					<div>
						<img className={styles['header__avatar']} width="200" height="auto" src={`https://i.pravatar.cc/150?u=${user._id}`} alt="xin chào user" />
						<p className={styles['header__name']}>{user.name}</p>
					</div>
					<div className={styles['header__action']}>
						<p onClick={handleCreate} className={styles['action__item']}>Create your game</p>
						<p className={styles['action__item']}>Profile</p>
					</div>
					<div className={styles['header__analyzer']}>
						<span>Game: </span>
						<span>{nonograms.length}</span>
					</div>

				</div>
				<div className={styles['nonogram__list']}>
					<div className={styles['nonogram__create']}>
						<div className={styles['nonogram__createWrapper']}>
							<p>Show off your best work. Get feedback, likes and be a part of a growing community.</p>
						</div>

											
							<div onClick={handleCreate} className={styles['action__item']}>
								<span><FaPlus className={styles['action__icon']} /></span>
								<span>Create your game</span>
							</div>
						
					</div>
					{nonograms.length > 0 ? (
						<>
							{nonograms.map((nonogram) => (
								<NonogramItem key={nonogram._id} nonogram={nonogram} isEditShown={true} />
							))}
						</>
					) : (<h3>Currently have no creation</h3>)}
				</div>



			</div>


		</section>
	)
}

export default MyCreation