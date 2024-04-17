import { useQuery, UseQueryResult } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { Product } from '../types/Product'

export const useGetProductsQuery = () =>
	useQuery({
		queryKey: ['products'],
		queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
	})

export const useGetProductDetailsQuery = (
	slug: string
): UseQueryResult<Product, unknown> => {
	return useQuery({
		queryKey: ['products', slug],
		queryFn: async () =>
			(await apiClient.get<Product>(`api/products/${slug}`)).data,
	})
}

// export const useGetProductDetailsQuery = () => {
// 	useQuery({
// 		queryKey: ['products', slug],
// 		queryFn: async () =>
// 			(await apiClient.get<Product>(`api/products/${slug}`)).data,
// 	})
// }
