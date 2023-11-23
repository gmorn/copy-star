const db = require('../db')
const fs = require('fs')

class ProductController {
	async create(req, res) {
		const { name, date, date_creation, model, price, category_id, country } =
			req.body

		const gallery = req.files[0].filename

		try {
			await db.query(
				`INSERT INTO products
				(name, date, date_creation, model, price, gallery, category_id, country) 
				values ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[name, date, date_creation, model, price, gallery, category_id, country]
			)

			res.status(200).send('Product added successfully')
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}
	async productImage(req, res) {
		const imageName = req.params.imageName

		const filePath = `STORAGE/${imageName}`

		fs.readFile(filePath, (err, data) => {
			if (err) {
				console.error(err)
				res.status(404).send('Not Found')
			} else {
				res.setHeader('Content-Type', 'image/png')
				res.end(data)
			}
		})
	}
	async getProducts(req, res) {
		try {
			const products = await db.query(`SElECT * FROM products`)

			res.status(200).json(products.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}
	async getProductById(req, res) {
		const { id } = req.body
		try {
			const products = await db.query(`SElECT * FROM products WHERE id = $1`, [
				id
			])

			res.status(200).json(products.rows[0])
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}
	async delete(req, res) {
		const { id } = req.body
		try {
			await db.query(
				`DELETE FROM products
			WHERE id = $1`,
				[id]
			)
			const products = await db.query(`SELECT * FROM products`)

			res.status(200).json(products.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}

	async update(req, res) {
		const { name, date, model, price, category_id, country, id } = req.body

		const gallery =
			req.files.length === 0 ? req.body.gallery : req.files[0].filename
		try {
			await db.query(
				`UPDATE products
				SET name = $1,
				date = $2,
				model = $3,
				price = $4,
				category_id = $5,
				country = $6,
				gallery = $7
			WHERE id = $8;`,
				[name, date, model, price, category_id, country, gallery, id]
			)
			const products = await db.query(`SELECT * FROM products`)

			res.status(200).json(products.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}
}

module.exports = new ProductController()
