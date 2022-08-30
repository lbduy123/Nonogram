import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux'
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";
import ColumnHints from "../Hints/ColumnHints";
import { getColBlur, getRemainingTrueCells, getRowBlur, isElExistInArray, new2dArray } from "./GridHelper";

const Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, handleHealth }) => {

	const [newState, setNewState] = useState(new2dArray(rows, cols))
	const [viewState, setViewState] = useState(new2dArray(rows, cols))
	const [blur, setBlur] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)

	const { nonogram } = useSelector(
		(state) => state.nonograms
	)

	// Clear grid when changing rows or cols
	useEffect(() => {
		if (mode !== "edit") {
			const newGrid = new2dArray(rows, cols)
			setNewState(newGrid)
		} else if (isLoaded) {
			const viewGrid = new2dArray(rows, cols)
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
				new2dArray(rows, cols))
			updateGridData(viewGrid)
			setViewState(viewGrid)
			setIsLoaded(true)
		}

		// Show ramdomized cell hint 
		if (mode === "play") {
			const gridData = (nonogram.gridData ?
				nonogram.gridData.map(Object.values) :
				new2dArray(rows, cols))

			let remainingTrueCells = getRemainingTrueCells(rows, cols, newState, gridData, showedHints)
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
				if (!isActive) {
					handleHealth(prev => prev - 1)
				}
				// Check if row is correct & blur rowHints
				let rowBlur = getRowBlur(newState, nonogram.gridData, cols, props.rowIndex, blur, isActive)
				let rowCellsToBlur = rowBlur.rowCellsToBlur
				if (rowBlur.isRowBlur) document.getElementById(`rowHint-${props.rowIndex}`).classList.add("row-hint-blur");

				// Blur false cells of the row
				if (rowCellsToBlur) {
					rowCellsToBlur.forEach((value) => {
						setBlur((prevState) => (
							[...prevState, value]
						))
					})
				}

				// Check if column is correct & blur columnHints
				let colBlur = getColBlur(newState, nonogram.gridData, rows, props.columnIndex, blur, isActive)
				let colCellsToBlur = colBlur.colCellsToBlur
				if (colBlur.isColBlur) document.getElementById(`colHint-${props.columnIndex}`).classList.add("col-hint-blur");

				// Blur false cells of the column
				if (colCellsToBlur) {
					colCellsToBlur.forEach((value) => {
						setBlur((prevState) => (
							[...prevState, value]
						))
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

	return (
		<div style={mode === "play" ? {
			marginTop: '50px',
			marginBottom: '50px',
			paddingRight: '0px',
			paddingLeft: '10px',
		} : {}}>
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