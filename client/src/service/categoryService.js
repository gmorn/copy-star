import axios from 'axios'
import { hostName } from '../constants'

export default class CategoryService {
  static async getAllCategory(user) {
		try {
			const response = await axios.get(`${hostName}/category/getAllCategory`)
			return response
		} catch (error) {
			return error.response
		}
	}
}