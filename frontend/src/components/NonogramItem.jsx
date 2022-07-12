import {useDispatch} from 'react-redux'
import {deleteNonogram} from '../features/nonograms/nonogramSlice'

function NonogramItem({nonogram}) {
    const dispatch = useDispatch()

    return (
        <div className="goal">
            <div>
                {new Date(nonogram.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{nonogram.rows}</h2>
            <h2>{nonogram.cols}</h2>
            <button onClick={() => dispatch(deleteNonogram(nonogram._id))} className="close">x</button>
        </div>
    )
}

export default NonogramItem