import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Store } from '../Store'

export default function ProtectedRouter() {
	const {
		state: { userInfo },
	} = useContext(Store)

	if (userInfo) return <Outlet />
	else return <Navigate to={'/signin'} />
	return <div></div>
}
