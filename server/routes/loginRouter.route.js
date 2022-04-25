const router = require('express').Router();
const { User } = require('../db/models')
const bcrypt = require('bcrypt')

router.route('/').post(async (req, res) => {
  // 1 Вариант
  // res.json({ status: 200, message: 'Добро пожаловать'})

  // 2 Вариант
  const { user_email, user_password } = req.body

  const data = await User.findOne({ where: { user_email }, raw: true })

  const post = (status, message) => {
    return {
      status,
      message
    }
  }

  if (data) {
    const pass = await bcrypt.compare(user_password, data.user_password)

    if (pass) {
      req.session.user_data = data
      res.json(post(200, `Приветствую, ${data.user_name}`))
    } else {
      res.json(post(400, 'Неверный пароль'))
    }
  } else {
    res.json(post(400, 'Такой почты не существует'))
  }
});

module.exports = router;
