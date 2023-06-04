var alertas = [];


// function atualizarAlerts(resposta){
//     for(var i = 0; i < resposta.length; i++){
//       buscarMedidasEmTempoReal(resposta[i].idContainer);
//     }
// }


function receberLotesAlerta() {
    fetch(`/medidas/receberTemperaturaContainers/${sessionStorage.FK_EMPRESA}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            alertar(resposta);
             proximaAtualizacaoAlert = setTimeout(() =>{receberLotesAlerta()},2000);
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }


// function buscarMedidasEmTempoReal(idLote) {
//   fetch(`/medidas/tempo-real/${idLote}`)
//       .then(resposta => {

//           if (resposta.ok) {
//               resposta.json().then(resposta => {

//                   console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

//                   alertar(resposta, idLote);
//               });
//           } else {

//               console.error('Nenhum dado encontrado ou erro na API');
//           }
//       })
//       .catch(function (error) {
//           console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
//       });
// }

function alertar(resposta) {
    for(var i = 0; i < resposta.length; i++){
        var idLote = resposta[i].idContainer;
        var temp = resposta[i].temperatura;
        
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
            grauDeAviso = 'excedida'
            grauDeAvisoCor = 'cor-alerta perigo-quente'
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
        }
        else if (temp < limites.muito_quente && temp >= limites.quente) {
            classe_temperatura = 'cor-alerta alerta-quente';
            grauDeAviso = 'em alerta'
            grauDeAvisoCor = 'cor-alerta alerta-quente'
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)   
        }
        else if (temp < limites.quente && temp > limites.frio) {
            classe_temperatura = 'cor-alerta ideal';
            removerAlerta(idLote);
        }
        else if (temp <= limites.frio && temp > limites.muito_frio) {
            classe_temperatura = 'cor-alerta alerta-frio';
            grauDeAviso = 'em alerta'
            grauDeAvisoCor = 'cor-alerta alerta-frio'
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
        }
        else if (temp <= limites.muito_frio) {
            classe_temperatura = 'cor-alerta perigo-frio';
            grauDeAviso = 'abaixo do ideal'
            grauDeAvisoCor = 'cor-alerta perigo-frio'
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
            
        }
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
    modalNotificacoes.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        modalNotificacoes.innerHTML += transformarEmDiv(mensagem);
    }
}


function transformarEmDiv({ idLote, temp, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Lote ${idLote} está com a temperatura ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
