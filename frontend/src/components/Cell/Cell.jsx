import React from "react";
import "./Cell.css";
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
var mouseStatus = "click"
var detectMouseStatus
const Cell = (props) => {
<<<<<<< HEAD
=======

	const [isFirstCellToDrag, setIsFirstCellToDrag] = useState(false)
	const [isCancelClick, setIsCancelClick] = useState(false)

>>>>>>> b234656a9604e5bb3f7e3cf3846acfe4b07d2c41
	const { nonogram } = useSelector(
		(state) => state.nonograms
	)
	const [isActive, setIsActive] = useState(props.isActive)
	const [isWrong, setIsWrong] = useState(false)
	const [isMouseDown,setIsMouseDown] = useState(false);
	useEffect(() => {
		setIsActive(props.isActive)
	}, [props.isActive])

	const handleClick = (event) => {
		// Prevent 'onClick' event triggered when it is dragged over 'the first cell to drag' again
		if (event.type === "click" && isCancelClick) return

		if (props.mode !== "play") {
			setIsActive(!isActive);
			props.handleCellClick(props, !isActive);
		} else {
			if (!isActive && !props.isBlur && !props.isPlayComplete) {
				if (nonogram.gridData[props.rowIndex][props.columnIndex] === false) {
					setIsWrong(true)
					setIsActive(true)
					props.handleCellClick(props, false)
				} else {
					setIsActive(true)
					props.handleCellClick(props, true)
				}
			}
		}
	}

	const handleDrag = (event) => {
		
		if (event.buttons === 1) {
<<<<<<< HEAD
			
			handleClick(this)
=======
			handleClick(event)
>>>>>>> b234656a9604e5bb3f7e3cf3846acfe4b07d2c41
		}
	}

	const handleMouseDown = (event) => {
		setIsFirstCellToDrag(true)
		handleClick(event)
	}

	const handleMouseUp = (event) => {
		// Set the cell is not first cell to drag when its a single click or dragged over again
		setIsFirstCellToDrag(false)

		// Only let mouseUp event to click cell when its a single click
		if (isFirstCellToDrag && !isCancelClick) {
			handleClick(event)
		}
	}

	const handleMouseLeave = () => {
		// Set cell cannot be triggered by 'onClick' JS event when it is dragging
		if (isFirstCellToDrag) setIsCancelClick(true)
	}

	const handleHint = () => {
		document.querySelector(`#colHint-${props.columnIndex}`).classList.add('blur');
		document.querySelector(`#rowHint-${props.rowIndex}`).classList.add('blur');
	}

	const removeBlur = () => {
		document.querySelector(`#colHint-${props.columnIndex}`).classList.remove('blur');
		document.querySelector(`#rowHint-${props.rowIndex}`).classList.remove('blur');
	}

	const className = (isWrong) ? "cell-invalid" :
		(isActive ? "cell-correct" :
			(props.isBlur ? "cell-blur" :
				(!props.isPlayComplete ? "cell-modifiable"
					: "")))

	return (
		<td
			onMouseEnter={handleHint}
			onMouseOut={removeBlur}
			id={props.rowIndex + "-" + props.columnIndex}
			className={className}
			onClick={handleClick}
<<<<<<< HEAD
			onMouseDown={(e)=>{

				if(!isMouseDown){
					detectMouseStatus = setTimeout(()=>{
						handleClick()
				   },200)
				   setIsMouseDown(true);
				}

				   
				   
				
			}}
			onMouseUp={()=>{
				clearTimeout(detectMouseStatus);
				setIsMouseDown(false);
			}}
			onMouseOver={handleDrag}
			
=======
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseOver={handleDrag}
			onMouseLeave={handleMouseLeave}
>>>>>>> b234656a9604e5bb3f7e3cf3846acfe4b07d2c41
		>
			{className === "cell-invalid" ? <label className="cell-wrong">x</label> :
				className === "cell-blur" ? <label className="cell-blur">x</label> : <></>}
		</td>
	);
};

export default Cell;