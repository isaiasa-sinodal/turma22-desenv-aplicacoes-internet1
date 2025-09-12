
/**
 * Função que inicia durante a construção do html
 */
function initAll() {
    console.log("executou a funcao");

    buildBanner();
    buildVehicle();
}

/**
 * Constrói o banner
 */
function buildBanner() {
    console.log("construir banner inicio");

    // Cria um string contendo o conteudo do banner
    var conteudoBanner = 
        "    <h3>Seu usado vale mais aqui na nossa loja</h3>"+
        "    <button onclick=\"alert('Solicitação de cotação enviada!')\">Faça uma cotação</button>";

    // Obtém o objeto através do getElementById
    var divBanner = document.getElementById('bannerInicial');

    // Atualiza o conteudo da div com a string de html criada acima
    divBanner.innerHTML = conteudoBanner;

}

function buildVehicle() {

    var cardCarHtml = '<div class="card">'+
            '    <img src="assets/Civic.webp" alt="Honda Civic">'+
            '    <div class="info">'+
            '        <h3>Honda Civic type-R 2025</h3>'+
            '        <p>Cor: Preta</p>'+
            '        <p>Valor: R$ 430.000,00</p>'+
            '    </div>'+
            '    <button>Comprar</button>'+
            '</div>';

    
    var divCarros = document.getElementById("listaDeCarros");

    for (var i =0; i < 40 ; i++) {
        divCarros.innerHTML += cardCarHtml;
    }
    
}
