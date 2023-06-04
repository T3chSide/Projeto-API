function gerarDadosRandom() {

    var fkEmpresa = sessionStorage.FK_EMPRESA

    fetch(`/medidas/gerarDadosRandom/${fkEmpresa}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        empresaServer: fkEmpresa,
      })
    })

    console.log(`Dados aleatórios gerados`);
    setTimeout(() => gerarDadosRandom(), 1000);

  }