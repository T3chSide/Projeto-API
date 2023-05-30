function logar() {
    var campos_login_validados = true;
    email = input_usuario_login.value;
    senha = senhaUser.value;

    if (email == "" || senha == "") {
        alert("Porfavor, preencha todos os campos");
        campos_login_validados = false;
    } else {

        empresas = JSON.parse(sessionStorage.getItem("empresas"));

        indice = 0;

        if (!buscar_email(empresas.email, email)) {
            input_usuario_login.style.border = estilo_erro;
            input_usuario_login.setCustomValidity("Usuário não encontrado");
            input_usuario_login.reportValidity();
            campos_login_validados = false;

        }else if (senha != empresas.senha[indice]) {
            input_usuario_login.style.border = estilo_input;
            senha.style.border = estilo_erro;
            senha.setCustomValidity("Senha incorreta");
            senha.reportValidity();
            campos_login_validados = false;
        }

        if (campos_login_validados) {
            window.location.href = "dashBoard.html";
            alert("Bem-vindo " + empresas.nome[indice] + "!");
        }
    }
}
