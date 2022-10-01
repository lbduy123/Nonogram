import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NonogramItem from '../components/NonogramItem/NonogramItem'
import Spinner from '../components/Spinner/Spinner'
import { getAllWorkshopNonograms, getNonograms, reset } from '../features/nonograms/nonogramSlice'
import styles from './Dashboard.module.css'
import { AiOutlineSearch, AiFillFilter, AiFillCaretDown } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { handleFilterByMode, handleFilterBySearch, handleFilterBySort } from './PlayGroundHelper'
import { MAX_ITEM_PER_PAGE, MODE_LIST, SORT_LIST } from '../Util/Setting'


function checkItemwithUser(nonogram, userId) {
  const result = nonogram?.meta?.played?.by.find((info) => info.id === userId)
  if (result !== undefined) {
    return { isPlayed: true, bestTime: result.bestTime }
  } else {
    return { isPlayed: false, bestTime: 0 }
  }
}

function WorkShop() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { allWorkshopNonograms, isLoading, isError, message } = useSelector(
    (state) => state.nonograms
  )

  const [sortByItem, setSortByItem] = useState(false);
  const [checked, setChecked] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [Nonogram, setNonogram] = useState(allWorkshopNonograms)
  const [pageIndex, setPageIndex] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([])
  const [isMyNonogram, setIsMynonogram] = useState(false)


  const typingTimeoutRef = useRef(null)
  const totalPage = useRef(null)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getAllWorkshopNonograms());
    dispatch(getNonograms());

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  useEffect(() => {
    setNonogram(allWorkshopNonograms);
  }, [allWorkshopNonograms])

  useEffect(() => {
    totalPage.current = Math.ceil(Nonogram.length / MAX_ITEM_PER_PAGE)
    let pageNumbers = [];
    for (let i = 1; i <= (totalPage.current); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers)

  }, [Nonogram])

  if (isLoading) {
    return <Spinner />
  }
  const handleCheckMode = (checkItem) => {
    setChecked(prev => {
      const isChecked = checked.includes(checkItem);
      if (isChecked) {
        return checked.filter(item => item !== checkItem);
      } else if(checkItem === "all") {
        return [checkItem]
      }
      else if(!checked.includes("all")) {
        return [...prev, checkItem]
      }
      else{
        return ['all']
      }
    })
    let Array = checked;
    const isChecked = Array.includes(checkItem);
      if (isChecked) {
        Array =  Array.filter(item => item !== checkItem);
      } else if(checkItem === "all") {
        Array = [checkItem];
      } 
      else if(!Array.includes("all")) {
        Array =  [...Array, checkItem]
      }
      else{
        Array =  ['all']
      }
      handleFilter(searchContent, sortByItem,Array,isMyNonogram);
  }
  const handleChangeSort = (sortItem) => {
    setSortByItem(sortItem)
    handleFilter(searchContent, sortItem,checked,isMyNonogram)
  }
  const handleChangeInput = (event) => {
    const value = event;
    setSearchContent(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {

      handleFilter(value, sortByItem,checked,isMyNonogram);
    }, 200)
  }
  const handleClearInPut = () => {
    setSearchContent("");
    handleFilter("",sortByItem,checked,checked, isMyNonogram);
  }

  const handleActiveNonogramUser = (check)=>{
    setIsMynonogram(!check);
    handleFilter(searchContent, sortByItem,checked, !check)
  }
  const handleFilter = (searchText, sortOption,CheckOption = [], CheckUser=false) => {
    setPageIndex(1);
    let nonogramFilter = Nonogram;
    console.log(CheckUser);
    if(CheckUser) {
      nonogramFilter = allWorkshopNonograms.filter((nonogram)=>nonogram.author === user._id)
    }
    else {
      nonogramFilter = allWorkshopNonograms
    }
    nonogramFilter = handleFilterBySearch(nonogramFilter,searchText)
    
    if(handleFilterBySort(nonogramFilter,sortOption)){
      nonogramFilter = handleFilterBySort(nonogramFilter,CheckOption)
    }

    if(handleFilterByMode(nonogramFilter,CheckOption)){
      nonogramFilter = handleFilterByMode(nonogramFilter,CheckOption)
    }
    setNonogram(nonogramFilter);
  }

  const handleChangePage = (pageNumber) => {

    setPageIndex(pageNumber)
  }

  return (
    <section className={styles['playground']}>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <div>
            <h1>WorkShop</h1>
          </div>
          <div className={styles['playground__action']}>
            <div className={styles['playground__search']}>
              <span className={styles['playground__searchIcon']}><AiOutlineSearch /></span>
              <input value={searchContent} id="searchInput" onChange={(e) => handleChangeInput(e.target.value)} className={styles['playground__searchInput']} type="text" placeholder="Search your game" />
            </div>
            <div onClick={() => handleActiveNonogramUser(isMyNonogram)}className={isMyNonogram? `${styles['playground__filterActive']}`: `${styles['playground__filter']}`}>
              <span className={styles['playground__filterIcon']}><AiFillFilter /></span>
              <p style={{marginLeft: '5px'}}> Your game</p>
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
        <div className={styles['content']}>
          <div className={styles['content__gameList']}>
            <div className={styles['content__tagList']} >
              {sortByItem ? <div className={styles['tagList__item']}>
                <span>Sort</span>
                <div onClick={() => {
                  setSortByItem(false)
                }} className={styles['tagList__itemValue']}>
                  {sortByItem}
                  <span><TiDelete /></span>
                </div>
              </div> :
                ""
              }

              {checked.length > 0 ?
                <div className={styles['tagList__item']}>
                  <span>Mode</span>
                  {checked.map((item, index) => {
                    return <div onClick={() => {
                      handleCheckMode(item)
                    }} key={`${item}-${index}`} className={styles['tagList__itemValue']}>
                      {item}
                      <span><TiDelete /></span>
                    </div>
                  })}
                </div> :
                ''
              }
              {searchContent ?
                <div className={styles['tagList__item']}>
                  <span>Search By Name:</span>
                  <div onClick={() => handleClearInPut()} className={styles['tagList__itemValue']}>
                    {searchContent}
                    <span><TiDelete /></span>
                  </div>
                </div> :
                ''
              }

            </div>
            {allWorkshopNonograms.length > 0 ? (
              <>
                <div className={styles['content__game']}>
                  {Nonogram.slice((pageIndex - 1) * MAX_ITEM_PER_PAGE, (pageIndex * MAX_ITEM_PER_PAGE)).map((nonogram) => {
                    const { isPlayed, bestTime } = checkItemwithUser(nonogram, user?._id)
                    return <NonogramItem isPlayed={isPlayed} bestTime={bestTime} userId={user?._id} key={nonogram?._id} nonogram={nonogram} isEditShown={false} />
                  })}
                </div>
                <div className={styles['content__Pagination']}>
                  <span className={styles['Pagination__item']}>&laquo;</span>
                  {pageNumbers.map((item, index) => {
                    return <span onClick={() => { handleChangePage(item) }} className={pageIndex !== item ? `${styles['Pagination__item']}` : `${styles['Pagination__itemActive']}`} key={index}>{item}</span>
                  })}
                  <span className={styles['Pagination__item']}>&raquo;</span>
                </div>
              </>
            ) : (<h3>Not available</h3>)}

          </div>
          <div className={styles['content__filter']}>
            <div className={styles['fitler__mode']}>
              <p className={styles['mode__header']}>
                Mode
              </p>
              <form className={styles['mode__content']}>
                {MODE_LIST.map((checkItem, index) => {
                  return <div key={`${checkItem}-${index}`} className={styles['mode__item']}>
                    <input
                      type="checkbox"
                      checked={checked.includes(checkItem)}
                      onChange={() => handleCheckMode(checkItem)}
                    />
                    {checkItem}
                  </div>
                })}
              </form>

            </div>
            <div className={styles['filter__clearAll']}>
              <span onClick={() => {
                setChecked([]);
              }} className={styles['filter__clearButton']}>Clear All</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkShop


