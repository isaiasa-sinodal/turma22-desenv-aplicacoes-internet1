$(function() {

    const veiculosContainer = $('.veiculos-container');

    const apiUrl = 'http://demo6654020.mockable.io/veiculos';

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',

        success: function(dados) {

            $.each(dados.veiculos, function(index, veiculo) {

                const cardHTML = `
                    <div class="card-veiculo">
                        <img src="${veiculo.imagem}" alt="${veiculo.modelo}">
                        <div class="card-info">
                            <h3>${veiculo.modelo}</h3>
                            <p>Cor: ${veiculo.cor}</p>
                            <p class="valor">Valor: ${veiculo.valor}</p>
                            <button class="btn btn-comprar">Comprar</button>
                        </div>
                    </div>
                `;

                veiculosContainer.append(cardHTML);
            });
        },

    });
});