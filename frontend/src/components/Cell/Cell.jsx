import React from "react";
import "./Cell.css";
import { useState } from "react"

const Cell = (props) => {
	const [isActive, setIsActive] = useState(props.isActive)

	const handleClick = () => {
		setIsActive(!isActive);
		props.handleCellClick(props, !isActive);
	}

	const handleDrag = (event) => {
		if (event.ctrlKey) {
			handleClick(this)
		}
	}

	return (
		<td
			className={(isActive === false) ? "cell cell-modifiable" : "cell-invalid"}
			onClick={handleClick}
			onMouseOver={handleDrag}
		/>
	);
};

export default Cell;