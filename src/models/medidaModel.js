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

function receberTemperaturaLotes(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
        SELECT s.idSensor, r.temperatura
        FROM sensor s
        LEFT JOIN registroSensor r 
        ON s.idSensor = r.fkSensor JOIN container c
        ON c.fkSensor = s.idSensor
        WHERE r.idRegistro = (
                SELECT MAX(idRegistro)
                FROM registroSensor
                WHERE fkSensor = s.idSensor
            ) AND fkEmpresa = ${fkEmpresa};
     `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function receberContainers(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    SELECT * FROM container WHERE fkEmpresa = ${fkEmpresa}
    ;
     `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function gerarDadosRandom(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucao = `
    INSERT INTO registroSensor (temperatura, fkSensor)
SELECT ROUND(RAND() * 12, 2), FLOOR(RAND() * (select max(idSensor) from sensor)) + 1
FROM registroSensor
LIMIT 1;
     `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    atualizarGraficoDashboard,
    receberTemperaturaLotes,
    receberContainers,
    gerarDadosRandom
}
