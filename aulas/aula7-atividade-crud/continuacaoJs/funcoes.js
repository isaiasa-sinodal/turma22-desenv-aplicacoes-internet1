
/**
 * Função que inicia durante a construção do html
 */
function initAll() {
    console.log("executou a funcao");
    buildBanner();

    // Carrega por padrão a primeira pagina sempre
    buildVehicleList( 1 );

}

/**
 * Constrói o banner
 */
function buildBanner() {

    // Cria um string contendo o conteudo do banner
    let conteudoBanner = 
        "    <h3>Seu usado vale mais aqui na nossa loja</h3>"+
        "    <button onclick=\"alert('Solicitação de cotação enviada!')\">Faça uma cotação</button>";

    // Obtém o objeto através do getElementById
    let divBanner = document.getElementById('bannerInicial');

    // Atualiza o conteudo da div com a string de html criada acima
    divBanner.innerHTML = conteudoBanner;

}

/**
 * Função que faz a montagem da lista de veículos
 * @param {Intl} page Esse parametro page contem o numero da pagina a ser exibida
 */
function buildVehicleList( page ) {

    let itemsByPage = 4;
    let totalItems = 500;
    let count = 0;

    let divCarros = document.getElementById("listaDeCarros");
    divCarros.innerHTML = "";

    let carName = "Honda Civic";
    let carYear = 1993;
    let carVersion = "EXL";
    let imageType = "Civic.webp";

    for (let i =1; i < totalItems ; i++) {

        // Aqui vamos randomizar os nomes
        carName = buildCarName(carName);
        imageType = buildImageType(carName);

        //Aqui vamos randomizar as versões
        if ( carVersion === "EXL" ) {
            carVersion = "ALTIS";
        } else if (carVersion == "ALTIS") {
            carVersion = "Type-R"
        } else {
            carVersion = "Basic";
        }

        // Aqui eu forço o ano
        if (carYear > 2026) {
            carYear = 1976;
        } else {
            carYear = carYear - 1;
        }

        let cardCarHtml = buildCarHtmlItem( imageType, carName, carYear, carVersion );
       
        // Aqui somamos o html a cada iteração
        let countRangeMax = page * itemsByPage;
        let countRangeInit = countRangeMax - itemsByPage;

        if ( count >= countRangeInit &&  count < countRangeMax   ) {
            divCarros.innerHTML += cardCarHtml;
        }
        
        // Aqui pode escolher as duas formas, eu prefiro count++
        count++;
        //count = count + 1;
    }

    /**
        Constrói o HTML de cada item de carro
    */
    function buildCarHtmlItem( imageType, carName, carYear, carVersion ) {
         // Aqui montamos a string contendo os valores de variadas formas possíveis
        return '<div class="card">'+
            `    <img src="${imageType}" alt="${carName}">`+
            '    <div class="info">'+
            '        <h3> '+carName+' '+carVersion+'     '+carYear+' </h3> '+
            '        <p>Cor: Preta</p>'+
            '        <p>Valor: R$ 430.000,00</p>'+
            '    </div>'+
            '    <button>Comprar</button>'+
            '</div>';
    }

    /*
       Essa função é responsável por construir o nome do carro
       e depois retornar ele para o callback
    */
    function buildCarName(carName) {

        if ( carName === "Honda Civic" ) {
            carName = "Golf";
        } else if ( carName == "Golf" ) {
            carName = "Porsche";
        } else if ( carName.indexOf("Porsche") > -1 ) {
            carName = "Honda Civic";
        }

        return carName;
    }

    /*
        Essa função constrói o nome da imagem a ser usada
    */
    function  buildImageType(carName) {

        let imageType = "";

        if ( carName === "Honda Civic" ) {
            imageType = "Golf.webp";
        } else if ( carName == "Golf" ) {
            imageType = "Porshe.jpg";
        } else if ( carName.indexOf("Porsche") > -1 ) {
            imageType = "Civic.webp";
        }

        return imageType;

    }
    
}
