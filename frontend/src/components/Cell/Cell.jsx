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
		if (props.mode === "play" && nonogram.gridData[props.rowIndex][props.columnIndex] === false) {
			setIsWrong(true)
		} else {
			setIsActive(!isActive);
			props.handleCellClick(props, !isActive);
		}
	}

	const handleDrag = (event) => {
		if (event.ctrlKey) {
			handleClick(this)
		}
	}

	const className = isActive ?
		(isWrong ?
			"cell-invalid" :
			"cell-correct") :
		"cell cell-modifiable"

	return (
		<td
			className={className}
			onClick={handleClick}
			onMouseOver={handleDrag}
		/>
	);
};

export default Cell;