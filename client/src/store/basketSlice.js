import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	productInBasket: []
}

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		incrementProductCount: (state, action) => {
			const id = action.payload
			const product = state.productInBasket.find((product) => product.id === id)

			if (product) {
				product.count = Math.min(product.count + 1, Number.MAX_SAFE_INTEGER)
			}
		},

		decrementProductCount: (state, action) => {
			const id = action.payload
			const product = state.productInBasket.find((product) => product.id === id)

			if (product) {
				product.count = Math.max(product.count - 1, 1)
			}
		},
		addProduct: (state, action) => {
			const existingProduct = state.productInBasket.find(
				(product) => product.id === action.payload.id
			)

			if (existingProduct) {
				existingProduct.count += 1
			} else {
				state.productInBasket.push({ ...action.payload, count: 1 })
			}
		},
		deleteProduct: (state, action) => {
			const id = action.payload
			state.productInBasket = state.productInBasket.filter(
				(product) => product.id !== id
			)
		},
		cleanBasket: (state, action) => {
			state.productInBasket = []
		}
	}
})

export const {
	incrementProductCount,
	decrementProductCount,
	addProduct,
	deleteProduct,
	cleanBasket
} = basketSlice.actions
export default basketSlice.reducer
