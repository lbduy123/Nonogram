import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux'
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";
import ColumnHints from "../Hints/ColumnHints";
import { getColBlur, getRemainingTrueCells, getRowBlur, isElExistInArray, new2dArray } from "./GridHelper";
import { getHints } from "../Hints/HintsHelper";

const Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, handleHealth }) => {

	const [newState, setNewState] = useState(new2dArray(rows, cols, false))	// Modifiable grid in Play & New mode
	const [viewState, setViewState] = useState(new2dArray(rows, cols, false))	// Modifiable grid in Edit mode

	// Row & Column hints from loaded gridData
	const [hint, setHint] = useState()
	const [rowHintsData, setRowHintsData] = useState(Array.from({ length: rows }, () => []))
	const [colHintsData, setColHintsData] = useState(Array.from({ length: cols }, () => []))

	const [blur, setBlur] = useState([])	// 'Cells to blur' array
	const [isLoaded, setIsLoaded] = useState(false)	// State check whether gridData is loaded in Edit mode or not

	const { nonogram } = useSelector(
		(state) => state.nonograms
	)

	// Clear grid when changing rows or cols
	useEffect(() => {
		if (mode !== "edit") {
			const newGrid = new2dArray(rows, cols, false)
			setNewState(newGrid)
		} else if (isLoaded) {
			const viewGrid = new2dArray(rows, cols, false)
			setViewState(viewGrid)
			updateGridData(viewGrid)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rows, cols, mode])

	useEffect(() => {
		// Load grid from store
		const gridData = (nonogram.gridData ?
			nonogram.gridData.map(Object.values) :
			new2dArray(rows, cols, false))

		if (mode === "edit") {
			updateGridData(gridData)
			setViewState(gridData)
			setIsLoaded(true)
		}

		// Show ramdomized cell hint 
		if (mode === "play") {
			let remainingTrueCells = getRemainingTrueCells(rows, cols, newState, gridData, showedHints)
			if (showedHints !== 0 && remainingTrueCells.length > 0) {
				handleCellClick(remainingTrueCells[Math.floor(Math.random() * remainingTrueCells.length)], true)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode, nonogram.gridData, showedHints])

	// Get Hints once when nonogram is loaded
	useEffect(() => {
		let _hint = nonogram.gridData ? getHints(nonogram.gridData) : { rowData: [], colData: [] }
		setHint(_hint)
		setRowHintsData(_hint.rowData)
		setColHintsData(_hint.colData)
	}, [nonogram.gridData])

	const handleCellClick = (props, isCellCorrect) => {
		if (mode !== "edit") {
			// Update new grid in play & new mode
			let newGrid = [...newState]
			newGrid[props.rowIndex][props.columnIndex] = isCellCorrect

			if (mode === "play") {
				if (!isCellCorrect) {
					handleHealth(prev => prev - 1)
				} else {
					const rowHintIndex = hint.rowIndex[props.rowIndex][props.columnIndex]
					const colHintIndex = hint.colIndex[props.rowIndex][props.columnIndex]

					let rowHint = [...rowHintsData]
					let colHint = [...colHintsData]

					rowHint[props.rowIndex][rowHintIndex]--
					colHint[props.columnIndex][colHintIndex]--

					if (rowHint[props.rowIndex][rowHintIndex] === 0)
						document.getElementById(`rowHint-${props.rowIndex}-${rowHintIndex}`).classList.add("row-hint-blur");
					if (colHint[props.columnIndex][colHintIndex] === 0)
						document.getElementById(`colHint-${props.columnIndex}-${colHintIndex}`).classList.add("col-hint-blur");

					setRowHintsData((prevState) => ([...prevState, rowHint]))
					setColHintsData((prevState) => ([...prevState, colHint]))
				}

				// Check if row is correct & blur false cells of the row
				let rowBlur = getRowBlur(newState, nonogram.gridData, cols, props.rowIndex, blur, isCellCorrect)
				let rowCellsToBlur = rowBlur.rowCellsToBlur
				if (rowCellsToBlur) rowCellsToBlur.forEach((value) => setBlur((prevState) => ([...prevState, value])))

				// Check if column is correct & blur false cells of the column
				let colBlur = getColBlur(newState, nonogram.gridData, rows, props.columnIndex, blur, isCellCorrect)
				let colCellsToBlur = colBlur.colCellsToBlur
				if (colCellsToBlur) colCellsToBlur.forEach((value) => setBlur((prevState) => ([...prevState, value])))
			}

			setNewState(newGrid)
			updateGridData(newGrid);
		} else {
			// Update new grid in edit mode
			let viewGrid = [...viewState]
			viewGrid[props.rowIndex][props.columnIndex] = isCellCorrect
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