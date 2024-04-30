import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import App from './App'
import ProtectedRouter from './components/ProtectedRouter.tsx'
import './index.css'
import CartPage from './pages/CartPage.tsx'
import HomePage from './pages/HomePage.tsx'
import PaymentMethodPage from './pages/PaymentMethodPage.tsx'
import PlaceOrderPage from './pages/PlaceOrderPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import ShippingAddressPage from './pages/ShippingAddressPage.tsx'
import SigninPage from './pages/SigninPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import { StoreProvider } from './Store.tsx'
import OrderPage from './pages/OrderPage.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderHistoryPage from './pages/OrderHistoryPage.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} element={<HomePage />} />
			<Route path='product/:slug' element={<ProductPage />} />
			<Route path='cart' element={<CartPage />} />
			<Route path='signin' element={<SigninPage />} />
			<Route path='signup' element={<SignupPage />} />

			<Route path='' element={<ProtectedRouter />}>
				<Route path='shipping' element={<ShippingAddressPage />} />
				<Route path='payment' element={<PaymentMethodPage />} />
				<Route path='placeorder' element={<PlaceOrderPage />} />
				<Route path='/order/:id' element={<OrderPage />} />
				<Route path='/orderhistory' element={<OrderHistoryPage />} />
			</Route>
		</Route>
	)
)

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<StoreProvider>
			<PayPalScriptProvider
				options={{ clientId: 'paypal' }}
				deferLoading={true}
			>
				<HelmetProvider>
					<QueryClientProvider client={queryClient}>
						<ReactQueryDevtools initialIsOpen />
						<RouterProvider router={router} />
					</QueryClientProvider>
				</HelmetProvider>
			</PayPalScriptProvider>
		</StoreProvider>
	</React.StrictMode>
)
