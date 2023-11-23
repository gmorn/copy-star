import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutUsPage from './pages/about-us-page/AboutUsPage'
import AuthPage from './pages/auth-page/AuthPage'
import CatalogPage from './pages/catalog-page/CatalogPage'
import AdminPage from './pages/admin-page/AdminPage'
import UserOrderPage from './pages/user-order-page/UserOrderPage'

export default function App() {
	return (
		<Routes>
			<Route path={'/'} element={<AboutUsPage />} />
			<Route path={'/auth/:pageType'} element={<AuthPage />} />
			<Route path={'/catalog'} element={<CatalogPage />} />
			<Route path={'/admin'} element={<AdminPage />} />
			<Route path={'/orders'} element={<UserOrderPage />} />
		</Routes>
	)
}
