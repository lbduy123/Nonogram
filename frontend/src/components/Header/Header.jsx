import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}

	return (
		<header className="header">
			<div className="logo header-first-child">
				<Link to='/'>Dashboard</Link>
			</div>
			<div className="logo">
				<Link to='/creation'>My Creation</Link>
			</div>
			{user ? (
				<>
					<ul className="btn-header-area" >
						<li>
							<button className="btn" onClick={onLogout}>
								<FaSignOutAlt /> Logout
							</button>
						</li>
					</ul>
				</>
			) : (
				<ul className="btn-header-area">
					<li>
						<Link to='/login'>
							<FaSignInAlt /> Login
						</Link>
					</li>
					<li>
						<Link to='/register'>
							<FaUser /> Register
						</Link>
					</li>
				</ul>
			)}
		</header>
	)
}

export default Header