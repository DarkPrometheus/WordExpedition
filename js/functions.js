function redirectPage(id) {
    switch (id) {
        case "escribir":
            window.location.href = "./html/escribir.html";
            break;
        case "relacionar":
            window.location.href = "./html/relacionar.html";
            break;
        case "completar":
            window.location.href = "./html/completar.html";
            break;
        default:
            console.log("ID no reconocido");
    }
}

function fillCategories(categories, getData, config, loadData){
    const categoriesDiv = document.getElementById('categories');

    categories.forEach(categorie =>{
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element');
        elementDiv.id = categorie.id

        const img = document.createElement('img');
        img.src = "../img/categories/" + categorie.id + ".png"

        const p = document.createElement('p');
        p.textContent = categorie.nombre

        elementDiv.addEventListener('click', async function (event) {
            config.key = event.srcElement.id

            let dataToFiil = await getData(config);
            categoriesDiv.remove()
            loadData(dataToFiil)
        });

        elementDiv.appendChild(img);
        elementDiv.appendChild(p);
        categoriesDiv.appendChild(elementDiv);
    });
}

function setFlag(idiomaObjetivo) {
    switch (idiomaObjetivo) {
        case "es":
            imgConfig.src = "../img/flags/es.png"
            break;
        case "en":
            imgConfig.src = "../img/flags/uk.png"
            break;
        case "fr":
            imgConfig.src = "../img/flags/fr.png"
            break;
        case "ru":
            imgConfig.src = "../img/flags/ru.png"
            break;
        default:
            break;
    }
}