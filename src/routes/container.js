var express = require("express");
var router = express.Router();

var containerController = require("../controllers/containerController");

router.get("/", function (req, res) {
    containerController.testar(req, res);
});

router.get("/listar/:idContainer", function (req, res) {
    containerController.listarPorId(req, res);
});
router.post("/mudarArm", function (req, res) {
    containerController.mudarArmazenamento(req, res);
});
router.post("/mudarTransp", function (req, res) {
    containerController.mudarTransporte(req, res);
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
