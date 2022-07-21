import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux'
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";

const Grid = ({ rows, cols, id, gridData, updateGridData, mode }) => {

	const [gridState, setGridState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
	const [viewState, setViewState] = useState(Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))

	const { nonogram } = useSelector(
		(state) => state.nonograms
	)

	if (!rows || !cols) {
		rows = 5
		cols = 5
	}

	useEffect(() => {
		if (mode === "new") {
			const newGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
			setGridState(newGrid)
		} else {
			const viewGrid = (nonogram.gridData ?
				nonogram.gridData.map((item) =>
					Object.assign({}, item, { selected: false })
				) :
				Array.from({ length: rows }, () => Array.from({ length: cols }, () => false)))
			setViewState(viewGrid)
		}
	}, [rows, cols, mode, nonogram])

	function initGridData() {
		gridData = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
	}

	if (!gridData) {
		initGridData()
	}

	let updatedGridData = gridData.map((item) =>
		Object.assign({}, item, { selected: false })
	)

	const rowHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

	const handleCellClick = (props, isActive) => {
		if (mode === "new") {
			let newGrid = [...gridState]
			newGrid[props.rowIndex][props.columnIndex] = isActive
			setGridState(newGrid)
			updateGridData(newGrid);
		} else {
			updatedGridData[props.rowIndex][props.columnIndex] = isActive
			updateGridData(updatedGridData);
		}
	}

	return (
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
						{mode === "new" ?
							[...Array(rows)].map((row, rowIndex) => {
								return (
									<tr className="row" key={rowIndex}>
										{[...Array(cols)].map((cell, columnIndex) => {
											return (
												<Cell
													key={rowIndex + "-" + columnIndex}
													rowIndex={rowIndex}
													columnIndex={columnIndex}
													isActive={(gridState[rowIndex] ? (gridState[rowIndex][columnIndex]) : false)}
													handleCellClick={handleCellClick}
												/>
											);
										})}
									</tr>
								);
							}) :
							[...Array(rows)].map((row, rowIndex) => {
								return (
									<tr className="row" key={rowIndex}>
										{[...Array(cols)].map((cell, columnIndex) => {
											return (
												<Cell
													key={rowIndex + "-" + columnIndex}
													rowIndex={rowIndex}
													columnIndex={columnIndex}
													isActive={(viewState[rowIndex] ? (viewState[rowIndex][columnIndex]) : false)}
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

	);
};

export default Grid;