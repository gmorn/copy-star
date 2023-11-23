const Router = require('express')
const multer = require('multer')

const ProductController = require('../controller/product.controller')
const router = new Router()
const randomstring = require('randomstring')

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'STORAGE/')
	},
	filename: (req, file, callback) => {
		const name = file.originalname
		const extension = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1]
		const fileName = `${randomstring.generate(10)}.${extension}`
		callback(null, fileName)
	}
})

const upload = multer({ storage })

router.post('/product/create', upload.any(), ProductController.create)
router.post('/product/delete', ProductController.delete)
router.post('/product/update', upload.any(), ProductController.update)
router.get('/product/getProducts', ProductController.getProducts)
router.post('/product/getProductById', ProductController.getProductById)
router.get('/product/image/:imageName', ProductController.productImage)

module.exports = router