import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import basketSlice from './basketSlice'

const store = configureStore({
	reducer: {
		user: userSlice,
		basket: basketSlice,
	}
})

export default store