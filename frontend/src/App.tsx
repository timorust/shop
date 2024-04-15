import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

function App() {
	return (
		<div className='d-flex flex-column vh-100'>
			<header>
				<Navbar bg='success' variant='success' expand='lg'>
					<Container>
						<Navbar.Brand>EL Shope</Navbar.Brand>
					</Container>
					<Nav>
						<a href='/cart' className='nav-link'>
							Cart
						</a>
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
