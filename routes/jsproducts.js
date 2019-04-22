const express = require('express')
var filHandler = require('../filehandler.js')
const router = express.Router()
path = './products.txt'
OK_STATUS = 200
OK_STATUS_2 = 201


function getProductsFromFile() {
    var fs = new filHandler("fooBar")
    fs = fs.readFile(path)
    fs = fs.split("\n")
    return fs;
}

function getEndpointFuncRout(functionToExecute) {

    return (req,res,next)=>{
        functionToExecute(req,res,next)
    }
}



function createJsonResponse (jsonPlus, message){
     var JSON ={
         message : message,
         response : jsonPlus
    }
    return JSON
}
function getProducts(req,res,next){
    var fs = getProductsFromFile();
    fs = {products : fs}
    res.status(OK_STATUS).json(createJsonResponse(fs,"Products OK"))
}

router.get('/', getEndpointFuncRout(getProducts))

function getProductById(req,res,next) {
    const id = req.params.productId
    var response = {id: id}
    if (id === "special") {
        res.status(OK_STATUS).json(createJsonResponse(response, "You've figure out the special ID"))
    } else {
        res.status(OK_STATUS).json(createJsonResponse(response, " You've passed an ID"))
    }
}

router.get('/:productId', getEndpointFuncRout(getProductById))


router.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message: 'Handling POST from /products',
        createdProduct : product
    })
})


module.exports = router