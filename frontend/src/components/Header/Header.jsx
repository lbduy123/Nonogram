import { FaSignOutAlt, FaChessBoard, FaPlus, FaThLarge } from 'react-icons/fa'
import { FiSettings, FiBookOpen } from 'react-icons/fi'

import { AiOutlinePlayCircle } from 'react-icons/ai'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import logo from '../../assets/img/logo.png'
import styles from './Header.module.css'

import { useState } from 'react'

function Header() {
	const [authMenuisOpen, setAuthMenuisOpen] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)
	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}
	const handleCreate = (e) => {
		e.preventDefault()
		navigate('/new')
	}
	return (
		<header className={styles['header']}>
			<div className={styles['container']}>
				<div className={styles['row']}>
					<NavLink className={styles['header__logo']} to='/casual'>
						<img src={logo} alt="nonogram" width="50" height="50" />
						<h1>Nonogram</h1>
					</NavLink>
					<ul className={styles['header__nav']}>
						<li>
							<NavLink className={({ isActive }) => isActive ? `${styles['header__navLinkActive']}` : `${styles['header__navLink']}`} to='/casual'> Casual </NavLink>
						</li>
						<li>
							<NavLink className={({ isActive }) => isActive ? `${styles['header__navLinkActive']}` : `${styles['header__navLink']}`} to='/workshop'> Workshop </NavLink>
						</li>
					</ul>
					{
						user ?
							<div className={styles['header__actionSuccess']}>
								<div onClick={() => {
									setAuthMenuisOpen(!authMenuisOpen)
								}}
									className={styles['header__actionWrapper']}
									style={{
										color: `${authMenuisOpen && user ? 'rgb(227, 235, 235)' : ''}`,
										backgroundColor: `${authMenuisOpen && user ? 'rgb(22, 89, 90)' : ''}`
									}}
								>
									<img width="34" height="34" src={`https://i.pravatar.cc/150?u=${user._id}`} alt="xin chào user" />
									<span className={styles['header__authAction']}><FiSettings /></span>

								</div>
								<div onClick={handleCreate} className={styles['actionSuccess__create']}>
									<span><FaPlus className={styles['create__icon']} /></span>
									<span>Create</span>
								</div>
							</div> :
							<ul className={styles['header__action']}>
								<li><Link to='/login'>Đăng Nhập</Link></li>
								<li><Link to='/register'>Đăng ký</Link></li>
							</ul>

					}
					{authMenuisOpen && user ?
						<div onClick={() => {
							setAuthMenuisOpen(!authMenuisOpen)
						}} className={styles['heaer_authMenuCotainer']}>
							<div className={styles['header__authMenu']}>
								<div className={styles['authMenu__wrapper']}>
									<div className={styles['authMenu__userInfo']}>
										<p><span>Good Morning,</span> {user?.name}</p>
										<p>Project admin</p>
									</div>
									<ul className={styles['authMenu__Action']}>
										<li >
											<Link to="/workshop" className={`${styles['authMenu__actionItem']}`}>
												<span className={styles['authMenu__ActionIcon']}><FaChessBoard /></span>
												<span>
													Workshop
												</span>
											</Link>
										</li>
										<li >
											<Link className={`${styles['authMenu__actionItem']}`} to='/casual' >
												<span className={styles['authMenu__ActionIcon']}><AiOutlinePlayCircle /></span>
												<span>Casual</span>
											</Link>

										</li>
										<li>
											<Link to='/creation' className={`${styles['authMenu__actionItem']}`} >
												<span className={styles['authMenu__ActionIcon']}><FiBookOpen /></span>
												<span >My workspace</span>
											</Link>

										</li>
										{user.roleLevel === 9 ?
											<li>
												<Link to='/admin' className={`${styles['authMenu__actionItem']}`}>
													<span className={styles['authMenu__ActionIcon']}><FaThLarge /></span>
													<span >Admin Dashboard</span>
												</Link>
											</li> : <></>}
										<li className={`${styles['authMenu__actionItem']}`} onClick={onLogout}>
											<span className={styles['authMenu__ActionIcon']}><FaSignOutAlt /></span>
											Logout
										</li>
									</ul>
								</div>
							</div>
						</div>
						:
						""
					}
				</div>
			</div>
		</header>
	)
}

export default Header