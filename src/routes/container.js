var express = require("express");
var router = express.Router();

var containerController = require("../controllers/containerController");

router.get("/", function (req, res) {
    containerController.testar(req, res);
});

router.get("/listar", function (req, res) {
    containerController.listar(req, res);
});

router.get("/listar/:tipo/:fkEmpresa", function (req, res) {
    containerController.listarPorTipo(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    containerController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    containerController.publicar(req, res);
});

router.put("/editar/:idAviso", function (req, res) {
    containerController.editar(req, res);
});

router.delete("/deletar/:idAviso", function (req, res) {
    containerController.deletar(req, res);
});

module.exports = router;
