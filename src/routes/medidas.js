var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idLote", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idLote", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/receber-temperatura-lotes/:idLote", function (req, res) {
    medidaController.receberTemperaturaLotes(req, res);
});

router.get("/receberContainers", function (req, res) {
    medidaController.receberContainers(req, res);
});

module.exports = router;
