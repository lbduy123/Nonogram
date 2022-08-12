import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux'
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";
import ColumnHints from "../Hints/ColumnHints";
let blur = [];
const Grid = ({ rows, cols, updateGridData, mode }) => {

	const [newState, setNewState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
	const [viewState, setViewState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
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
	}, [rows, cols, mode, updateGridData])

	// Load grid from store
	useEffect(() => {
		if (mode === "edit") {
			const viewGrid = (nonogram.gridData ?
				nonogram.gridData.map(Object.values) :
				Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
			updateGridData(viewGrid)
			setViewState(viewGrid)
			setIsLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode, nonogram.gridData])

	const handleCellClick = (props, isActive) => {
		if (mode !== "edit") {
			let newGrid = [...newState]
			newGrid[props.rowIndex][props.columnIndex] = isActive
			let rowCorrect = true;
			for (let i = 0; i < cols; i++) {
				if (newGrid[props.rowIndex][i] !== nonogram.gridData[props.rowIndex][i]) {
					rowCorrect = false
					break;
				}
			}

			if (rowCorrect === true) {
				newGrid[props.rowIndex].forEach((value, colIdx) => {
					if (newGrid[props.rowIndex][colIdx] === false) {
						blur.push([props.rowIndex, colIdx])
					}
				})
			}

			let colCorrect = true;
			for (let i = 0; i < rows; i++) {
				if (newGrid[i][props.columnIndex] !== nonogram.gridData[i][props.columnIndex]) {
					colCorrect = false
					break;
				}
			}
			if (colCorrect === true) {
				newGrid.forEach((value, rowIdx) => {
					if (newGrid[rowIdx][props.columnIndex] === false) {
						blur.push([rowIdx, props.columnIndex])
					}
				})
			}

			setNewState(newGrid)
			updateGridData(newGrid);
		} else {
			let viewGrid = [...viewState]
			viewGrid[props.rowIndex][props.columnIndex] = isActive
			setViewState(viewGrid)
			updateGridData(viewGrid);
		}
	}

	const className =
		rows === 10 ? 'nonogram-10' :
			(rows === 15 ? 'nonogram-15' :
				(rows === 20 ? 'nonogram-20' : ''))

	return (
		<div className={className}>
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
								// let check = rowBlur.includes(rowIndex);
								// console.log(check)
								return (
									<tr className="row" key={rowIndex}>
										{[...Array(cols)].map((cell, columnIndex) => {
											return (
												<Cell
													key={rowIndex + "-" + columnIndex}
													mode={mode}
													rowIndex={rowIndex}
													columnIndex={columnIndex}
													isBlur={(blur.some(
														r => r.length === [rowIndex, columnIndex].length &&
															r.every((value, index) => [rowIndex, columnIndex][index] === value)
													)) ? true : false}
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