let express = require('express')
let bodyParser = require('body-parser')
let router=require('./router.js')    //2
let path = require('path')

let app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use(router)   //2
app.listen(3000, () => { console.log('服务已启动') })