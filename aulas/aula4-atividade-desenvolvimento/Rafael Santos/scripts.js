

document.addEventListener("DOMContentLoaded", function () {
  const containerDosVeiculos = document.querySelector(".lista-veiculos");

  fetch("veiculos.json")
    .then(function (resposta) {
      return resposta.json();
    })

    .then(function (dados) {
      dados.forEach(function (veiculo) {
        const cardHtml = `
                    <div class="card-veiculo">
                        <img src="${veiculo.imagem}" alt="${veiculo.alt}">
                        <h3>${veiculo.modelo}</h3>
                        <p>Cor: ${veiculo.cor}</p>
                        <p class="valor">Valor: ${veiculo.valor}</p>
                        <a href="#" class="btn">Comprar</a>
                    </div>
                `;

        containerDosVeiculos.innerHTML += cardHtml;
      });
    })

    .catch(function (erro) {
      console.error("Erro ao carregar os veículos:", erro);
      containerDosVeiculos.innerHTML =
        "<p>Falha ao carregar os veículos. Tente novamente mais tarde.</p>";
    });
});
