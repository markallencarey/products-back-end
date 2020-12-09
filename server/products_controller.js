module.exports = {
  createProduct: (req, res, next) => {
    const db = req.app.get('db')
    const { name, description, price, image_url } = req.body

    db.create_product([name, description, price, image_url]).then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      res.status(500).send(err)
    })
  },

  readOneProduct: (req, res, next) => {
    const db = req.app.get('db')
    const { product_id } = req.params

    db.read_product(product_id).then((product) => {
      res.status(200).send(product)
    }).catch((err) => {
      res.status(500).send(err)
    })
  },

  readAllProducts: (req, res, next) => {
    const db = req.app.get('db')

    db.read_products().then(products => 
      res.status(200).send(products)
      ).catch((err) => {
      res.status(500).send(err)
    })
  },

  updateProduct: (req, res, next) => {
    const db = req.app.get('db')
    const { product_id } = req.params
    const { desc } = req.query

    db.update_product([product_id, desc]).then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      res.status(500).send(err)
    })
  },

  deleteProduct: (req, res, next) => {
    const db = req.app.get('db')
    const { product_id } = req.params

    db.delete_product(product_id).then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}