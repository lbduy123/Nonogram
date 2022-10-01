import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NonogramItem from '../components/NonogramItem/NonogramItem'
import Spinner from '../components/Spinner/Spinner'
import { deleteNonogram, getAllNonograms, reset } from '../features/nonograms/nonogramSlice'
import { SORT_LIST } from '../Util/Setting'
import { AiOutlineSearch, AiFillFilter, AiFillCaretDown, AiOutlineCaretDown } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'
import styles from './Dashboard.module.css'
import { handleFilterBySearch, handleFilterBySort } from './PlayGroundHelper'
import { getAllUser } from '../features/auth/authSlice'
var toggleSortByType = false;
var toggleSortByUser = false;
function AdminDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, userList } = useSelector((state) => state.auth)
  const { allNonograms, isLoading, isError, message } = useSelector(
    (state) => state.nonograms
  )

  const [searchContent, setSearchContent] = useState("");
  const [sortByItem, setSortByItem] = useState(false);
  const [Nonogram, setNonogram] = useState(allNonograms);

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user || user.roleLevel !== 9) {
      navigate('/')
    }

    dispatch(getAllNonograms())


    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    setNonogram(allNonograms);
  }, [allNonograms])

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  const handleChangeSort = (sortItem) => {
    setSortByItem(sortItem)
    handleFilter(searchContent, sortItem)
  }
  const handleChangeInput = (event) => {
    const value = event;
    setSearchContent(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {

      handleFilter(value, sortByItem);
    }, 200)
  }

  const handleFilter = (searchText, sortOption, CheckOption = []) => {


    let nonogramFilter = handleFilterBySearch(allNonograms, searchText)

    if (handleFilterBySort(nonogramFilter, sortOption)) {
      nonogramFilter = handleFilterBySort(nonogramFilter, CheckOption)
    }

    setNonogram(nonogramFilter);
  }
  const handleSortByType = () => {
    toggleSortByType = !toggleSortByType;
    let newArray = [...Nonogram]
    let sortNonogram = newArray.sort((a, b) => {
      if (toggleSortByType) {
        if (a.type < b.type) { return -1; }
        if (a.type > b.type) { return 1; }
        return 0;
      } else {
        if (a.type < b.type) { return 1; }
        if (a.type > b.type) { return -1; }
        return 0;
      }
      
    })
    setNonogram(sortNonogram);
  }
  const handleSortByUser = () => {
    toggleSortByUser = !toggleSortByUser;
    let newArray = [...Nonogram];
    let sortNonogram = newArray.sort((a, b) => {
      if (toggleSortByUser) {
        if (a.author < b.author) { return -1; }
        if (a.author > b.author) { return 1; }
        return 0;
      } else {
        if (a.author < b.author) { return 1; }
        if (a.author > b.author) { return -1; }
        return 0;
      }

    })
    setNonogram(sortNonogram);
  }
  const renderNonogram = () => {
    return Nonogram.map((item, index) => {
      return <tr className={styles['adminTableRow']} key={index}>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.rows}x{item.cols}</td>
        <td>{item.createdAt}</td>
        <td>
          <div className={styles['CreatedByUser']}>
            <img width="34" height="34" src={`https://i.pravatar.cc/150?u=${item.author}`} alt="xin chào user" />
            <p>{userList?.find((user) => user._id === item.author)?.name}</p>
          </div>
        </td>
        <td>{item.meta.played?.quantity}</td>
        <td>{item.meta.votes?.length}</td>
        <td >
          <div className={styles['table__actionWrraper']}>
            <button onClick={() => dispatch(deleteNonogram(item._id))}  title="remove" > <RiDeleteBin5Line className={styles['table__icon']} /> </button>
          </div>


        </td>
      </tr>
    })
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="AdminDashboard">
        <div className={styles['container']}>
          <div className={styles['header']}>
            <h1>Admin Dashboard</h1>
            <div className={styles['playground__action']}>
              <div className={styles['playground__search']}>
                <span className={styles['playground__searchIcon']}><AiOutlineSearch /></span>
                <input value={searchContent} id="searchInput" onChange={(e) => handleChangeInput(e.target.value)} className={styles['playground__searchInput']} type="text" placeholder="Search your game" />
              </div>
              <div className={styles['playground__filter']}>
                <span className={styles['playground__filterIcon']}><AiFillFilter /></span>
                <p>FIlter</p>
              </div>
              <div className={styles['playground__sortBy']}>
                <div className={styles['sortBy__select']}>
                  <span>Sort by: </span>
                  <span>{sortByItem ? sortByItem : SORT_LIST[0]}  <AiFillCaretDown /></span>
                </div>
                <div className={styles['sortBy__dropdownList']}>
                  {SORT_LIST.map((listItem, index) => {
                    return <div onClick={() => {
                      handleChangeSort(listItem);
                    }} key={`${listItem}-${index}`} className={styles['dropdownList__item']}>{listItem}</div>
                  })}
                </div>

              </div>
            </div>
          </div>
          <div className="content">
            <table cellSpacing="0" cellPadding="0" style={{ width: '100%', borderCollapse: 'separate', border: 'none' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>
                    <div onClick={handleSortByType}>
                      <span>Type</span>
                      <AiOutlineCaretDown style={{ transform: `${toggleSortByType ? `rotate(180deg)` : ``}` }} className={'sortIcon'} />
                    </div>

                  </th>
                  <th>Size</th>
                  <th>Created Date</th>
                  <th>
                  <div onClick={handleSortByUser}>
                      <span>By</span>
                      <AiOutlineCaretDown style={{ transform: `${toggleSortByUser ? `rotate(180deg)` : ``}` }} className={'sortIcon'} />
                    </div>
                  </th>
                  <th>Played</th>
                  <th>Liked</th>
                  <th>Action</th>
                </tr>

              </thead>
              <tbody>
                {renderNonogram()}

              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* <section className="heading">
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
      </section> */}
    </>
  )
}

export default AdminDashboard


