const router = require('express').Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');

router.route('/').post(async (req, res) => {
  // 1 Вариант
  // await User.create(req.body);
  // res.json({ status: 200, message: 'Success' });

  // 2 Вариант
  const { user_name, user_email, user_password } = req.body;

  const post = (status, message) => {
    return {
      status,
      message
    }
  }

  const data = await User.findOne({ where: { user_email } });

  // Валидация почты
  const regexpEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = regexpEmail.test(user_email);

  // Валдиация пароля
  const regexpPassword =
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
  const password = regexpPassword.test(user_password);

  if (data) {
    res.json(post(400, 'Почта уже используется'))
  } else if (user_name.length === 0 && user_email.length === 0 && user_password.length === 0) {
    res.json(post(400, 'Остались незаполненные поля'))
  } else if (!email) {
    res.json(post(400, 'Неверно указано почтовый адрес'))
  } else if (!password) {
    res.json(post(400, 'Пароль должен содержать не менее 8 символов и состоять из спец. символов, строчных и заглавных букв'))
  } else {
    const newPass = await bcrypt.hash(user_password, 10)

    const data = await User.create({
      user_name,
      user_email,
      user_password: newPass
    })

    req.session.user_data = data
    res.json(post(200, `Приветствую, ${user_name}`))
  }
});

module.exports = router;
