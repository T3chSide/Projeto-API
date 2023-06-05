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


  function mostrarModal(){

    var modalNotificacoes = document.getElementById("modalNotificacoes")
  
      if (modalNotificacoes.style.display == 'none') {
          modalNotificacoes.style.display = `flex`
      } else {
          modalNotificacoes.style.display = 'none'
      }
  
  }

function alertar(resposta) {
    var alertas = 0;
    for(var i = 0; i < resposta.length; i++){
        var idLote = resposta[i].idContainer;
        var temp = resposta[i].temperatura;
        
        var grauDeAviso ='';

        var limites = {
            muito_quente: 8,
            quente: 7.9,
            ideal: 6,
            frio: 3.9,
            muito_frio: 2
        };


        var classe_temperatura = 'cor-alerta';

        if (temp >= limites.muito_quente) {
            classe_temperatura = 'cor-alerta perigo-quente';
            grauDeAviso = 'a cima do ideal'
            grauDeAvisoCor = 'cor-alerta perigo-quente'
            alertas += 1;
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
        }
        else if (temp < limites.muito_quente && temp >= limites.quente) {
            classe_temperatura = 'cor-alerta alerta-quente';
            grauDeAviso = 'em alerta quente'
            grauDeAvisoCor = 'cor-alerta alerta-quente'
            alertas += 1;
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)   
        }
        else if (temp < limites.quente && temp > limites.frio) {
            classe_temperatura = 'cor-alerta ideal';
            removerAlerta(idLote);
        }
        else if (temp <= limites.frio && temp > limites.muito_frio) {
            classe_temperatura = 'cor-alerta alerta-frio';
            grauDeAviso = 'em alerta frio'
            grauDeAvisoCor = 'cor-alerta alerta-frio'
            alertas += 1;
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
        }
        else if (temp <= limites.muito_frio) {
            classe_temperatura = 'cor-alerta perigo-frio';
            grauDeAviso = 'abaixo do ideal'
            grauDeAvisoCor = 'cor-alerta perigo-frio'
            alertas += 1;
            exibirAlerta(temp, idLote, grauDeAviso, grauDeAvisoCor)
        }
    }

    contagemAlerts.innerHTML = alertas;
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

    if(alertas.length>0){

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        modalNotificacoes.innerHTML += transformarEmDiv(mensagem);
    }
    modalNotificacoes.style.backgroundColor="#163170"
}else{
    modalNotificacoes.style.backgroundColor="#E6E8EA"
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
