require("dotenv").config();
require('express-async-errors')// instead of using try catch in controllers
const express=require('express')
const app=express();
const connectDB=require("./db/connect")
const notFoundMiddleWare=require("./middleware/not-found")
const errorHandlerMiddleware=require("./middleware/error-handler")
const productRouter=require("./routes/products")
//middleWare
app.use(express.json())


app.get("/",(req,res)=>{
    res.status(200).send(`
    <h1>Store</h1>
    <a href='/api/v1/products'>Products</a>
    `)
})
app.use("/api/v1/products",productRouter)

//لازم لازم السطرين دول بعد routes
const port =process.env.PORT ||3000

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware)
const start=async()=>{
try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,()=>{console.log(`Server Is Run On Port ${port}`)})
} catch (error) {
    console.log(error)
}
}
start()
