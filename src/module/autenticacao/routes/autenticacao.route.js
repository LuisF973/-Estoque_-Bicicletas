const express = require('express');
const router = express.Router()
const EstoqueController = require('../controller/autenticacao');


router.post('/login', EstoqueController.login);

router.post('/logout', EstoqueController.sair);


router.post('/refress-token', EstoqueController.refereshToken)



module.exports = router
