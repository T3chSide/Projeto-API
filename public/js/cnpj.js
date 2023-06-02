input_cnpj.setCustomValidity("CNPJ inválido");

function gerar_digitos_verificadores(numeros_verificacao){
    var soma = 0;
    var peso = 2;
    for(var i = numeros_verificacao.length-1; i >= 0; i--){
        soma += numeros_verificacao[i] * peso;

        if(peso == 9){
            peso = 2;
        }else{
            peso++;
        }
    }
    
    var modulo = soma % 11;
    var digito_verificador = 0;

    if(modulo >= 2){
        digito_verificador = 11 - modulo;
    }

    if(numeros_verificacao.length < 13){
        digito_verificador += `${gerar_digitos_verificadores(numeros_verificacao + digito_verificador)}`;
    }

    return digito_verificador;
}

function validar_cnpj(cnpj){
    numeros_verificacao = cnpj.replaceAll(/\D/g,"");
    
    if(numeros_verificacao.length != 14){
        input_cnpj.reportValidity();
        input_cnpj.style.borderColor = 'red';
        return false;
    }else{
        var digitos_verificadores = numeros_verificacao[numeros_verificacao.length-2] + numeros_verificacao[numeros_verificacao.length-1];
        var numeros_verificacao = numeros_verificacao.slice(0, numeros_verificacao.length-2);
        var digitos = gerar_digitos_verificadores(numeros_verificacao);
        if(digitos == digitos_verificadores){
            input_cnpj.style.borderColor = 'black';
            return true;
        }else{
            input_cnpj.reportValidity();
            input_cnpj.style.borderColor = 'red';
            return false;
        }
    }


}

function procurar_cnpj(cnpj){

    cnpj_cadastrado = false;

    fetch("/empresa/listarCnpj").then(function (resposta) {
        if (resposta.ok) {

            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));


                for(var i = 0; i < resposta.length; i++){
                    if(resposta[i].cnpj == cnpj){
                        cnpj_cadastrado = true;
                        break;
                    }
                }

                cadastrar(cnpj);
            });

            
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}
