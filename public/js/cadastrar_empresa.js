function cadastrar(cnpj_cadastrado) {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nome_empresa_var = input_nome_empresa.value;
    var cnpj_var = input_cnpj.value.replace(/[^\d]/g, '');

    if(!cnpj_cadastrado){
        // Enviando o valor da nova input
        fetch("/empresa/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nome_empresa_var,
                cnpjServer: cnpj_var,
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro da empresa realizado com sucesso! ...");
                sessionStorage.CNPJ_EMPRESA = cnpj_var;

                setTimeout(() => {
                    window.location.href = "cadastro_usuario.html";
                }, "2000")

            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }else{
        alert("O CNPJ inserido já foi cadastrado");
    }
}
