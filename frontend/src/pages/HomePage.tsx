import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../hooks/productHooks'
import { getError } from '../utils'

export default function HomePage() {
	const { data: products, isLoading, error } = useGetProductsQuery()
	return isLoading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant='danger'>{getError(error)}</MessageBox>
	) : (
		<Row>
			<Helmet>
				<title>EL Shop</title>
			</Helmet>
			{products &&
				products.map(product => (
					<Col key={product.slug} sm={6} md={4} lg={3}>
						<ProductItem product={product} />
					</Col>
				))}
		</Row>
	)
}
