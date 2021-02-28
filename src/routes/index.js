const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
   // Dados do Usuário
   console.log(res.locals.auth_data);
   return res.json({ test: 'Ok' })
});


module.exports = router;