import axios from 'axios'
import { hostName } from '../constants'

export default class UserService {
  static async reg(user) {
		try {
			const response = await axios.post(`${hostName}/user/registration`, user, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async login(user) {
		try {
			const response = await axios.post(`${hostName}/user/login`, user, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async isLogin() {
		try {
			const response = await axios.get(`${hostName}/user/isUser`, {
				withCredentials: true
			})
			console.log(response);
			return response
		} catch (error) {
			return error.response
		}
	}

  static async logout() {
		try {
			const response = await axios.get(`${hostName}/user/logout`, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
  }
}