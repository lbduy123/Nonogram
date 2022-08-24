import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux'
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";
import ColumnHints from "../Hints/ColumnHints";

const Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, handleHealth }) => {

	const [newState, setNewState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
	const [viewState, setViewState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
	const [blur, setBlur] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)

	const { nonogram } = useSelector(
		(state) => state.nonograms
	)
	
	
	// Clear grid when changing rows or cols
	useEffect(() => {
		if (mode !== "edit") {
			const newGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
			setNewState(newGrid)
		} else if (isLoaded) {
			const viewGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
			setViewState(viewGrid)
			updateGridData(viewGrid)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rows, cols, mode])

	useEffect(() => {
		// Load grid from store
		if (mode === "edit") {
			const viewGrid = (nonogram.gridData ?
				nonogram.gridData.map(Object.values) :
				Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
			updateGridData(viewGrid)
			setViewState(viewGrid)
			setIsLoaded(true)
		}

		// Show ramdomized cell hint 
		if (mode === "play") {
			const gridData = (nonogram.gridData ?
				nonogram.gridData.map(Object.values) :
				Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))

			let remainingTrueCells = []
			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					if (newState[i][j] === false &&
						gridData[i][j] === true &&
						showedHints !== 0) {
						remainingTrueCells.push({ rowIndex: i, columnIndex: j })
					}
				}
			}
			if (showedHints !== 0 && remainingTrueCells.length > 0) {
				handleCellClick(remainingTrueCells[Math.floor(Math.random() * remainingTrueCells.length)], true)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps

	}, [mode, nonogram.gridData, showedHints])


	const handleCellClick = (props, isActive) => {
		if (mode !== "edit") {
			// Update new grid in play & new mode
			let newGrid = [...newState]
			newGrid[props.rowIndex][props.columnIndex] = isActive
			
			if (mode === "play") {
				if(!isActive){
					handleHealth(prev=>prev-1)
				}
				// Check if row is correct & blur rowHints
				let rowCorrect = true;
				for (let i = 0; i < cols; i++) {
					if (newGrid[props.rowIndex][i] !== nonogram.gridData[props.rowIndex][i]) {
						rowCorrect = false
						break;
					}
				}
				if (rowCorrect === true) {
					// Make rowHints blur
					document.getElementById(`rowHint-${props.rowIndex}`).classList.add("row-hint-blur");

					// Blur false row cells
					newGrid[props.rowIndex].forEach((value, colIdx) => {
						if (newGrid[props.rowIndex][colIdx] === false &&
							!isElExistInArray([props.rowIndex, colIdx], blur) &&
							(document.getElementById(`${props.rowIndex}-${colIdx}`)).className !== 'cell-invalid') {
							setBlur((prevState) => (
								[...prevState, [props.rowIndex, colIdx]]
							))
						}
					})
				}

				// Check if column is correct & blur columnHints
				let colCorrect = true;
				for (let i = 0; i < rows; i++) {
					if (newGrid[i][props.columnIndex] !== nonogram.gridData[i][props.columnIndex]) {
						colCorrect = false
						break;
					}
				}
				if (colCorrect === true) {
					// Make columnHints blur
					document.getElementById(`colHint-${props.columnIndex}`).classList.add("col-hint-blur");

					// Blur false column cells
					newGrid.forEach((value, rowIdx) => {
						if (newGrid[rowIdx][props.columnIndex] === false &&
							!isElExistInArray([rowIdx, props.columnIndex], blur) &&
							(document.getElementById(`${rowIdx}-${props.columnIndex}`)).className !== 'cell-invalid') {
							setBlur((prevState) => (
								[...prevState, [rowIdx, props.columnIndex]]
							))
						}
					})
				}
			}
			
			
			
			setNewState(newGrid)
			updateGridData(newGrid);
		} else {
			// Update new grid in edit mode
			let viewGrid = [...viewState]
			viewGrid[props.rowIndex][props.columnIndex] = isActive
			setViewState(viewGrid)
			updateGridData(viewGrid);
		}
	}

	// Check if an array element is in 2d array
	const isElExistInArray = (el, array) => {
		return ((array.some(
			r => r.length === el.length &&
				r.every((value, index) => el[index] === value)
		)) ? true : false)
	}

	const className =
		rows === 10 ? 'nonogram-10' :
			(rows === 15 ? 'nonogram-15' :
				(rows === 20 ? 'nonogram-20' : ''))

	return (
		<div style={mode === "play" ? {
			marginTop: '50px',
			marginBottom: '50px',
			paddingRight: '0px',
			paddingLeft: '10px',

		} : {}} className={className}>
			<ColumnHints gridData={mode === "new" ?
				newState : (mode === "edit" ? viewState : nonogram.gridData)} />

			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}>
				<RowHints
					gridData={mode === "new" ?
						newState : (mode === "edit" ? viewState : nonogram.gridData)} />

				<div style={{
					display: "flex"
				}}>
					<table className="grid-table">
						<tbody>
							{[...Array(rows)].map((row, rowIndex) => {
								
								return (
									<tr className="row" key={rowIndex}>
										{[...Array(cols)].map((cell, columnIndex) => {
											return (
												<Cell
													key={rowIndex + "-" + columnIndex}
													mode={mode}
													rowIndex={rowIndex}
													columnIndex={columnIndex}
													isPlayComplete={isPlayComplete}
													isBlur={isElExistInArray([rowIndex, columnIndex], blur) ? true : false}
													isActive={mode !== "edit" ?
														(newState[rowIndex] ? (newState[rowIndex][columnIndex]) : false) :
														(viewState[rowIndex] ? (viewState[rowIndex][columnIndex]) : false)}
													handleCellClick={handleCellClick}
												/>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<RowHints hidden={true} gridData={mode === "new" ?
					newState : (mode === "edit" ? viewState : nonogram.gridData)} />

			</div>
		</div>

	);
};

export default Grid;