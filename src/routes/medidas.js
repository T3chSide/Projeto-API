var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idLote", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idLote", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.post("/receber-temperatura-lotes/:fkEmpresa", function (req, res) {
    medidaController.receberTemperaturaLotes(req, res);
});

router.get("/receberContainers/:fkEmpresa", function (req, res) {
    medidaController.receberContainers(req, res);
});

router.post("/gerarDadosRandom", function (req, res) {
    medidaController.gerarDadosRandom(req, res);
});

router.get("/receberTemperaturaContainers/:fkEmpresa", function (req, res) {
    medidaController.receberTemperaturaContainers(req, res);
});

module.exports = router;
