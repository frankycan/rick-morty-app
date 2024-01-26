import express from 'express'

const router = express.Router()

router.get('/', function(req, res) {
  res.json({ message: 'Get all characters' })
})

router.get('/:id', function(req, res) {
  res.json({ message: 'Get the character ID ' + req.params.id })
})

router.post('/:id/like', function(req, res) {
  res.json({ message: 'Like the character ID ' + req.params.id })
})

export default router