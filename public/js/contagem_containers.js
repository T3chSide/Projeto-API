var totalContainers = 0;

function pegar_containers(tipo, span, fkEmpresa){

    fetch(`/container/listar/${tipo}/${fkEmpresa}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    span.innerHTML = resposta[0].contagem;
                    somarContainers(resposta[0].contagem);

                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        }); 
}

function somarContainers(contagem) {
    var valor = parseInt(contagem);
    if (!isNaN(valor)) {
      totalContainers += valor;
    }
  }
