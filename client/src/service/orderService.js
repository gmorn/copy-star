import axios from 'axios'
import { hostName } from '../constants'

export default class OrderService {
	static async create(order) {
		try {
			const response = await axios.post(`${hostName}/order/create`, order, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async getByUserId() {
		try {
			const response = await axios.get(`${hostName}/order/getByUserId`, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async getAllOrder() {
		try {
			const response = await axios.get(`${hostName}/order/getAllOrder`)
			return response
		} catch (error) {
			return error.response
		}
	}
  static async delete(id) {
		try {
			const response = await axios.post(`${hostName}/order/delete`, {id}, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}
  static async complete(id) {
		try {
			const response = await axios.post(`${hostName}/order/complete`, {id})
			return response
		} catch (error) {
			return error.response
		}
	}
  static async cancellation(id) {
		try {
			const response = await axios.post(`${hostName}/order/cancellation`, {id})
			return response
		} catch (error) {
			return error.response
		}
	}
}
