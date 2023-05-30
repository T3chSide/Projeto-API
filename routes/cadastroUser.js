var express = require("express");
var router = express.Router();

var cadastroUserController = require("../controllers/CadastroUserControllers");

router.post("/cadastrarUser", function (req, res) {
    cadastroUserController.cadastrarUser(req, res);
})

module.exports = router;