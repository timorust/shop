import bcrypt from 'bcryptjs'

import { Product } from './models/productModel'
import { User } from './models/userModel'

export const sampleProducts: Product[] = [
	{
		name: 'Ring Cut',
		slug: 'ring-cut',
		image: '../images/ring-cut.png',
		category: 'Ring',
		brand: 'Stephanie Gottlieb',
		price: 220000,
		countInStock: 10,
		description:
			'the strongest with clients are pieces she has designed for herself.',
		rating: 2,
		numReviews: 10,
	},
	{
		name: 'Name Bracelet',
		slug: 'name-bracelet',
		image: '../images/name-bracelet.png',
		category: 'Bracelet',
		brand: 'Boochier',
		price: 12200,
		countInStock: 14,
		description:
			'We love the fresh and lively spirit the pieces bring to any look.',
		rating: 3,
		numReviews: 9,
	},
	{
		name: 'Necklace',
		slug: 'necklace',
		image: '../images/necklace.png',
		category: 'Necklace',
		brand: 'Boochier',
		price: 324500,
		countInStock: 0,
		description:
			'We love the fresh and lively spirit the pieces bring to any look.',
		rating: 4,
		numReviews: 2,
	},
	{
		name: 'Earrings Two Sided',
		slug: 'earrings-two-sided',
		image: '../images/earrings-two-sided.png',
		category: 'Earrings',
		brand: 'Cartier',
		price: 5800,
		countInStock: 17,
		description:
			'We love the fresh and lively spirit the pieces bring to any look.',
		rating: 5,
		numReviews: 3,
	},
]

export const sampleUsers: User[] = [
	{
		name: 'Tim',
		email: 'tim@example.com',
		password: bcrypt.hashSync('123456'),
		isAdmin: true,
	},
	{
		name: 'Tom',
		email: 'tom@example.com',
		password: bcrypt.hashSync('123456'),
		isAdmin: false,
	},
]
