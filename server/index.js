require ('dotenv').config()
const express = require('express')
const massive = require('massive')
const productCtrl = require('./products_controller')

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())

app.get('/api/products', productCtrl.readAllProducts)
app.get('/api/products/:product_id', productCtrl.readOneProduct)
app.put('/api/products/:product_id', productCtrl.updateProduct)
app.post('/api/products', productCtrl.createProduct)
app.delete('/api/products/:product_id', productCtrl.deleteProduct)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(dbInstance => {
    console.log('DB ready')
    app.set("db", dbInstance);
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}.`)
    })
  })
  .catch(err => console.log(err))

