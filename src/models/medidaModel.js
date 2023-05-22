var database = require("../database/config");

function buscarUltimasMedidas(idLote, limite_linhas) {

    instrucaoSql = ''

 if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temperatura as temperatura, 
                        dtHora,
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
                    from registroSensor
                    where fkSensor = ${idLote}
                    order by idRegistro desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idLote) {

    instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select
        temperatura as temperatura, 
        dtHora,
                        DATE_FORMAT(dtHora,'%H:%i:%s') as momento_grafico
                        from registroSensor where fkSensor = ${idLote} 
                    order by idRegistro desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarGraficoDashboard() {

    instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT COUNT(idLote) AS total_lotes FROM lotes;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    atualizarGraficoDashboard
}
