var alertas = [];


function buscarMedidasEmTempoReal(idLote) {
  fetch(`/medidas/tempo-real/${idLote}`)
      .then(resposta => {

          if (resposta.ok) {
              resposta.json().then(resposta => {

                  console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                  alertar(resposta, idLote);
              });
          } else {

              console.error('Nenhum dado encontrado ou erro na API');
          }
      })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
      });
}


function alertar(resposta, idLote) {
    var temp = resposta[0].temperatura;

    console.log(idLote === resposta[0].fkEmpresa)
    
    var grauDeAviso ='';


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
}

function exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idLote == idLote);

    if (indice >= 0) {
        alertas[indice] = { idLote, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idLote, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
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
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Lote ${idLote} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
