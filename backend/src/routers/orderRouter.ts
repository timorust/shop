import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { OrderModel } from '../models/orderModel'
import { Product } from '../models/productModel'
import { isAuth } from '../utils'

export const orderRouter = express.Router()

orderRouter.get(
	'/mine',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const orders = await OrderModel.find({ user: req.user._id })
		res.send(orders)
	})
)

orderRouter.get(
	// /api/orders/:id
	'/:id',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const order = await OrderModel.findById(req.params.id)
		if (order) res.send(order)
		else res.status(404).json({ message: 'Order not found' })
	})
)

orderRouter.post(
	'/',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		if (req.body.orderItems.length === 0)
			res.status(400).json({
				message: 'Cart is empty',
			})
		else {
			const createdOrder = await OrderModel.create({
				orderItems: req.body.orderItems.map((x: Product) => ({
					...x,
					product: x._id,
				})),

				shippingAddress: req.body.shippingAddress,
				paymentMethod: req.body.paymentMethod,
				itemsPrice: req.body.itemsPrice,
				shippingPrice: req.body.shippingPrice,
				taxPrice: req.body.taxPrice,
				totalPrice: req.body.totalPrice,
				user: req.user._id,
			})
			res.status(201).json({ message: 'Order created!', order: createdOrder })
		}
	})
)

orderRouter.put(
	'/:id/pay',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const order = await OrderModel.findById(req.params.id).populate('user')

			if (order) {
				order.isPaid = true
				order.paidAt = new Date(Date.now())
				order.paymentResult = {
					paymentId: req.body.id,
					status: req.body.status,
					update_time: req.body.update_time,
					email_address: req.body.body.email_address,
				}
				const updatedOrder = await order.save()

				res.send({ order: updatedOrder, message: 'Order paid successfully!' })
			} else {
				res.status(404).json({ message: 'Order not found!' })
			}
		} catch (e) {
			// Handle other error scenarios here
			res.status(500).json({ message: 'Internal server error' })
		}
	})
)
