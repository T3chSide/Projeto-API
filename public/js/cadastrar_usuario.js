function pegar_empresa(cnpj){
    fetch("/empresa/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var idEmpresa;

                for(var i = 0; i < resposta.length; i++){
                    var empresa = resposta[i];
                    
                    if(empresa.cnpj == cnpj){
                        idEmpresa = empresa.idEmpresa;
                        break;
                    }
                }
                
                

                cadastrar(idEmpresa);
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function cadastrar(fkEmpresa) {
    
    var nome = input_nome.value;
    var email = input_usuario.value;
    var senha = input_senha.value;

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    // Enviando o valor da nova input

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            fkEmpresaServer: fkEmpresa
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}