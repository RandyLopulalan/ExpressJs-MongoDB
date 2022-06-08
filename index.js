require('./config/mongoose')
const express = require("express");
const path = require('path')
const app = express();
// const productRouter = require('./app/product/routes')
// const productRouterV2 = require('./app/product-v2/routes')
const productRouterV3 = require('./app/product-v3/routes')
const productRouterV4 = require('./app/product-v4/routes')
const logger = require('morgan')

app.use(logger('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname,'uploads')))

// app.use('/api/v1', productRouter)
// app.use('/api/v2', productRouter)

// MongoDB
app.use('/api/v3', productRouterV3)

// Mongoose
app.use('/api/v4', productRouterV4)

app.use((req,res,next)=>{
res.status((404))
    res.send({
        status: 'failed status: 404',
        message: `Resource ${req.originalUrl} not found`
    })
})

app.listen(3000, () => console.log("Server: http://localhost:3000"));
