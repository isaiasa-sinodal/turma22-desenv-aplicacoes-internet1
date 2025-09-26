const baseUrlApi = 'http://demo6208797.mockable.io/';

function inserirDados() {
    inserirHeader();
    inserirMain();
    inserirFooter();
}

function inserirHeader() {
    const containerMenu = document.querySelector('.nav-menu');

    fetch(baseUrlApi + 'header')
        .then(response => response.json())
        .then(item => {
            item.forEach(item => {
                const li = `<li id="${item.id}"><a href="${item.href}">${item.label}</a></li>`;
                containerMenu.innerHTML += li;
            })
        });
}

function inserirMain() {
    const containerVeiculo = document.querySelector('.conteudo-conteiner');

    fetch(baseUrlApi + 'veiculos')
        .then(response => response.json())
        .then(veiculos => {
            veiculos.forEach(veiculo => {
                const precoFormatado = veiculo.preco.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const veiculoHTML = `
        <div id="veiculo-${veiculo.id}" class="conteiner-veiculos">
            <div class="modelo">
                <h2>${veiculo.modelo}</h2>
                <img src="${veiculo.src}" alt="Imagem do ${veiculo.marca} ${veiculo.modelo}">
            </div>
            <div class="inf-acoes">
                <div class="infos">
                    <h2 class="cor">${veiculo.cor ? 'Cor: ' + veiculo.cor : ''}</h2> <h2 class="valor">${precoFormatado}</h2>
                </div>
                <div class="acoes">
                    <button class="comprar">Comprar</button>
                </div>
            </div>
        </div>
    `;

                containerVeiculo.innerHTML += veiculoHTML;
            });
        });
}

function inserirFooter() {
    const containerFooter = document.querySelector('.footer-menu');
    const containercopyright = document.querySelector('.copyright');

    fetch(baseUrlApi + 'footer')
        .then(response => response.json())
        .then(data => {
            containercopyright.innerHTML = data[0].copyright;

            data[0]["itens-menu"].forEach(menuItem => {
                const li = `<li><a href="${menuItem.href}">${menuItem.label}</a></li>`;
                containerFooter.innerHTML += li;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o footer:', error);
        });
}

inserirDados();
