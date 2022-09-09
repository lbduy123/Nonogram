import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NonogramItem from '../components/NonogramItem/NonogramItem'
import Spinner from '../components/Spinner/Spinner'
import { getAllCasualNonograms, getAllWorkshopNonograms, reset } from '../features/nonograms/nonogramSlice'

function checkItemwithUser(nonogram, userId) {
  const result = nonogram?.meta?.played?.by.find((info) => info.id === userId)
  if (result !== undefined) {
    return { isPlayed: true, bestTime: result.bestTime }
  } else {
    return { isPlayed: false, bestTime: 0 }
  }
}

function AdminDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { allCasualNonograms, allWorkshopNonograms, isLoading, isError, message } = useSelector(
    (state) => state.nonograms
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user || user.roleLevel !== 9) {
      navigate('/')
    }

    dispatch(getAllCasualNonograms())
    dispatch(getAllWorkshopNonograms())

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
        <h1>Welcome {user && user.name}</h1>
        <p>Admin Dashboard</p>
      </section>

      <section className="content">
        <ul className="btn-header-area">
          <li>
            <Link to='/new'>
              New Nonogram
            </Link>
          </li>
        </ul>

        <h2>Casual Nonograms</h2>
        {allCasualNonograms.length > 0 ? (
          <div className="goals">
            {allCasualNonograms.map((nonogram) => {
              const { isPlayed, bestTime } = checkItemwithUser(nonogram, user?._id)
              return <NonogramItem isPlayed={isPlayed} bestTime={bestTime} userId={user?._id} key={nonogram?._id} nonogram={nonogram} isEditShown={false} />
            })}
          </div>
        ) : (<h3>Not available</h3>)}

        <h2>Workshop Nonograms</h2>
        {allWorkshopNonograms.length > 0 ? (
          <div className="goals">
            {allWorkshopNonograms.map((nonogram) => {
              const { isPlayed, bestTime } = checkItemwithUser(nonogram, user?._id)
              return <NonogramItem isPlayed={isPlayed} bestTime={bestTime} userId={user?._id} key={nonogram?._id} nonogram={nonogram} isEditShown={false} />
            })}
          </div>
        ) : (<h3>Not available</h3>)}
      </section>
    </>
  )
}

export default AdminDashboard


