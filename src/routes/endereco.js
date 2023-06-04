var express = require("express");
var router = express.Router();

var enderecoController = require("../controllers/enderecoController");

router.get("/", function (req, res) {
    enderecoController.testar(req, res);
});

router.get("/listar/:idEndereco", function (req, res) {
    enderecoController.listarPorId(req, res);
});


router.get("/listar", function (req, res) {
    enderecoController.listar(req, res);
});

router.get("/listarCnpj", function (req, res) {
    enderecoController.listarCnpj(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de enderecoController.js
router.post("/cadastrar", function (req, res) {
    enderecoController.cadastrar(req, res);
})
router.post("/cadastrarSensor", function (req, res) {
    enderecoController.cadastrarSensor(req, res);
})
router.post("/cadastrarLote", function (req, res) {
    enderecoController.cadastrarLote(req, res);
})
router.post("/cadastrarContainer", function (req, res) {
    enderecoController.cadastrarContainer(req, res);
})

router.post("/autenticar", function (req, res) {
    enderecoController.entrar(req, res);
});

module.exports = router;
