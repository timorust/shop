import { Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../hooks/productHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function ProductPage() {
	const params = useParams()
	const { slug } = params

	const { data: product, isLoading, error } = useGetProductDetailsQuery(slug!)
	return isLoading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
	) : !product ? (
		<MessageBox variant='danger'>Product Not Found</MessageBox>
	) : (
		<div>
			<Row>
				<Col md={6}>
					<img className='large' src={product.image} alt={product.name} />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<Helmet>
								<title>{product.name}</title>
							</Helmet>
							<h1>{product.name}</h1>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating rating={product.rating} numReviews={product.numReviews} />
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>
							Description:<p>{product.description}</p>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col></Col>
			</Row>
		</div>
	)
}