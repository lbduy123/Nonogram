import React from "react";
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"
import RowHints from "../Hints/RowHints";

const Grid = ({ rows, cols, updateGridData }) => {

	const gridData = []

	const rowHintsData = [[1, 2, 3], [1], [1, 2, 3], [2, 3], []]

	for (var i = 0; i < rows; i++) {
		gridData[i] = [];
	}

	const handleCellClick = (props, isActive) => {
		gridData[props.rowIndex][props.columnIndex] = isActive
		updateGridData(gridData);
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
												isActive={false}
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