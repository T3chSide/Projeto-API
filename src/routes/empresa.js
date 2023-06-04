var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/", function (req, res) {
    empresaController.testar(req, res);
});

router.get("/listar", function (req, res) {
    empresaController.listar(req, res);
});

router.get("/listarCnpj", function (req, res) {
    empresaController.listarCnpj(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})
router.post("/cadastrarSensor", function (req, res) {
    empresaController.cadastrarSensor(req, res);
})
router.post("/cadastrarLote", function (req, res) {
    empresaController.cadastrarLote(req, res);
})
router.post("/cadastrarContainer", function (req, res) {
    empresaController.cadastrarContainer(req, res);
})

router.post("/autenticar", function (req, res) {
    empresaController.entrar(req, res);
});

module.exports = router;
