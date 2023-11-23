const db = require('../db')

class CategoryController {
	async getAllCategory(req, res) {
		try {
			const category = await db.query('SELECT * FROM category')

			res.status(200).json(category.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}
}
module.exports = new CategoryController()
