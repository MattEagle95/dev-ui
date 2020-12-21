const PM2Controller = require('../controller/pm2.controller')

const router = require('express').Router()

const pm2Controller = new PM2Controller()

router.get('/list', (req, res) => {
  console.log('call to list')
  pm2Controller.list()
    .then(list => {
      res.status(201).send(list)
    })
    .catch(error => {
      res.status(400).send(error)
    })
})

router.get('/describe/:name', (req, res) => {
  console.log(req.params)
  const { name } = req.params
  console.log('call to describe. name: ' + name)
  pm2Controller.describe(name)
    .then(list => {
      res.status(201).send(list)
    })
    .catch(error => {
      res.status(400).send(error)
    })
})

module.exports = router
