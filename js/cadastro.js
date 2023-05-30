var estilo_input_erro = `
        border: solid 2px red;
        border-radius: 10px;
        height: 40px;
    `;

var estilo_input = `
        border: solid 1.5px black;
        border-radius: 10px;
        height: 40px;
    `;

// function confirmar_senha() {


//     if (senha.value != conf_senha.value) {
//         conf_senha.style.cssText = estilo_input_erro;
//         senha.style.cssText = estilo_input_erro;
//         span_erro_conf_senha.innerHTML = "As senhas precisam ser iguais";
//         return false;

//     } else {
//         conf_senha.style.cssText = estilo_input;
//         senha.style.cssText = estilo_input;
//         span_erro_conf_senha.innerHTML = "";
//         span_erro_senha.innerHTML = "";
//         return true;
//     }
// }

// function verificar_senha() {
//     if ((!confirmar_senha())) {
//         alert("As senhas precisam ser iguais");
//         return false;

//     } else {
//         if (senha.value.length < 8) {
//             conf_senha.style.cssText = estilo_input_erro;
//             senha.style.cssText = estilo_input_erro;
//             span_erro_senha.innerHTML = "A senha precisa ter pelo menos 8 caracteres";
//             return false;
//         } else {
//             span_erro_senha.innerHTML = "";
//             return true;
//         }
//     }
// }

// function verificar_usuario() {
//     if (input_usuario.value.indexOf("@") < 0 || (!input_usuario.value.endsWith(".com"))) {
//         input_usuario.style.cssText = estilo_input_erro;
//         span_erro_email.innerHTML = "Utilize um email válido";
//         return false;
//     } else {
//         input_usuario.style.cssText = estilo_input;
//         span_erro_email.innerHTML = "";
//         return true;
//     }
// }


// function cadastrar() {
//     if (input_nome_empresa.value == "" || input_cnpj.value == "" || input_usuario.value == "" || senha.value == "" || conf_senha.value == "") {
//         alert("Todos os campos são obrigatórios!");
//     } else {
//         if (verificar_senha()) {
//             if (verificar_usuario()) {
//                 if (validarCNPJ(input_cnpj.value)) {
//                     var nome = input_nome_empresa.value;
//                     var cnpj = input_cnpj.value;
//                     var user = input_usuario.value;
//                     var senha = senha.value;
//                     input_nome_empresa.value = "";
//                     input_cnpj.value = "";
//                     input_usuario.value = "";
//                     senha.value = "";
//                     conf_senha.value = "";
//                     alert("Cadastro realizado com sucesso");
//                     window.location.href = "../login.html";
//                 } else {
//                     input_cnpj.style.cssText = estilo_input_erro;
//                     span_erro_cnpj.innerHTML = "CNPJ inválido";
//                 }
//             }
//         }

//     }
// }

function logar() {
    var usuario_login = input_usuario.value;
    var senha_login = senha.value;
    var validacao_senha = senha_login == "123123";
    var validacao_usuario = usuario_login == "fabio@gmail.com";
    if (!(validacao_usuario && validacao_senha)) {
        if (!validacao_senha) {
            senha.style.cssText = `
            border: solid 2px red;  
            border-radius: 10px;
            height: 40px;
            margin-bottom: 0px;
        `;
            span_erro_senha.style.marginBottom = "25px";
            span_erro_senha.innerHTML = 'Senha incorreta';
        }

        if (!validacao_usuario) {
            input_usuario.style.cssText = `
            border: solid 2px red;
            border-radius: 10px;
            height: 40px;
            margin-bottom: 0px;
        `;
            span_erro_login.style.marginBottom = "25px";
            span_erro_login.innerHTML = 'Usuário incorreto';
        }
    } else {
        alert(`Seja bem-vindo ${nome}`);
        window.location.href = "../index.html";
    }

}