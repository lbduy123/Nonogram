import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NonogramItem from '../components/NonogramItem/NonogramItem'
import Spinner from '../components/Spinner/Spinner'
import { getAllNonograms, reset } from '../features/nonograms/nonogramSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { allNonograms, isLoading, isError, message } = useSelector(
    (state) => state.nonograms
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getAllNonograms())

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
        <p>Nonograms Dashboard</p>
      </section>

      <section className="content">
        {allNonograms.length > 0 ? (
          <div className="goals">
            {allNonograms.map((nonogram) => (
              <NonogramItem userId={user?._id} key={nonogram?._id} nonogram={nonogram} isEditShown={false} />
            ))}
          </div>
        ) : (<h3>Not available</h3>)}
      </section>
    </>
  )
}

export default Dashboard