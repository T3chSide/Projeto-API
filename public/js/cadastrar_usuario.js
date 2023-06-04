function cadastrar() {
    
    var nome = input_nome.value;
    var email = input_usuario.value;
    var senha = input_senha.value;
    var cpf = input_cpf.value

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
            cnpjServer: sessionStorage.CNPJ_EMPRESA,
            tipoServer: 'ADM',
            cpfServer: cpf
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