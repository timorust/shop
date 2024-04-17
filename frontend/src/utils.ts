import { ApiError } from './types/ApiError'

export const getError = (error: Error | ApiError) => {
	if ('response' in error && error.response?.data?.message) {
		return error.response.data.message
	} else {
		return error.message
	}
}
