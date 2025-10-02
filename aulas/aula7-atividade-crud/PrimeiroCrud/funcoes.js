function newItem() {
    let divFormulario = document.getElementById("divFormulario");

    if (divFormulario.style.display == 'none') {
        divFormulario.style.display = "block";
    } else if (divFormulario.style.display == 'block') {
        divFormulario.style.display = "none";  
    }
}

function getObj(propName) {
    return document.getElementById(propName);
}

function save() {

    let formObj = document.getElementById("myForm");

    console.log("Aqui enviaremos os dados para o servidor");
    //console.log(formObj);

    let myJson = new Object();


    let nameField = document.getElementById("name");
    let genderField = getObj("gender");
    let durationField = getObj("duration");
    let yearField = getObj("year");
    let directorField = getObj("director");

    myJson["name"] = nameField.value;
    myJson["gender"] = genderField.value;
    myJson["duration"] = durationField.value;
    myJson["year"] = yearField.value;
    myJson["director"] = directorField.value;

    console.log(myJson);
}