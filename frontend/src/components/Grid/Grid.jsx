import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux'
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";
import ColumnHints from "../Hints/ColumnHints";

const Grid = ({ rows, cols, updateGridData, mode }) => {

	const [newState, setNewState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
	const [viewState, setViewState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
	const [isLoaded, setIsLoaded] = useState(false)

	const { nonogram } = useSelector(
		(state) => state.nonograms
	)

	// const columnHintsData = Array.from(Array(cols).keys())
	const columnHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

	// Clear grid when changing rows or cols
	useEffect(() => {
		if (mode === "new") {
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
		if (mode !== "new") {
			const viewGrid = (nonogram.gridData ?
				nonogram.gridData.map((item) =>
					Object.assign({}, item, { selected: false })
				) :
				Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
			updateGridData(viewGrid)
			setViewState(viewGrid)
			setIsLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mode, nonogram.gridData])

	const rowHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

	const handleCellClick = (props, isActive) => {
		if (mode === "new") {
			let newGrid = [...newState]
			newGrid[props.rowIndex][props.columnIndex] = isActive
			setNewState(newGrid)
			updateGridData(newGrid);
		} else {
			let viewGrid = [...viewState]
			viewGrid[props.rowIndex][props.columnIndex] = isActive
			setViewState(viewGrid)
			updateGridData(viewGrid);
		}
	}

	return (
		<>
			<ColumnHints hintsData={columnHintsData} />

			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}>
				<RowHints hintsData={rowHintsData} />

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
													rowIndex={rowIndex}
													columnIndex={columnIndex}
													isActive={mode === "new" ?
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

				<RowHints hidden={true} hintsData={rowHintsData} />

			</div>
		</>

	);
};

export default Grid;