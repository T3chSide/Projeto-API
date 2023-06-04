var alertas = [];

function obterdados(idLote) {
    fetch(`/medidas/tempo-real/${idLote}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idLote);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idLote} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do lote p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idLote) {
    var temp = resposta[0].temperatura;

    var grauDeAviso = '';

    var limites = {
        muito_quente: 8,
        quente: 7.5,
        ideal: 5,
        frio: 3.5,
        muito_frio: 2
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idLote);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`temp_aquario_${idLote}`) != null) {
        document.getElementById(`temp_aquario_${idLote}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_${idLote}`)) {
        card = document.getElementById(`card_${idLote}`)
        card.className = classe_temperatura;
    }
}

function exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idLote == idLote);

    if (indice >= 0) {
        alertas[indice] = { idLote, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idLote, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idLote) {
    alertas = alertas.filter(item => item.idLote != idLote);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idLote, temp, grauDeAviso, grauDeAvisoCor }) {

    var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idLote).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura ${temp}.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.AQUARIOS).forEach(item => {
        obterdados(item.id)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}