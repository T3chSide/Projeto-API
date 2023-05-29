function gerar_digitos_verificadores(numeros_verificacao){
    var peso = 2;
    var soma = 0;
    for(var i = numeros_verificacao.length-1; i >= 0; i--){
        soma += numeros_verificacao[i] * peso;
        peso++;
    }

    var modulo = soma % 11;
    var digito = 0;

    if(modulo >= 2){
        digito = 11 - modulo;
    }

    if(numeros_verificacao.length < 10){
        digito += `${gerar_digitos_verificadores(numeros_verificacao + digito)}`;
        
    }

    return digito;
}

input_cpf.setCustomValidity("CPF inválido");

function validar_cpf(cpf){
    cpf = cpf.replace(/\D/g, '');
    var numeros_verificacao = cpf.slice(0, cpf.length-2);
    var digitos_verificadores = cpf[cpf.length - 2] + cpf[cpf.length - 1];
    var digitos = gerar_digitos_verificadores(numeros_verificacao);

    if(digitos_verificadores == digitos){
        input_cpf.style.borderColor = 'black';
        return true;
    }else{
        input_cpf.reportValidity();
        input_cpf.style.borderColor = 'red';
        return false;
    }
}