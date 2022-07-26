import React from "react";
import "./Cell.css";
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'

const Cell = (props) => {

	const { nonogram } = useSelector(
		(state) => state.nonograms
	)

	const [isActive, setIsActive] = useState(props.isActive)
	const [isWrong, setIsWrong] = useState(false)

	useEffect(() => {
		setIsActive(props.isActive)
	}, [props.isActive])

	const handleClick = () => {
		if (props.mode !== "play") {
			setIsActive(!isActive);
			props.handleCellClick(props, !isActive);
		} else {
			if (nonogram.gridData[props.rowIndex][props.columnIndex] === false) {
				setIsWrong(true)
			} else if (isActive === false) {
				setIsActive(true)
				props.handleCellClick(props, true)
			}
		}
	}

	const handleDrag = (event) => {
		if (event.ctrlKey) {
			handleClick(this)
		}
	}

	const className = isWrong ?
		"cell-invalid" :
		(isActive ? "cell-correct" :
			"cell-modifiable")

	return (
		<td
			className={className}
			onClick={handleClick}
			onMouseOver={handleDrag}
		>
			{className === "cell-invalid" ? <label className="cell-wrong">x</label> : <></>}
		</td>
	);
};

export default Cell;