import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { CartItem, ShippingAddress } from '../types/Cart'
import { Order } from '../types/Order'

export const useGetOrderDetailsQuery = (id: string) => {
	return useQuery({
		queryKey: ['orders', id],
		queryFn: async () => {
			const response = await apiClient.get<Order>(`/api/orders/${id}`)
			return response.data
		},
	})
}

export const useCreateOrderMutation = () => {
	return useMutation({
		mutationFn: async (order: {
			orderItems: CartItem[]
			shippingAddress: ShippingAddress
			paymentMethod: string
			itemsPrice: number
			shippingPrice: number
			taxPrice: number
			totalPrice: number
		}) => {
			const response = await apiClient.post<{ message: string; order: Order }>(
				`api/orders`,
				order
			)
			return response.data // Return the data from the response
		},
	})
}
