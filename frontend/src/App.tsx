// import { useState } from 'react'
import './App.css'
import { sampleProducts } from './data'

function App() {
	// const [count, setCount] = useState(0)

	return (
		<div>
			<header>EL Shope</header>
			<main>
				<ul>
					{sampleProducts.map(product => (
						<li key={product.slug}>
							<img src={product.image} alt='pic' className='product-image' />
							<h2>{product.name}</h2>
							<p>${product.price}</p>
						</li>
					))}
				</ul>
			</main>
			<footer>All rights reserved</footer>
		</div>
	)
}

export default App
