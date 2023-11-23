import axios from 'axios'
import { hostName } from '../constants'

export default class ProductService {
  static async create(newProduct) {
    const formData = new FormData();

    formData.append('name', newProduct.name);
    formData.append('date', newProduct.date);
    formData.append('date_creation', newProduct.date_creation);
    formData.append('model', newProduct.model);
    formData.append('price', newProduct.price);
    formData.append('category_id', newProduct.category_id);
    formData.append('gallery', newProduct.gallery);
    formData.append('country', newProduct.country);

		try {
			const response = await axios.post(`${hostName}/product/create`, formData)
			return response
		} catch (error) {
			return error.response
		}
	}

  static async getProducts() {
    try {
			const response = await axios.get(`${hostName}/product/getProducts`)
			return response
		} catch (error) {
			return error.response
		}
  }

  static async getProductById(id) {
    try {
			const response = await axios.post(`${hostName}/product/getProductById`, {id})
			return response
		} catch (error) {
			return error.response
		}
  }

  static async delete(id) {
    try {
			const response = await axios.post(`${hostName}/product/delete`, {id})
			return response
		} catch (error) {
			return error.response
		}
  }

	static async update(product) {
		const formData = new FormData();
		console.log(product);
    formData.append('id', product.id);
    formData.append('name', product.name);
    formData.append('date', product.date);
    formData.append('model', product.model);
    formData.append('price', product.price);
    formData.append('category_id', product.category_id);
    formData.append('gallery', product.gallery);
    formData.append('country', product.country);
    try {
			const response = await axios.post(`${hostName}/product/update`, formData)
			return response
		} catch (error) {
			return error.response
		}
  }
}