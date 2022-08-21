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
			if (!isActive && !props.isBlur && !props.isPlayComplete) {
				if (nonogram.gridData[props.rowIndex][props.columnIndex] === false) {
					setIsWrong(true)
				} else {
					setIsActive(true)
					props.handleCellClick(props, true)
				}
			}
		}
	}

	const handleDrag = (event) => {
		if (event.ctrlKey) {
			handleClick(this)
		}
	}

	const className = (isWrong) ? "cell-invalid" :
		(isActive ? "cell-correct" :
			(props.isBlur ? "cell-blur" :
				(!props.isPlayComplete ? "cell-modifiable"
					: "")))
	const handleHint = () => {
		document.querySelector(`#colHint-${props.columnIndex}`).classList.add('blur');
		document.querySelector(`#rowHint-${props.rowIndex}`).classList.add('blur');
	}

	const removeBlur = () => {
		document.querySelector(`#colHint-${props.columnIndex}`).classList.remove('blur');
		document.querySelector(`#rowHint-${props.rowIndex}`).classList.remove('blur');
	}
	return (
		<td
			onMouseEnter={handleHint}
			onMouseOut={removeBlur}
			id={props.rowIndex + "-" + props.columnIndex}
			className={className}
			onClick={handleClick}
			onMouseOver={handleDrag}
		>
			{className === "cell-invalid" ? <label className="cell-wrong">x</label> :
				className === "cell-blur" ? <label className="cell-blur">x</label> : <></>}
		</td>
	);
};

export default Cell;