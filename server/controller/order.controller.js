const db = require('../db')

class ProductController {
	async create(req, res) {
		const userId = req.id
		const { date, products } = req.body

		try {
			await db.query(
				`INSERT INTO "order"
        (date, products, user_id) 
        values ($1, $2, $3) RETURNING *`,
				[date, products, userId]
			)
			res.status(200).send('complete')
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}

	async getByUserId(req, res) {
		const userId = req.id

		try {
			const orders = await db.query(
				`SELECT * FROM "order" WHERE user_id = $1`,
				[userId]
			)
			res.status(200).json(orders.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}

	async getAllOrder(req, res) {
		try {
			const orders = await db.query(`SELECT * FROM "order"`)
			res.status(200).json(orders.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}

	async cancellation(req, res) {
		const { id } = req.body
		try {
      await db.query(
				`UPDATE "order" SET order_status_id = 3 WHERE id = $1`,
				[id]
			)
      const orders = await db.query(`SELECT * FROM "order"`)
			res.status(200).json(orders.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}

	async delete(req, res) {
    const userId = req.id
		const { id } = req.body
		try {
			await db.query(`DELETE FROM "order" WHERE id = $1`, [id])
      const orders = await db.query(
				`SELECT * FROM "order" WHERE user_id = $1`,
				[userId]
			)
			res.status(200).json(orders.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}

	async complete(req, res) {
		const { id } = req.body
		try {
			await db.query(
				`UPDATE "order" SET order_status_id = 2 WHERE id = $1`,
				[id]
			)
      const orders = await db.query(`SELECT * FROM "order"`)
			res.status(200).json(orders.rows)
		} catch (error) {
			console.log(error)
			res.status(500).send('Not Found')
		}
	}
}
module.exports = new ProductController()
