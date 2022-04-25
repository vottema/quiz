const router = require('express').Router()
const { Theme } = require('../db/models')

router.route('/')
  .get(async (req, res) => {
    const themes = await Theme.findAll({ raw: true })
    res.json({ themes })
  })

router.route('/:theme_id')
  .get(async (req, res) => {
    const { theme_id } = req.params
    const theme = await Theme.findByPk(theme_id, { raw: true })
    res.json({ theme })
  }) 

module.exports = router
