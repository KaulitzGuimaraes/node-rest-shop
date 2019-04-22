const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser  = require('body-parser')
const  productRoutes = require('./routes/jsproducts')
// app.use((req,res,next) => {
//     res.status(200).json({
//         message : "It works!!!"
//     })
// })

app.use(morgan('dev'))



app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin','*')
        res.header('Access-Control-Allow-Headers','*')

        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH')
            res.status(200).json({})
        }
    next();
    }

)
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/products',productRoutes)

app.use((req,res,next)=>{
    const error = new Error('Not founded')
    error.status= 404
    next(error)

})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
           message : error.message
    })

})
module.exports = app