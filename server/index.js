const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes')
const categoryRouter = require('./routes/category.routes')
const orderRouter = require('./routes/order.routes')

const PORT = process.env.PORT || 80

const app = express()

app.use(
	cors({
		origin: 'https://copy-star.onrender.com',
		credentials: true
	})
)

app.use(cookieParser())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', productRouter)
app.use('/api', categoryRouter)
app.use('/api', orderRouter)

app.listen(PORT, () => console.log('server start'))
