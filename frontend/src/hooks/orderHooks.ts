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

export const useGetPaypalClientIdQuery = () => {
	const { data } = useQuery<{ clientId: string }>({
		queryKey: ['paypal-clientId'],
		queryFn: async () => {
			const response = await apiClient.get<{ clientId: string }>(
				`/api/keys/paypal`
			)
			return response.data // Return the data from the response
		},
	})

	return data?.clientId // Return the clientId from the data
}

export const usePayOrderMutation = () => {
	return useMutation({
		mutationFn: async (details: { orderId: string }) =>
			(
				await apiClient.put<{ message: string; order: Order }>(
					`/api/orders/${details.orderId}/pay`,
					details
				)
			).data,
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
