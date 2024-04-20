import { useContext, useEffect } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from './Store'

function App() {
	const {
		state: { mode, cart },
		dispatch,
	} = useContext(Store)

	useEffect(() => {
		document.body.setAttribute('data-bs-theme', mode)
	}, [mode])

	const switchModeHandler = () => {
		dispatch({ type: 'SWITCH_MODE' })
	}
	return (
		<div className='d-flex flex-column vh-100'>
			<ToastContainer position='bottom-center' limit={1} />
			<header>
				<Navbar expand='lg'>
					<Container>
						<LinkContainer to='/'>
							<Navbar.Brand>EL Shope</Navbar.Brand>
						</LinkContainer>
					</Container>
					<Nav>
						<Button variant={mode} onClick={switchModeHandler}>
							<i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
						</Button>
						<Link to='/cart' className='nav-link'>
							{cart.cartItems.length > 0 && (
								<Badge pill bg='danger'>
									{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
								</Badge>
							)}
							Cart
						</Link>
						<a href='/signin' className='nav-link'>
							Sign in
						</a>
					</Nav>
				</Navbar>
			</header>
			<main>
				<Container className='mt-3'>
					<Outlet />
				</Container>
			</main>
			<footer>
				<div className='text-center'>All rights reserved</div>
			</footer>
		</div>
	)
}

export default App
