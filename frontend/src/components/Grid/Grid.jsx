import React from "react";
// Css files
import "./Grid.css";
// Components
import Cell from "../Cell/Cell"

const Grid = ({ rows, cols, updateGridData }) => {

	const gridData = []

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
			<div style={{ marginTop: "5px" }}>
				{[...Array(rows)].map((row, rowIndex) => {
					return (
						<div style={{
							display: "grid",
							gridTemplateColumns: `repeat(${cols}, auto)`,
							columnGap: "10px",
						}}>
							{[...Array(cols)].map((col, colIndex) => {
								return (
									<label>3</label>
								);
							})}
						</div>
					);
				})}
			</div>

			<div style={{
				display: "flex",
				marginLeft: "10px"
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

			<div style={{ visibility: "hidden" }}>
				{[...Array(rows)].map((row, rowIndex) => {
					return (
						<div style={{
							display: "grid",
							gridTemplateColumns: `repeat(${cols}, auto)`,
							columnGap: "10px"
						}}>
							{[...Array(cols)].map((col, colIndex) => {
								return (
									<label>3</label>
								);
							})}
						</div>
					);
				})}
			</div>

		</div>

	);
};

export default Grid;