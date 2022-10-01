[33mcommit 4f6a8d5a3304fe2bf0168217b24030801309dfd0[m[33m ([m[1;36mHEAD -> [m[1;32mtest[m[33m)[m
Author: lbduy123 <89097992+lbduy123@users.noreply.github.com>
Date:   Thu Aug 25 12:35:07 2022 +0700

    Feature: Hold click & fix blur cells bug

[1mdiff --git a/frontend/src/components/Cell/Cell.jsx b/frontend/src/components/Cell/Cell.jsx[m
[1mindex 0cb08f0..9577865 100644[m
[1m--- a/frontend/src/components/Cell/Cell.jsx[m
[1m+++ b/frontend/src/components/Cell/Cell.jsx[m
[36m@@ -22,7 +22,7 @@[m [mconst Cell = (props) => {[m
 			props.handleCellClick(props, !isActive);[m
 		} else {[m
 			if (!isActive && !props.isBlur && !props.isPlayComplete) {[m
[31m-				if (nonogram.gridData[props.rowIndex][props.columnIndex] === false) {			[m
[32m+[m				[32mif (nonogram.gridData[props.rowIndex][props.columnIndex] === false) {[m
 					setIsWrong(true)[m
 					setIsActive(true)[m
 					props.handleCellClick(props, false)[m
[36m@@ -35,16 +35,11 @@[m [mconst Cell = (props) => {[m
 	}[m
 [m
 	const handleDrag = (event) => {[m
[31m-		if (event.ctrlKey) {[m
[32m+[m		[32mif (event.buttons === 1) {[m
 			handleClick(this)[m
 		}[m
 	}[m
 [m
[31m-	const className = (isWrong) ? "cell-invalid" :[m
[31m-		(isActive ? "cell-correct" :[m
[31m-			(props.isBlur ? "cell-blur" :[m
[31m-				(!props.isPlayComplete ? "cell-modifiable"[m
[31m-					: "")))[m
 	const handleHint = () => {[m
 		document.querySelector(`#colHint-${props.columnIndex}`).classList.add('blur');[m
 		document.querySelector(`#rowHint-${props.rowIndex}`).classList.add('blur');[m
[36m@@ -54,6 +49,13 @@[m [mconst Cell = (props) => {[m
 		document.querySelector(`#colHint-${props.columnIndex}`).classList.remove('blur');[m
 		document.querySelector(`#rowHint-${props.rowIndex}`).classList.remove('blur');[m
 	}[m
[32m+[m
[32m+[m	[32mconst className = (isWrong) ? "cell-invalid" :[m
[32m+[m		[32m(isActive ? "cell-correct" :[m
[32m+[m			[32m(props.isBlur ? "cell-blur" :[m
[32m+[m				[32m(!props.isPlayComplete ? "cell-modifiable"[m
[32m+[m					[32m: "")))[m
[32m+[m
 	return ([m
 		<td[m
 			onMouseEnter={handleHint}[m
[36m@@ -61,6 +63,7 @@[m [mconst Cell = (props) => {[m
 			id={props.rowIndex + "-" + props.columnIndex}[m
 			className={className}[m
 			onClick={handleClick}[m
[32m+[m			[32monMouseDown={handleClick}[m
 			onMouseOver={handleDrag}[m
 		>[m
 			{className === "cell-invalid" ? <label className="cell-wrong">x</label> :[m
[1mdiff --git a/frontend/src/components/Grid/Grid.jsx b/frontend/src/components/Grid/Grid.jsx[m
[1mindex 102abbb..389e304 100644[m
[1m--- a/frontend/src/components/Grid/Grid.jsx[m
[1m+++ b/frontend/src/components/Grid/Grid.jsx[m
[36m@@ -17,8 +17,8 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 	const { nonogram } = useSelector([m
 		(state) => state.nonograms[m
 	)[m
[31m-	[m
[31m-	[m
[32m+[m
[32m+[m
 	// Clear grid when changing rows or cols[m
 	useEffect(() => {[m
 		if (mode !== "edit") {[m
[36m@@ -64,7 +64,6 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 			}[m
 		}[m
 		// eslint-disable-next-line react-hooks/exhaustive-deps[m
[31m-[m
 	}, [mode, nonogram.gridData, showedHints])[m
 [m
 [m
[36m@@ -73,10 +72,10 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 			// Update new grid in play & new mode[m
 			let newGrid = [...newState][m
 			newGrid[props.rowIndex][props.columnIndex] = isActive[m
[31m-			[m
[32m+[m
 			if (mode === "play") {[m
[31m-				if(!isActive){[m
[31m-					handleHealth(prev=>prev-1)[m
[32m+[m				[32mif (!isActive) {[m
[32m+[m					[32mhandleHealth(prev => prev - 1)[m
 				}[m
 				// Check if row is correct & blur rowHints[m
 				let rowCorrect = true;[m
[36m@@ -86,7 +85,7 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 						break;[m
 					}[m
 				}[m
[31m-				if (rowCorrect === true) {[m
[32m+[m				[32mif (rowCorrect === true && isActive) {[m
 					// Make rowHints blur[m
 					document.getElementById(`rowHint-${props.rowIndex}`).classList.add("row-hint-blur");[m
 [m
[36m@@ -110,7 +109,7 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 						break;[m
 					}[m
 				}[m
[31m-				if (colCorrect === true) {[m
[32m+[m				[32mif (colCorrect === true && isActive) {[m
 					// Make columnHints blur[m
 					document.getElementById(`colHint-${props.columnIndex}`).classList.add("col-hint-blur");[m
 [m
[36m@@ -126,9 +125,9 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 					})[m
 				}[m
 			}[m
[31m-			[m
[31m-			[m
[31m-			[m
[32m+[m
[32m+[m
[32m+[m
 			setNewState(newGrid)[m
 			updateGridData(newGrid);[m
 		} else {[m
[36m@@ -148,19 +147,13 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 		)) ? true : false)[m
 	}[m
 [m
[31m-	const className =[m
[31m-		rows === 10 ? 'nonogram-10' :[m
[31m-			(rows === 15 ? 'nonogram-15' :[m
[31m-				(rows === 20 ? 'nonogram-20' : ''))[m
[31m-[m
 	return ([m
 		<div style={mode === "play" ? {[m
 			marginTop: '50px',[m
 			marginBottom: '50px',[m
 			paddingRight: '0px',[m
 			paddingLeft: '10px',[m
[31m-[m
[31m-		} : {}} className={className}>[m
[32m+[m		[32m} : {}}>[m
 			<ColumnHints gridData={mode === "new" ?[m
 				newState : (mode === "edit" ? viewState : nonogram.gridData)} />[m
 [m
[36m@@ -179,7 +172,7 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 					<table className="grid-table">[m
 						<tbody>[m
 							{[...Array(rows)].map((row, rowIndex) => {[m
[31m-								[m
[32m+[m
 								return ([m
 									<tr className="row" key={rowIndex}>[m
 										{[...Array(cols)].map((cell, columnIndex) => {[m
[1mdiff --git a/frontend/src/index.css b/frontend/src/index.css[m
[1mindex d79ace9..fe9307f 100644[m
[1m--- a/frontend/src/index.css[m
[1m+++ b/frontend/src/index.css[m
[36m@@ -95,27 +95,6 @@[m [mh3 {[m
   color: #828282;[m
 }[m
 [m
[31m-/* .nonogram-10 {[m
[31m-  --scale: 0.9;[m
[31m-  transform: scale(var(--scale));[m
[31m-  transform-origin: top;[m
[31m-  margin-bottom: calc((var(--scale) - 1) * 100%);[m
[31m-}[m
[31m-[m
[31m-.nonogram-15 {[m
[31m-  --scale: 0.5;[m
[31m-  transform: scale(var(--scale));[m
[31m-  transform-origin: top;[m
[31m-  margin-bottom: calc((var(--scale) - 1) * 100%);[m
[31m-}[m
[31m-[m
[31m-.nonogram-20 {[m
[31m-  --scale: 0.3;[m
[31m-  transform: scale(var(--scale));[m
[31m-  transform-origin: top;[m
[31m-  margin-bottom: calc((var(--scale) - 1) * 100%);[m
[31m-} */[m
[31m-[m
 .goals {[m
   display: grid;[m
   grid-template-columns: repeat(5, 1fr);[m
[1mdiff --git a/frontend/src/pages/Nonogram/Play.jsx b/frontend/src/pages/Nonogram/Play.jsx[m
[1mindex 079c8d6..1758166 100644[m
[1m--- a/frontend/src/pages/Nonogram/Play.jsx[m
[1m+++ b/frontend/src/pages/Nonogram/Play.jsx[m
[36m@@ -9,7 +9,6 @@[m [mimport CompleteDialog from '../../components/CompleteDialog'[m
 import Timer from '../../components/Timer/Timer'[m
 import { FaLightbulb } from 'react-icons/fa'[m
 import { GiTrophy } from 'react-icons/gi'[m
[31m-import { useMemo } from 'react'[m
 var timeBegin;[m
 [m
 function Play() {[m
[36m@@ -32,7 +31,7 @@[m [mfunction Play() {[m
   const [isPlayComplete, setIsPlayComplete] = useState(false)[m
   const [isLose, setIsLose] = useState(false)[m
   const [health, setHealth] = useState(4)[m
[31m-  const [isRestart, setIsRestart]=useState(false)[m
[32m+[m[32m  const [isRestart, setIsRestart] = useState(false)[m
   const [timeResult, setTimeResult] = useState({[m
     minutes: 0,[m
     seconds: 0,[m
[36m@@ -55,13 +54,13 @@[m [mfunction Play() {[m
     if (!user) {[m
       navigate('/login')[m
     }[m
[31m-    [m
[32m+[m
     dispatch(getNonogram(gridId))[m
     setRows(nonogram.rows)[m
     setCols(nonogram.cols)[m
 [m
 [m
[31m-  }, [user, navigate, isError, message, dispatch, gridId, nonogram.rows, nonogram.cols,isRestart])[m
[32m+[m[32m  }, [user, navigate, isError, message, dispatch, gridId, nonogram.rows, nonogram.cols, isRestart])[m
   useEffect(() => {[m
     if (health < 1) {[m
       setIsLose(true)[m
[36m@@ -107,8 +106,8 @@[m [mfunction Play() {[m
   if (isLoading) {[m
     return <Spinner />[m
   }[m
[31m-  [m
[31m-  const yourBestTime = nonogram?.meta?.played?.by.find((player)=>player.id==user._id)?.bestTime[m
[32m+[m
[32m+[m[32m  const yourBestTime = nonogram?.meta?.played?.by.find((player) => player.id === user._id)?.bestTime[m
   const matchBestTime = nonogram?.meta?.bestPlayTime?.value[m
   return ([m
     <div style={{[m
[36m@@ -134,15 +133,15 @@[m [mfunction Play() {[m
         display: 'flex',[m
         alignItems: 'center',[m
       }}>[m
[31m-      {matchBestTime!==undefined?<GiTrophy style={{[m
[32m+[m[32m        {matchBestTime !== undefined ? <GiTrophy style={{[m
           fontSize: '30px',[m
[31m-          color: '#fede00',  [m
[31m-        }} />:""}[m
[31m-        {matchBestTime!=undefined?<span style={{[m
[32m+[m[32m          color: '#fede00',[m
[32m+[m[32m        }} /> : ""}[m
[32m+[m[32m        {matchBestTime !== undefined ? <span style={{[m
           fontSize: '20px',[m
           fontWeight: 'bold',[m
[31m-          color:'green'[m
[31m-        }}>BEST TIME: {Math.floor((matchBestTime % (1000 * 60 * 60)) / (1000 * 60))}:{Math.floor((matchBestTime % (1000 * 60)) / 1000)}:{matchBestTime%1000}</span>:""}[m
[32m+[m[32m          color: 'green'[m
[32m+[m[32m        }}>BEST TIME: {Math.floor((matchBestTime % (1000 * 60 * 60)) / (1000 * 60))}:{Math.floor((matchBestTime % (1000 * 60)) / 1000)}:{matchBestTime % 1000}</span> : ""}[m
       </div>[m
       <Grid[m
         rows={rows}[m
[36m@@ -181,7 +180,7 @@[m [mfunction Play() {[m
             color: '#fede00',[m
             fontSize: '30px',[m
             transform: 'rotate(-20deg)'[m
[31m-          }} onClick={(isPlayComplete || (5 - showedHints) == 0) ? undefined : handleShowHint} />[m
[32m+[m[32m          }} onClick={(isPlayComplete || (5 - showedHints) === 0) ? undefined : handleShowHint} />[m
           <span style={{[m
             position: 'absolute',[m
             width: '30px',[m

[33mcommit b4435b453b710e7e088620ffaf051521b559ebbb[m
Author: Minh <t.hoangminh2411@gmail.com>
Date:   Thu Aug 25 08:44:23 2022 +0700

    handle Error best Time when losing and fix function Try Again

[1mdiff --git a/frontend/src/components/CompleteDialog.jsx b/frontend/src/components/CompleteDialog.jsx[m
[1mindex a6b4eda..61b4541 100644[m
[1m--- a/frontend/src/components/CompleteDialog.jsx[m
[1m+++ b/frontend/src/components/CompleteDialog.jsx[m
[36m@@ -50,10 +50,13 @@[m [mfunction CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult,isL[m
   const dispatch = useDispatch()[m
   [m
   function afterOpenModal() {[m
[31m-    const timeResultConvert =timeResult.minutes*60*1000 + timeResult.seconds*1000 + timeResult.miliseconds [m
[31m-    // references are now sync'd and can be accessed.[m
[31m-    nonogramService.updateNonogramPlayed({ nonogramId: gridId, bestTime: timeResultConvert }, user.token);[m
[31m-    // subtitle.style.color = '#000';[m
[32m+[m[32m    if(isLose == false){[m
[32m+[m[32m      const timeResultConvert =timeResult.minutes*60*1000 + timeResult.seconds*1000 + timeResult.miliseconds[m[41m [m
[32m+[m[32m      // references are now sync'd and can be accessed.[m
[32m+[m[32m      nonogramService.updateNonogramPlayed({ nonogramId: gridId, bestTime: timeResultConvert }, user.token);[m
[32m+[m[32m      // subtitle.style.color = '#000';[m
[32m+[m
[32m+[m[32m    }[m
   }[m
 [m
   const closeModal = () => {[m
[1mdiff --git a/frontend/src/pages/Nonogram/Play.jsx b/frontend/src/pages/Nonogram/Play.jsx[m
[1mindex 53dfcaa..079c8d6 100644[m
[1m--- a/frontend/src/pages/Nonogram/Play.jsx[m
[1m+++ b/frontend/src/pages/Nonogram/Play.jsx[m
[36m@@ -60,6 +60,7 @@[m [mfunction Play() {[m
     setRows(nonogram.rows)[m
     setCols(nonogram.cols)[m
 [m
[32m+[m
   }, [user, navigate, isError, message, dispatch, gridId, nonogram.rows, nonogram.cols,isRestart])[m
   useEffect(() => {[m
     if (health < 1) {[m
[36m@@ -99,7 +100,7 @@[m [mfunction Play() {[m
     setIsLose(false);[m
     setHealth(4);[m
     setShowedHints(0);[m
[31m-    setIsRestart(true);[m
[32m+[m[32m    setIsRestart(!isRestart);[m
     timeBegin = new Date();[m
   }[m
 [m

[33mcommit b324e99003124cc451cfea84b4b98e00f89cb93b[m
Author: Minh <t.hoangminh2411@gmail.com>
Date:   Wed Aug 24 22:59:18 2022 +0700

    nothing

[1mdiff --git a/frontend/src/pages/Nonogram/Play.jsx b/frontend/src/pages/Nonogram/Play.jsx[m
[1mindex 1f63601..53dfcaa 100644[m
[1m--- a/frontend/src/pages/Nonogram/Play.jsx[m
[1m+++ b/frontend/src/pages/Nonogram/Play.jsx[m
[36m@@ -109,7 +109,6 @@[m [mfunction Play() {[m
   [m
   const yourBestTime = nonogram?.meta?.played?.by.find((player)=>player.id==user._id)?.bestTime[m
   const matchBestTime = nonogram?.meta?.bestPlayTime?.value[m
[31m-  console.log(yourBestTime,matchBestTime)[m
   return ([m
     <div style={{[m
       maxWidth: `calc(90px + 2*60px*${cols})`,[m

[33mcommit 7094c328939b3cdfe292fc8ed2860c75687a3c6d[m
Author: Minh <t.hoangminh2411@gmail.com>
Date:   Wed Aug 24 22:57:33 2022 +0700

    fix bestTime render

[1mdiff --git a/frontend/src/components/CompleteDialog.jsx b/frontend/src/components/CompleteDialog.jsx[m
[1mindex 0582f3b..a6b4eda 100644[m
[1m--- a/frontend/src/components/CompleteDialog.jsx[m
[1m+++ b/frontend/src/components/CompleteDialog.jsx[m
[36m@@ -39,7 +39,7 @@[m [mconst customStyles = {[m
 Modal.setAppElement('#root');[m
 let subtitle;[m
 [m
[31m-function CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult,isLose, handleRestart }) {[m
[32m+[m[32mfunction CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult,isLose, handleRestart,yourBestTime }) {[m
   const { user } = useSelector((state) => state.auth);[m
   const [isOpen, setIsOpen] = useState(modalIsOpen);[m
   const [isLike, setIsLike] = useState(false)[m
[36m@@ -50,7 +50,7 @@[m [mfunction CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult,isL[m
   const dispatch = useDispatch()[m
   [m
   function afterOpenModal() {[m
[31m-    const timeResultConvert =timeResult.minutes*60 + timeResult.seconds + timeResult.miliseconds/1000 [m
[32m+[m[32m    const timeResultConvert =timeResult.minutes*60*1000 + timeResult.seconds*1000 + timeResult.miliseconds[m[41m [m
     // references are now sync'd and can be accessed.[m
     nonogramService.updateNonogramPlayed({ nonogramId: gridId, bestTime: timeResultConvert }, user.token);[m
     // subtitle.style.color = '#000';[m
[36m@@ -73,11 +73,11 @@[m [mfunction CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult,isL[m
   }[m
 [m
   const tryAgain = ()=>{[m
[31m-    dispatch(getNonograms(gridId));[m
     handleRestart()[m
     handleCloseDialog();[m
   }[m
 [m
[32m+[m[41m [m
   return ([m
     <Modal[m
       isOpen={isOpen}[m
[36m@@ -114,13 +114,13 @@[m [mfunction CompleteDialog({ modalIsOpen, handleCloseDialog, gridId, timeResult,isL[m
         </div>[m
         <h1>{timeResult?.minutes}:{timeResult?.seconds}:{timeResult?.miliseconds}</h1>[m
       </div>[m
[31m-[m
[31m-      <div className={styles['yourBestTimeInner']}>[m
[32m+[m[41m      [m
[32m+[m[32m      {isNaN(yourBestTime)?"":<div className={styles['yourBestTimeInner']}>[m
         <h3>YOUR BEST TIME</h3>[m
[31m-        <p >0:1:980</p>[m
[32m+[m[32m        <p >{Math.floor((yourBestTime % (1000 * 60 * 60)) / (1000 * 60))}:{Math.floor((yourBestTime % (1000 * 60)) / 1000)}:{yourBestTime%1000}</p>[m
         <AiTwotoneCrown className={styles['CrownIcon']} />[m
 [m
[31m-      </div>[m
[32m+[m[32m      </div>}[m
       <div className={styles['actionInner']}>[m
         <span onClick={handleLike} className={styles['vote']}><AiOutlineLike style={{[m
           color:`${isLike?'red':''}`[m
[1mdiff --git a/frontend/src/components/CompleteDialog.module.css b/frontend/src/components/CompleteDialog.module.css[m
[1mindex 064ef58..4950905 100644[m
[1m--- a/frontend/src/components/CompleteDialog.module.css[m
[1m+++ b/frontend/src/components/CompleteDialog.module.css[m
[36m@@ -77,6 +77,7 @@[m
 }[m
 [m
 .actionInner {[m
[32m+[m[32m    margin-top:30px;[m
     display: flex;[m
 }[m
 [m
[1mdiff --git a/frontend/src/components/Grid/Grid.jsx b/frontend/src/components/Grid/Grid.jsx[m
[1mindex 290b6f6..102abbb 100644[m
[1m--- a/frontend/src/components/Grid/Grid.jsx[m
[1m+++ b/frontend/src/components/Grid/Grid.jsx[m
[36m@@ -75,6 +75,9 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, showedHints, h[m
 			newGrid[props.rowIndex][props.columnIndex] = isActive[m
 			[m
 			if (mode === "play") {[m
[32m+[m				[32mif(!isActive){[m
[32m+[m					[32mhandleHealth(prev=>prev-1)[m
[32m+[m				[32m}[m
 				// Check if row is correct & blur rowHints[m
 				let rowCorrect = true;[m
 				for (let i = 0; i < cols; i++) {[m
[36m@@ -124,9 +127,7 @@[m [mconst Grid = ({ rows, cols, updateGridData, mode, isPlayComplete, sho