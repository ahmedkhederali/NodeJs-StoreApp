
require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await Product.deleteMany()// علشان امسح كل الموجود واضيف اللي عاوزه بس لو شلتها هضيف علي الموجود
    await Product.create(jsonProducts)
    console.log('Success!!!!')
    process.exit(0) //meanning everything went Well  and exist the program 
  } catch (error) {
    console.log(error)
    process.exit(1)//  
  }
}

start()
