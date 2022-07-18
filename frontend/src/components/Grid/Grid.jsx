import { React } from "react";
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";

const Grid = ({ rows, cols, gridData, updateGridData }) => {

	if (!rows || !cols) {
		rows = 5
		cols = 5
	}

	function initGridData() {
		gridData = []
		for (let i = 0; i < rows; i++) {
			gridData[i] = []
			for (let j = 0; j < cols; j++) {
				gridData[i][j] = false;
			}
		}
	}

	if (!gridData) {
		initGridData()
	}

	let updatedGridData = gridData.map((item) =>
		Object.assign({}, item, { selected: false })
	)

	const rowHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

	const handleCellClick = (props, isActive) => {
		updatedGridData[props.rowIndex][props.columnIndex] = isActive
		updateGridData(updatedGridData);
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
						{[...Array(rows)].map((row, rowIndex) => {
							return (
								<tr className="row" key={rowIndex}>
									{[...Array(cols)].map((cell, columnIndex) => {
										return (
											<Cell
												key={rowIndex + "-" + columnIndex}
												rowIndex={rowIndex}
												columnIndex={columnIndex}
												isActive={(gridData[rowIndex][columnIndex] ? (gridData[rowIndex][columnIndex]) : false)}
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