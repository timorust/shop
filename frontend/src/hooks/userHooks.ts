import { useMutation } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { UserInfo } from '../types/UserInfo'

export const useSigninMutation = () => {
	return useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string
			password: string
		}) => {
			const response = await apiClient.post<UserInfo>(`/api/users/signin`, {
				email,
				password,
			})
			return response.data // Return the data from the response
		},
	})
}

export const useSignupMutation = () => {
	return useMutation({
		mutationFn: async ({
			name,
			email,
			password,
		}: {
			name: string
			email: string
			password: string
		}) => {
			const response = await apiClient.post<UserInfo>(`/api/users/signup`, {
				name,
				email,
				password,
			})
			return response.data
		},
	})
}
